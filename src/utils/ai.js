import { MEAL_TEMPLATES } from '../data/meals';
import { WORKOUT_ROUTINES } from '../data/workoutData';
import { checkRateLimit } from './rateLimiter';

function cleanJsonResponse(text) {
  let cleaned = text.trim();
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(?:json)?\s*/i, '');
    cleaned = cleaned.replace(/\s*```$/, '');
  }
  return cleaned.trim();
}

/**
 * Generates a local fallback diet and workout plan if Gemini API is not available.
 */
export function generateLocalFallbackPlan({ preference, calorieTarget, goal = 'bulk', age = 25, weight = 70 }) {
  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  
  const dietPlan = days.map((dayName, dayIndex) => {
    const slots = [
      { key: 'breakfast', pct: 0.224 },
      { key: 'lunch', pct: 0.306 },
      { key: 'snack', pct: 0.143 },
      { key: 'dinner', pct: 0.327 },
    ];

    const meals = slots.map((slot) => {
      const templates = MEAL_TEMPLATES[slot.key] || [];
      let filtered = [];
      if (preference === 'non') {
        const nonVegOnly = templates.filter((t) => t.diets.includes('non') && !t.diets.includes('veg'));
        if (nonVegOnly.length > 0) {
          filtered = nonVegOnly;
        } else {
          filtered = templates.filter((t) => t.diets.includes('non'));
        }
      } else {
        filtered = templates.filter((t) => t.diets.includes('veg'));
      }

      if (filtered.length === 0) {
        filtered = templates;
      }
      
      // Rotate templates based on day index so each day gets a different meal
      const templateIndex = (dayIndex + (slot.key === 'lunch' ? 1 : (slot.key === 'snack' ? 2 : 0))) % filtered.length;
      const defaultMeal = filtered[templateIndex] || templates[0];
      const targetCalories = calorieTarget * slot.pct;

      return {
        slot: slot.key,
        meal: {
          ...defaultMeal,
          id: `${defaultMeal.id}_day${dayIndex}`
        },
        targetCalories,
      };
    });

    return {
      dayIndex,
      dayName,
      meals
    };
  });

  const workoutPlan = WORKOUT_ROUTINES.map((routine, dayIndex) => {
    // Determine dynamic routines or scale values based on goal
    let adjustedExercises = routine.exercises.map(ex => {
      let sets = ex.sets;
      let reps = ex.reps;
      let rest = ex.rest;
      let rpe = ex.rpe;

      // Adjust based on goal: 'bulk', 'cut', 'maintain'
      if (goal === 'cut') {
        // High reps, short rest, slightly lower sets, lower RPE
        sets = Math.max(3, sets - 1);
        if (reps !== 'N/A' && reps !== '30 mins' && reps !== '15 mins' && reps !== '20 mins' && !reps.includes('s') && reps !== '3' && reps !== '5' && reps !== '8-10' && reps !== '6') {
          reps = '12-15';
        } else if (reps === '8-10') {
          reps = '10-12';
        } else if (reps === '5' || reps === '3' || reps === '6') {
          reps = '8';
        }
        if (rest !== 'N/A' && rest.includes('s')) {
          const seconds = parseInt(rest, 10);
          rest = `${Math.max(45, seconds - 30)}s`;
        }
        rpe = (parseFloat(rpe) - 0.5).toString();
      } else if (goal === 'bulk') {
        // High sets, low-moderate reps (heavier weight), longer rest, high RPE
        sets = Math.min(5, sets + 1);
        if (reps !== 'N/A' && reps !== '30 mins' && reps !== '15 mins' && reps !== '20 mins' && !reps.includes('s') && reps !== '3' && reps !== '5' && reps !== '8-10' && reps !== '6') {
          reps = '6-8';
        }
        if (rest !== 'N/A' && rest.includes('s')) {
          const seconds = parseInt(rest, 10);
          rest = `${Math.min(180, seconds + 30)}s`;
        }
        rpe = Math.min(10, parseFloat(rpe) + 0.5).toString();
      }

      return {
        ...ex,
        sets,
        reps,
        rest,
        rpe
      };
    });

    // Custom tip based on age & weight
    let ageTip = '';
    if (age > 50) {
      ageTip = ' As you are over 50, prioritize slow controlled eccentrics (3 seconds lowering) and ensure your joints feel warm before lifting heavier.';
    } else if (age < 20) {
      ageTip = ' Focus heavily on learning perfect form rather than lifting maximum weight. Build a solid foundation.';
    }

    let weightTip = '';
    if (weight > 95) {
      weightTip = ' Focus on landing softly during cardio and avoid extra joint-compression where possible.';
    }

    const focusTip = `${routine.focusTip}${ageTip}${weightTip}`;

    return {
      ...routine,
      exercises: adjustedExercises,
      focusTip,
      dayIndex
    };
  });

  return { dietPlan, workoutPlan };
}

/**
 * Calls AI API (Gemini or OpenRouter) to generate a complete 7-day diet and workout plan.
 */
export async function generateAiPlan({ age, weight, height, steps, sleep, preference, extraPreferences, goal, targets, apiKey, provider = 'gemini', model = 'nvidia/llama-3.3-nemotron-super-49b-v1.5', language = 'en', isAuthenticated = false }) {
  const rateLimitCategory = isAuthenticated ? 'AUTHENTICATED' : 'PUBLIC';
  const rateLimit = checkRateLimit(rateLimitCategory);
  if (!rateLimit.allowed) {
    throw new Error(rateLimit.reason || `Rate limit reached for AI plan generation. Please wait ${rateLimit.retryAfterSeconds}s.`);
  }

  const langName = language === 'hi' ? 'Hindi (हिन्दी)' : language === 'te' ? 'Telugu (తెలుగు)' : 'English';
  const prompt = `You are an expert AI sports nutritionist, strength coach, and personal trainer.
CRITICAL: You MUST write/translate all recipe names, descriptions, ingredients, instruction steps, routine names, focus areas, and focus tips entirely in ${langName}. Avoid English text in these fields.
Your task is to generate a comprehensive, personalized weekly (7 days, starting from Monday to Sunday) Diet Plan and Workout Plan for a user with the following profile:
- Age: ${age} years old
- Weight: ${weight} kg
- Height: ${height} cm
- Daily Steps: ${steps}
- Sleep Duration: ${sleep} hours
- Diet Preference: ${preference} (veg for vegetarian, non for non-vegetarian/balanced)
- Extra preferences / Allergies / Notes: ${extraPreferences || "None"}
- Goal: ${goal} (cut for weight loss / calorie deficit, bulk for hypertrophy / calorie surplus)

Daily targets (calculated mathematically):
- Calorie target: ${targets.calorieTarget} kcal
- Protein target: ${targets.proteinTarget}g
- Carbs target: ${targets.carbTarget}g
- Fats target: ${targets.fatTarget}g

The weekly diet plan MUST contain exactly 7 days (Monday to Sunday, dayIndex 0 to 6).
Each day of the 7-day diet plan MUST have completely different and diverse recipes (do NOT repeat the same breakfasts, lunches, snacks, or dinners on multiple days; provide a unique and exciting menu for every day from Monday to Sunday).
Each day MUST contain exactly 4 meals in the slots: "breakfast", "lunch", "snack", "dinner".
For every meal, inside the "bullets" array of food items, you MUST append the estimated protein content in grams to the name of each food item, e.g. "Oatmeal w/ Whey (30g Protein)", "Almonds (4g Protein)", "Blueberries (1g Protein)". The sum of proteins in the bullets MUST approximately match the total protein of that meal.
All meals must strictly respect the diet preference "${preference}" (veg/non-veg), incorporate healthy Indian diets/recipes (using healthy Indian ingredients like paneer, tofu, dal, roti, brown rice, chickpea salad, eggs, chicken breast, fish, oats, etc., customized to Indian culinary styles), and respect any extra details like allergies.
The sum of targetCalories for the 4 meals of each day must be approximately ${targets.calorieTarget} kcal. 
Approximate splits: breakfast ~22.4% (${Math.round(targets.calorieTarget * 0.224)} kcal), lunch ~30.6% (${Math.round(targets.calorieTarget * 0.306)} kcal), snack ~14.3% (${Math.round(targets.calorieTarget * 0.143)} kcal), dinner ~32.7% (${Math.round(targets.calorieTarget * 0.327)} kcal).

The weekly workout plan MUST contain exactly 7 days, aligned with the diet plan.
For each day, provide a structured workout routine (routineName, focus areas, focusTip, and exercises list). Make rest days if appropriate (e.g. Wednesday and Sunday can be active recovery or rest days).

You MUST return a JSON object that adheres strictly to this structure:
{
  "dietPlan": [
    {
      "dayIndex": 0,
      "dayName": "MON",
      "meals": [
        {
          "slot": "breakfast",
          "meal": {
            "id": "unique_id_string",
            "name": "Meal Name",
            "description": "Short appetizing description",
            "prepTime": "Prep time (e.g. 10 mins)",
            "diets": ["${preference}"],
            "baseCalories": 550,
            "macros": { "protein": 35, "fat": 15, "carbs": 68 },
            "bullets": ["Bullet point ingredient 1", "Bullet point ingredient 2", "Bullet point ingredient 3"],
            "ingredients": [
              { "name": "Ingredient 1 name", "baseAmount": 80, "unit": "g" }
            ],
            "instructions": ["Step 1 description", "Step 2 description"]
          },
          "targetCalories": 550
        }
      ]
    }
  ],
  "workoutPlan": [
    {
      "dayIndex": 0,
      "dayName": "MON",
      "dayNumber": "01",
      "routineName": "Push Hypertrophy",
      "focus": "CHEST, SHOULDERS, TRICEPS",
      "focusTip": "Keep elbows at 45 degrees.",
      "exercises": [
        { "name": "Incline Barbell Press", "sets": 4, "reps": "10", "rest": "90s", "rpe": "9" }
      ]
    }
  ]
}`;

  if (provider === 'groq') {
    const response = await fetch(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: model || 'llama-3.3-70b-versatile',
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ],
          response_format: {
            type: 'json_object'
          }
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `Groq API error: ${response.status}`);
    }

    const result = await response.json();
    const text = result.choices?.[0]?.message?.content;
    if (!text) {
      throw new Error("No response from Groq API");
    }
    return JSON.parse(cleanJsonResponse(text));
  } else if (provider === 'openrouter') {
    const response = await fetch(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'HTTP-Referer': typeof window !== 'undefined' ? window.location.origin : 'https://fitora.app',
          'X-Title': 'Fitora Performance'
        },
        body: JSON.stringify({
          model: model || 'nvidia/llama-3.3-nemotron-super-49b-v1.5',
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ],
          response_format: {
            type: 'json_object'
          }
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `OpenRouter API error: ${response.status}`);
    }

    const result = await response.json();
    const text = result.choices?.[0]?.message?.content;
    if (!text) {
      throw new Error("No response from OpenRouter API");
    }
    return JSON.parse(cleanJsonResponse(text));
  } else {
    // Default: Gemini
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }]
            }
          ],
          generationConfig: {
            responseMimeType: 'application/json',
            responseSchema: {
              type: "OBJECT",
              properties: {
                dietPlan: {
                  type: "ARRAY",
                  items: {
                    type: "OBJECT",
                    properties: {
                      dayIndex: { type: "INTEGER" },
                      dayName: { type: "STRING" },
                      meals: {
                        type: "ARRAY",
                        items: {
                          type: "OBJECT",
                          properties: {
                            slot: { type: "STRING" },
                            meal: {
                              type: "OBJECT",
                              properties: {
                                id: { type: "STRING" },
                                name: { type: "STRING" },
                                description: { type: "STRING" },
                                prepTime: { type: "STRING" },
                                diets: { type: "ARRAY", items: { type: "STRING" } },
                                baseCalories: { type: "NUMBER" },
                                macros: {
                                  type: "OBJECT",
                                  properties: {
                                    protein: { type: "NUMBER" },
                                    fat: { type: "NUMBER" },
                                    carbs: { type: "NUMBER" }
                                  },
                                  required: ["protein", "fat", "carbs"]
                                },
                                bullets: { type: "ARRAY", items: { type: "STRING" } },
                                ingredients: {
                                  type: "ARRAY",
                                  items: {
                                    type: "OBJECT",
                                    properties: {
                                      name: { type: "STRING" },
                                      baseAmount: { type: "NUMBER" },
                                      unit: { type: "STRING" }
                                    },
                                    required: ["name", "baseAmount", "unit"]
                                  }
                                },
                                instructions: { type: "ARRAY", items: { type: "STRING" } }
                              },
                              required: ["id", "name", "description", "prepTime", "diets", "baseCalories", "macros", "bullets", "ingredients", "instructions"]
                            },
                            targetCalories: { type: "NUMBER" }
                          },
                          required: ["slot", "meal", "targetCalories"]
                        }
                      }
                    },
                    required: ["dayIndex", "dayName", "meals"]
                  }
                },
                workoutPlan: {
                  type: "ARRAY",
                  items: {
                    type: "OBJECT",
                    properties: {
                      dayIndex: { type: "INTEGER" },
                      dayName: { type: "STRING" },
                      dayNumber: { type: "STRING" },
                      routineName: { type: "STRING" },
                      focus: { type: "STRING" },
                      focusTip: { type: "STRING" },
                      exercises: {
                        type: "ARRAY",
                        items: {
                          type: "OBJECT",
                          properties: {
                            name: { type: "STRING" },
                            sets: { type: "NUMBER" },
                            reps: { type: "STRING" },
                            rest: { type: "STRING" },
                            rpe: { type: "STRING" }
                          },
                          required: ["name", "sets", "reps", "rest", "rpe"]
                        }
                      }
                    },
                    required: ["dayIndex", "dayName", "dayNumber", "routineName", "focus", "focusTip", "exercises"]
                  }
                }
              },
              required: ["dietPlan", "workoutPlan"]
            }
          }
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `API error: ${response.status}`);
    }

    const result = await response.json();
    const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      throw new Error("No response from Gemini API");
    }
    return JSON.parse(cleanJsonResponse(text));
  }
}

/**
 * Calls AI API to generate an alternative meal for swapping.
 */
export async function generateSingleMealAi({ slot, preference, extraPreferences, goal, targetCalories, apiKey, provider = 'gemini', model = 'nvidia/llama-3.3-nemotron-super-49b-v1.5', language = 'en' }) {
  const langName = language === 'hi' ? 'Hindi (हिन्दी)' : language === 'te' ? 'Telugu (తెలుగు)' : 'English';
  const prompt = `You are an expert AI sports nutritionist.
CRITICAL: You MUST output all text strings (such as meal name, description, ingredients, and instructions) in the ${langName} language. Do NOT use English text.
Generate an alternative healthy Indian meal for the slot "${slot}".
Diet Preference: ${preference} (veg/non-veg)
The meal must incorporate healthy Indian diets/recipes (using healthy Indian ingredients like paneer, tofu, dal, roti, brown rice, chickpea salad, eggs, chicken breast, fish, oats, etc., customized to Indian culinary styles).
Extra details/Allergies/Notes: ${extraPreferences || "None"}
Goal: ${goal}
Target Calories for this slot: ${targetCalories} kcal

You MUST return a JSON object matching this schema:
{
  "id": "unique_swap_id_string",
  "name": "Meal Name",
  "description": "Short description of the meal",
  "prepTime": "Prep time (e.g. 15 mins)",
  "diets": ["${preference}"],
  "baseCalories": ${targetCalories},
  "macros": { "protein": number, "fat": number, "carbs": number },
  "bullets": ["Bullet 1", "Bullet 2", "Bullet 3"],
  "ingredients": [
    { "name": "Ingredient name", "baseAmount": number, "unit": "g/tbsp/etc" }
  ],
  "instructions": ["Step 1...", "Step 2..."]
}`;

  if (provider === 'groq') {
    const response = await fetch(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: model || 'llama-3.3-70b-versatile',
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ],
          response_format: {
            type: 'json_object'
          }
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `Groq API error: ${response.status}`);
    }

    const result = await response.json();
    const text = result.choices?.[0]?.message?.content;
    if (!text) {
      throw new Error("No response from Groq API");
    }
    return JSON.parse(cleanJsonResponse(text));
  } else if (provider === 'openrouter') {
    const response = await fetch(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'HTTP-Referer': typeof window !== 'undefined' ? window.location.origin : 'https://fitora.app',
          'X-Title': 'Fitora Performance'
        },
        body: JSON.stringify({
          model: model || 'nvidia/llama-3.3-nemotron-super-49b-v1.5',
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ],
          response_format: {
            type: 'json_object'
          }
        })
      }
    );

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.status}`);
    }

    const result = await response.json();
    const text = result.choices?.[0]?.message?.content;
    if (!text) {
      throw new Error("No response from OpenRouter API");
    }
    return JSON.parse(cleanJsonResponse(text));
  } else {
    // Default: Gemini
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }]
            }
          ],
          generationConfig: {
            responseMimeType: 'application/json',
            responseSchema: {
              type: "OBJECT",
              properties: {
                id: { type: "STRING" },
                name: { type: "STRING" },
                description: { type: "STRING" },
                prepTime: { type: "STRING" },
                diets: { type: "ARRAY", items: { type: "STRING" } },
                baseCalories: { type: "NUMBER" },
                macros: {
                  type: "OBJECT",
                  properties: {
                    protein: { type: "NUMBER" },
                    fat: { type: "NUMBER" },
                    carbs: { type: "NUMBER" }
                  },
                  required: ["protein", "fat", "carbs"]
                },
                bullets: { type: "ARRAY", items: { type: "STRING" } },
                ingredients: {
                  type: "ARRAY",
                  items: {
                    type: "OBJECT",
                    properties: {
                      name: { type: "STRING" },
                      baseAmount: { type: "NUMBER" },
                      unit: { type: "STRING" }
                    },
                    required: ["name", "baseAmount", "unit"]
                  }
                },
                instructions: { type: "ARRAY", items: { type: "STRING" } }
              },
              required: ["id", "name", "description", "prepTime", "diets", "baseCalories", "macros", "bullets", "ingredients", "instructions"]
            }
          }
        })
      }
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const result = await response.json();
    const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      throw new Error("No response from Gemini API");
    }
    return JSON.parse(cleanJsonResponse(text));
  }
}

/**
 * Calls AI API (Groq, Gemini, or OpenRouter) for a chatbot conversation, passing user profile & plan context.
 */
export async function askChatBotAi({ messages, profileContext, apiKey, provider = 'groq', model, language = 'en', isAuthenticated = true }) {
  const rateLimitCategory = isAuthenticated ? 'AUTHENTICATED' : 'PUBLIC';
  const rateLimit = checkRateLimit(rateLimitCategory);
  if (!rateLimit.allowed) {
    throw new Error(rateLimit.reason || `Rate limit reached for AI Chat. Please wait ${rateLimit.retryAfterSeconds}s.`);
  }

  const langName = language === 'hi' ? 'Hindi (हिन्दी)' : language === 'te' ? 'Telugu (తెలుగు)' : 'English';
  const systemPrompt = `You are Fitora AI, a professional athletic coach and clinical sports nutritionist.
You help the user with precise, evidence-based guidance about their diet, recipes, exercise form, workouts, and fitness goals.

Here is the user's current profile and targets:
- Age: ${profileContext.age}
- Weight: ${profileContext.weight} kg
- Height: ${profileContext.height} ft
- Preference: ${profileContext.preference}
- Calorie Target: ${profileContext.calorieTarget} kcal
- Protein Target: ${profileContext.proteinTarget}g
- Carbs Target: ${profileContext.carbTarget}g
- Fats Target: ${profileContext.fatTarget}g

Response Guidelines:
1. Maintain a professional, clinical, and authoritative yet supportive tone.
2. Avoid casual fluff. Provide structured, direct answers.
3. CRITICAL: Do NOT use markdown stars or asterisks (like **bold** or *italic*) or hashtags (#) in your response. Output clean plain text, using simple capitalization, line spacing, or standard numbered lists (e.g. "1. Morning Workout: ...") for emphasis instead of asterisks.
4. CRITICAL: You MUST write your response entirely in the ${langName} language. Do NOT respond in English.`;

  // Combine system prompt with conversation history
  const apiMessages = [
    { role: 'system', content: systemPrompt },
    ...messages
  ];

  if (provider === 'groq') {
    const response = await fetch(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: model || 'llama-3.3-70b-versatile',
          messages: apiMessages
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `Groq API error: ${response.status}`);
    }

    const result = await response.json();
    return result.choices?.[0]?.message?.content || "No response from AI.";
  } else if (provider === 'openrouter') {
    const response = await fetch(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'HTTP-Referer': typeof window !== 'undefined' ? window.location.origin : 'https://fitora.app',
          'X-Title': 'Fitora Performance'
        },
        body: JSON.stringify({
          model: model || 'nvidia/llama-3.3-nemotron-super-49b-v1.5',
          messages: apiMessages
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `OpenRouter API error: ${response.status}`);
    }

    const result = await response.json();
    return result.choices?.[0]?.message?.content || "No response from AI.";
  } else {
    // Default: Gemini
    // For Gemini, we convert the messages format to Gemini format:
    // Gemini expects contents: [{ role: 'user'|'model', parts: [{ text: ... }] }]
    const geminiContents = messages.map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: geminiContents,
          systemInstruction: {
            parts: [{ text: systemPrompt }]
          }
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `Gemini API error: ${response.status}`);
    }

    const result = await response.json();
    return result.candidates?.[0]?.content?.parts?.[0]?.text || "No response from AI.";
  }
}

export async function generateAiRecipe({ query, diet, apiKey, provider = 'gemini', model = '', isAuthenticated = false }) {
  const rateLimitCategory = isAuthenticated ? 'AUTHENTICATED' : 'PUBLIC';
  const rateLimit = checkRateLimit(rateLimitCategory);
  if (!rateLimit.allowed) {
    throw new Error(rateLimit.reason || `Rate limit reached for AI Recipe. Please wait ${rateLimit.retryAfterSeconds}s.`);
  }

  if (!apiKey) {
    throw new Error("AI API Key is missing. Please configure it in the Profile Settings.");
  }

  const systemPrompt = `You are a professional chef, sports nutritionist, and fitness meal prep expert.
Your task is to generate exactly 7 distinct, high-performance, macro-friendly recipes matching the user's request.
All 7 recipes must strictly respect the diet type: "${diet}" (can be "veg" for vegetarian or "non" for non-vegetarian/balanced).
You MUST return ONLY a valid JSON object matching this schema. Do not write any explanations, do not write markdown formatting block fences (like \`\`\`json). Just return the raw JSON string.

Schema:
{
  "recipes": [
    {
      "id": "c_custom_${Date.now()}_1",
      "name": "Distinct Recipe Title 1 (professional and appetizing, no emojis)",
      "description": "Appetizing description of the dish and its fitness benefits (no emojis)",
      "tag": "AI CUSTOM RECIPE",
      "prepTime": "Estimated prep/cooking time (e.g. 15 mins)",
      "baseCalories": 450,
      "macros": {
        "protein": 35,
        "carbs": 40,
        "fat": 12
      },
      "ingredients": [
        { "name": "Ingredient Name", "baseAmount": 150, "unit": "g" }
      ],
      "instructions": [
        "Clean step-by-step instructions"
      ]
    },
    ... (generate exactly 7 distinct recipes with ids from c_custom_${Date.now()}_1 to c_custom_${Date.now()}_7)
  ]
}
Ensure the calorie and macro math is accurate (1g protein = 4 kcal, 1g carb = 4 kcal, 1g fat = 9 kcal) for each recipe.`;

  const messages = [
    { role: 'user', content: `Please generate exactly 7 distinct ${diet === 'veg' ? 'vegetarian' : 'non-vegetarian'} recipes for query: "${query}"` }
  ];

  if (provider === 'groq') {
    const response = await fetch(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: model || 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: systemPrompt },
            ...messages
          ],
          temperature: 0.3
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `Groq API error: ${response.status}`);
    }

    const result = await response.json();
    const content = result.choices?.[0]?.message?.content || "";
    return parseCleanJson(content);
  } else if (provider === 'openrouter') {
    const response = await fetch(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'HTTP-Referer': typeof window !== 'undefined' ? window.location.origin : 'https://fitora.app',
          'X-Title': 'Fitora Performance'
        },
        body: JSON.stringify({
          model: model || 'nvidia/llama-3.3-nemotron-super-49b-v1.5',
          messages: [
            { role: 'system', content: systemPrompt },
            ...messages
          ],
          temperature: 0.3
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `OpenRouter API error: ${response.status}`);
    }

    const result = await response.json();
    const content = result.choices?.[0]?.message?.content || "";
    return parseCleanJson(content);
  } else {
    // Gemini
    const geminiContents = [
      {
        role: 'user',
        parts: [{ text: `Please generate exactly 7 distinct ${diet === 'veg' ? 'vegetarian' : 'non-vegetarian'} recipes for query: "${query}"` }]
      }
    ];

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: geminiContents,
          systemInstruction: {
            parts: [{ text: systemPrompt }]
          },
          generationConfig: {
            responseMimeType: "application/json"
          }
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `Gemini API error: ${response.status}`);
    }

    const result = await response.json();
    const content = result.candidates?.[0]?.content?.parts?.[0]?.text || "";
    return parseCleanJson(content);
  }
}

function parseCleanJson(text) {
  try {
    let clean = text.trim();
    if (clean.startsWith('```')) {
      clean = clean.replace(/^```json\s*/i, '').replace(/```\s*$/i, '');
    }
    const parsed = JSON.parse(clean);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    if (parsed && Array.isArray(parsed.recipes)) {
      return parsed.recipes;
    }
    if (parsed && typeof parsed === 'object') {
      return [parsed];
    }
    return [];
  } catch (err) {
    console.error("Failed to parse AI recipe JSON: ", text, err);
    throw new Error("Failed to parse AI generated recipe. Please check your query or API Key.");
  }
}

