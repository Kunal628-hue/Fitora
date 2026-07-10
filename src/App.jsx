import React, { useState, useEffect } from 'react';
import MealColumn from './components/MealColumn';
import ProteinCircle from './components/ProteinCircle';
import DynamicChart from './components/DynamicChart';
import RecipeModal from './components/RecipeModal';
import RoutineBrowser from './components/RoutineBrowser';
import ActiveWorkout from './components/ActiveWorkout';
import { MEAL_TEMPLATES } from './data/meals';
import { WORKOUT_ROUTINES } from './data/workoutData';
import RecipesCatalog from './components/RecipesCatalog';
import { calculateBMR, calculateTDEE } from './utils/nutrition';
import { generateAiPlan, generateSingleMealAi, generateLocalFallbackPlan } from './utils/ai';
import ChatBot from './components/ChatBot';

export default function App() {
  // Navigation
  const [activeTab, setActiveTab] = useState('dashboard');

  // Input Panel Form State (Pre-filled with Design 2 values)
  const [age, setAge] = useState('25');
  const [weight, setWeight] = useState('75');
  const [height, setHeight] = useState('5.9');
  const [steps, setSteps] = useState('8000');
  const [sleep, setSleep] = useState('7.5');
  const [preference, setPreference] = useState('veg'); // veg / non
  const [goal, setGoal] = useState('bulk'); // cut / bulk (Design 2 goal toggles)
  const [extraPreferences, setExtraPreferences] = useState('');

  // Target values state
  const [calorieTarget, setCalorieTarget] = useState(3019);
  const [proteinTarget, setProteinTarget] = useState(302);
  const [carbTarget, setCarbTarget] = useState(302);
  const [fatTarget, setFatTarget] = useState(67);

  // AI-generated 7-day plans
  const [weeklyDietPlan, setWeeklyDietPlan] = useState([]);
  const [weeklyWorkoutPlan, setWeeklyWorkoutPlan] = useState([]);

  // Daily logged values per day index
  const [loggedDays, setLoggedDays] = useState({
    0: { calories: 0, protein: 0, meals: [] },
    1: { calories: 0, protein: 0, meals: [] },
    2: { calories: 0, protein: 0, meals: [] },
    3: { calories: 0, protein: 0, meals: [] },
    4: { calories: 0, protein: 0, meals: [] },
    5: { calories: 0, protein: 0, meals: [] },
    6: { calories: 0, protein: 0, meals: [] },
  });

  // Selected Day Index (Monday is 0, Sunday is 6)
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  // Gym streak & active workout variables
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);
  const [workoutStreak, setWorkoutStreak] = useState(0);
  const [completedDays, setCompletedDays] = useState([]); // Array of day indices completed this week

  // Modal & UI states
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMealSlot, setSelectedMealSlot] = useState(null);
  const [selectedCatalogRecipe, setSelectedCatalogRecipe] = useState(null);
  const [aiProvider, setAiProvider] = useState(() => localStorage.getItem('fitora_ai_provider') || 'groq'); // 'gemini' | 'openrouter' | 'groq'
  const [openRouterModel, setOpenRouterModel] = useState(() => localStorage.getItem('fitora_openrouter_model') || 'llama-3.3-70b-versatile');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const secureApiKey = import.meta.env.VITE_GROQ_API_KEY || import.meta.env.VITE_OPENROUTER_API_KEY || '';

  // Toast
  const [toast, setToast] = useState('');

  // Backward compatible references
  const workoutDayIndex = selectedDayIndex;

  // Active day's computed values
  const mealsConfig = weeklyDietPlan[selectedDayIndex]?.meals || [];
  const currentDayLog = loggedDays[selectedDayIndex] || { calories: 0, protein: 0, meals: [] };
  const loggedMeals = currentDayLog.meals || [];

  // Dynamically calculate logged metrics based on active configuration to ensure 100% correctness
  let computedCalories = 0;
  let computedProtein = 0;

  loggedMeals.forEach(slotKey => {
    const config = mealsConfig.find(c => c.slot === slotKey);
    if (config && config.meal) {
      const scaleFactor = config.targetCalories / config.meal.baseCalories;
      const mealProtein = Math.round(config.meal.macros.protein * scaleFactor);
      const mealCalories = Math.round(config.targetCalories);
      computedCalories += mealCalories;
      computedProtein += mealProtein;
    }
  });

  const customEntries = currentDayLog.customEntries || [];
  customEntries.forEach(entry => {
    computedCalories += entry.calories;
    computedProtein += entry.protein;
  });

  // Backward compatibility fallback for legacy logs
  if (computedCalories === 0 && computedProtein === 0 && (currentDayLog.calories > 0 || currentDayLog.protein > 0)) {
    computedCalories = currentDayLog.calories || 0;
    computedProtein = currentDayLog.protein || 0;
  }

  const loggedCalories = computedCalories;
  const loggedProtein = computedProtein;

  // Initial calculation and generation on mount
  // Initial calculation and generation on mount
  useEffect(() => {
    const d = new Date().getDay();
    const todayIdx = d === 0 ? 6 : d - 1; // Map Sun(0)->6, Mon(1)->0 ... Sat(6)->5
    setSelectedDayIndex(todayIdx);

    // Load saved data from localStorage
    const savedProfile = localStorage.getItem('fitora_merged_profile');
    const savedDietPlan = localStorage.getItem('fitora_diet_plan');
    const savedWorkoutPlan = localStorage.getItem('fitora_workout_plan');
    const savedLoggedDays = localStorage.getItem('fitora_logged_days');
    const savedStreak = localStorage.getItem('fitora_workout_streak');
    const savedCompleted = localStorage.getItem('fitora_workout_completed');
    const savedProvider = localStorage.getItem('fitora_ai_provider');
    const savedModel = localStorage.getItem('fitora_openrouter_model');

    if (savedProvider) {
      setAiProvider(savedProvider);
    }
    if (savedModel) {
      if (savedModel === 'nvidia/llama-3.1-nemotron-70b-instruct') {
        localStorage.setItem('fitora_openrouter_model', 'nvidia/llama-3.3-nemotron-super-49b-v1.5');
        setOpenRouterModel('nvidia/llama-3.3-nemotron-super-49b-v1.5');
      } else {
        setOpenRouterModel(savedModel);
      }
    }

    let parsedSuccessfully = false;

    if (savedProfile && savedProfile !== 'undefined' &&
        savedDietPlan && savedDietPlan !== 'undefined' &&
        savedWorkoutPlan && savedWorkoutPlan !== 'undefined' &&
        savedLoggedDays && savedLoggedDays !== 'undefined') {
      try {
        const profile = JSON.parse(savedProfile);
        
        let loadedHeight = profile.height;
        if (loadedHeight && parseFloat(loadedHeight) > 15) {
          loadedHeight = (parseFloat(loadedHeight) / 30.48).toFixed(1);
          profile.height = loadedHeight;
          localStorage.setItem('fitora_merged_profile', JSON.stringify(profile));
        }

        setAge(profile.age || '25');
        setWeight(profile.weight || '75');
        setHeight(loadedHeight || '5.9');
        setSteps(profile.steps || '8000');
        setSleep(profile.sleep || '7.5');
        setPreference(profile.preference || 'veg');
        setExtraPreferences(profile.extraPreferences || '');
        setGoal(profile.goal || 'bulk');

        setCalorieTarget(profile.calorieTarget || 3019);
        setProteinTarget(profile.proteinTarget || 302);
        setCarbTarget(profile.carbTarget || 302);
        setFatTarget(profile.fatTarget || 67);

        const parsedDiet = JSON.parse(savedDietPlan);
        const parsedWorkout = JSON.parse(savedWorkoutPlan);

        const isDietPlanValid = Array.isArray(parsedDiet) && parsedDiet.length === 7 &&
          parsedDiet.every(d => 
            Array.isArray(d.meals) && 
            d.meals.length === 4 && 
            d.meals.every(m => 
              m.meal && 
              typeof m.meal === 'object' && 
              Array.isArray(m.meal.ingredients) && 
              m.meal.ingredients.length > 0 && 
              typeof m.targetCalories === 'number' && 
              !isNaN(m.targetCalories)
            )
          );

        const isWorkoutPlanValid = Array.isArray(parsedWorkout) && parsedWorkout.length === 7;

        if (isDietPlanValid && isWorkoutPlanValid) {
          setWeeklyDietPlan(parsedDiet);
          setWeeklyWorkoutPlan(parsedWorkout);
          setLoggedDays(JSON.parse(savedLoggedDays));
          parsedSuccessfully = true;
        }
      } catch (err) {
        console.error("Error loading saved plan, falling back...", err);
      }
    }

    if (!parsedSuccessfully) {
      localStorage.removeItem('fitora_merged_profile');
      localStorage.removeItem('fitora_diet_plan');
      localStorage.removeItem('fitora_workout_plan');
      localStorage.removeItem('fitora_logged_days');
      
      setAge('25');
      setWeight('75');
      setHeight('5.9');
      setSteps('8000');
      setSleep('7.5');
      setPreference('veg');
      setExtraPreferences('');
      setGoal('bulk');

      const bmr = calculateBMR(75, 5.9 * 30.48, 25, 'male');
      const tdee = calculateTDEE(bmr, 'moderate');
      const calories = Math.round(tdee + 300);
      const p = Math.round((calories * 0.40) / 4);
      const c = Math.round((calories * 0.40) / 4);
      const f = Math.round((calories * 0.20) / 9);

      setCalorieTarget(calories);
      setProteinTarget(p);
      setCarbTarget(c);
      setFatTarget(f);

      const plan = generateLocalFallbackPlan({ preference: 'veg', calorieTarget: calories });
      setWeeklyDietPlan(plan.dietPlan);
      setWeeklyWorkoutPlan(plan.workoutPlan);

      let initialLogs = {
        0: { calories: 0, protein: 0, meals: [] },
        1: { calories: 0, protein: 0, meals: [] },
        2: { calories: 0, protein: 0, meals: [] },
        3: { calories: 0, protein: 0, meals: [] },
        4: { calories: 0, protein: 0, meals: [] },
        5: { calories: 0, protein: 0, meals: [] },
        6: { calories: 0, protein: 0, meals: [] },
      };

      const todayMeals = plan.dietPlan[todayIdx]?.meals || [];
      let todayCal = 0;
      let todayProt = 0;
      const loggedSlots = ['lunch', 'snack'];
      
      loggedSlots.forEach(slot => {
        const config = todayMeals.find(m => m.slot === slot);
        if (config) {
          todayCal += Math.round(config.targetCalories);
          const scaleFactor = config.targetCalories / config.meal.baseCalories;
          todayProt += Math.round(config.meal.macros.protein * scaleFactor);
        }
      });

      initialLogs[todayIdx] = {
        calories: todayCal,
        protein: todayProt,
        meals: loggedSlots
      };

      setLoggedDays(initialLogs);
      localStorage.setItem('fitora_logged_days', JSON.stringify(initialLogs));
    }

    if (savedStreak) setWorkoutStreak(parseInt(savedStreak, 10) || 0);
    if (savedCompleted && savedCompleted !== 'undefined') {
      try {
        setCompletedDays(JSON.parse(savedCompleted));
      } catch (e) {
        console.error("Error loading completed workouts:", e);
      }
    }
    
    setIsLoaded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(''), 3000);
  };

  // Recalculate targets and plan instantly on detail change (local fallback updates for fast reactions)
  useEffect(() => {
    if (!isLoaded || isGenerating) return;

    const parsedAge = parseInt(age, 10);
    const parsedWeight = parseFloat(weight);
    const parsedHeight = parseFloat(height);
    const parsedSteps = parseInt(steps, 10) || 8000;
    const parsedSleep = parseFloat(sleep);

    if (isNaN(parsedAge) || isNaN(parsedWeight) || isNaN(parsedHeight) || isNaN(parsedSleep)) {
      return;
    }

    const heightCm = parsedHeight * 30.48;
    const bmr = calculateBMR(parsedWeight, heightCm, parsedAge, 'male');
    
    let activityLevel = 'moderate';
    if (parsedSteps < 5000) activityLevel = 'sedentary';
    else if (parsedSteps < 8000) activityLevel = 'light';
    else if (parsedSteps < 12000) activityLevel = 'moderate';
    else activityLevel = 'active';

    const tdee = calculateTDEE(bmr, activityLevel);

    let calories = tdee;
    if (goal === 'cut') {
      calories = tdee - 500;
    } else if (goal === 'bulk') {
      calories = tdee + 300;
    }
    calories = Math.round(calories);

    const p = Math.round((calories * 0.40) / 4);
    const c = Math.round((calories * 0.40) / 4);
    const f = Math.round((calories * 0.20) / 9);

    setCalorieTarget(calories);
    setProteinTarget(p);
    setCarbTarget(c);
    setFatTarget(f);

    const plan = generateLocalFallbackPlan({
      preference,
      calorieTarget: calories
    });

    setWeeklyDietPlan(plan.dietPlan);
    setWeeklyWorkoutPlan(plan.workoutPlan);

    const profile = {
      age: parsedAge.toString(),
      weight: parsedWeight.toString(),
      height: parsedHeight.toString(),
      steps: parsedSteps.toString(),
      sleep: parsedSleep.toString(),
      preference,
      extraPreferences,
      goal,
      calorieTarget: calories,
      proteinTarget: p,
      carbTarget: c,
      fatTarget: f,
    };
    localStorage.setItem('fitora_merged_profile', JSON.stringify(profile));
    localStorage.setItem('fitora_diet_plan', JSON.stringify(plan.dietPlan));
    localStorage.setItem('fitora_workout_plan', JSON.stringify(plan.workoutPlan));

  }, [age, weight, height, steps, sleep, preference, goal, extraPreferences, isLoaded]);

  // Full AI Generation when clicking "Generate My Plan"
  const handleGeneratePlan = async () => {
    setIsGenerating(true);
    showToast('Generating personalized AI plan...');

    const parsedAge = parseInt(age, 10);
    const parsedWeight = parseFloat(weight);
    const parsedHeight = parseFloat(height);
    const parsedSteps = parseInt(steps, 10) || 8000;
    const parsedSleep = parseFloat(sleep);

    const heightCm = parsedHeight * 30.48;
    const bmr = calculateBMR(parsedWeight, heightCm, parsedAge, 'male');
    
    let activityLevel = 'moderate';
    if (parsedSteps < 5000) activityLevel = 'sedentary';
    else if (parsedSteps < 8000) activityLevel = 'light';
    else if (parsedSteps < 12000) activityLevel = 'moderate';
    else activityLevel = 'active';

    const tdee = calculateTDEE(bmr, activityLevel);

    let calories = tdee;
    if (goal === 'cut') {
      calories = tdee - 500;
    } else if (goal === 'bulk') {
      calories = tdee + 300;
    }
    calories = Math.round(calories);

    const p = Math.round((calories * 0.40) / 4);
    const c = Math.round((calories * 0.40) / 4);
    const f = Math.round((calories * 0.20) / 9);

    setCalorieTarget(calories);
    setProteinTarget(p);
    setCarbTarget(c);
    setFatTarget(f);

    const apiKey = secureApiKey;
    let generatedPlan = null;

    if (apiKey) {
      try {
        generatedPlan = await generateAiPlan({
          age: parsedAge,
          weight: parsedWeight,
          height: Math.round(heightCm),
          steps: parsedSteps,
          sleep: parsedSleep,
          preference,
          extraPreferences,
          goal,
          targets: {
            calorieTarget: calories,
            proteinTarget: p,
            carbTarget: c,
            fatTarget: f
          },
          apiKey,
          provider: aiProvider,
          model: openRouterModel
        });
      } catch (err) {
        console.error(err);
        showToast('AI Plan generation failed. Using local fallback.');
      }
    }

    if (!generatedPlan) {
      generatedPlan = generateLocalFallbackPlan({
        preference,
        calorieTarget: calories
      });
    }

    const finalDietPlan = generatedPlan.dietPlan || generatedPlan.diet_plan || generatedPlan.dietplan || [];
    const finalWorkoutPlan = generatedPlan.workoutPlan || generatedPlan.workout_plan || generatedPlan.workoutplan || [];

    const isDietValid = Array.isArray(finalDietPlan) && finalDietPlan.length === 7 &&
      finalDietPlan.every(d => 
        Array.isArray(d.meals) && 
        d.meals.length === 4 && 
        d.meals.every(m => 
          m.meal && 
          typeof m.meal === 'object' && 
          Array.isArray(m.meal.ingredients) && 
          m.meal.ingredients.length > 0 && 
          typeof m.targetCalories === 'number' && 
          !isNaN(m.targetCalories)
        )
      );

    const isWorkoutValid = Array.isArray(finalWorkoutPlan) && finalWorkoutPlan.length === 7;

    if (isDietValid && isWorkoutValid) {
      setWeeklyDietPlan(finalDietPlan);
      setWeeklyWorkoutPlan(finalWorkoutPlan);
      localStorage.setItem('fitora_diet_plan', JSON.stringify(finalDietPlan));
      localStorage.setItem('fitora_workout_plan', JSON.stringify(finalWorkoutPlan));

      // Reset daily log states for the new plan
      let initialLogs = {
        0: { calories: 0, protein: 0, meals: [] },
        1: { calories: 0, protein: 0, meals: [] },
        2: { calories: 0, protein: 0, meals: [] },
        3: { calories: 0, protein: 0, meals: [] },
        4: { calories: 0, protein: 0, meals: [] },
        5: { calories: 0, protein: 0, meals: [] },
        6: { calories: 0, protein: 0, meals: [] },
      };
      setLoggedDays(initialLogs);
      localStorage.setItem('fitora_logged_days', JSON.stringify(initialLogs));

      showToast('Personalized AI plan generated!');
    } else {
      showToast('AI response was incomplete. Using local fallback.');
      const fallback = generateLocalFallbackPlan({
        preference,
        calorieTarget: calories
      });
      setWeeklyDietPlan(fallback.dietPlan);
      setWeeklyWorkoutPlan(fallback.workoutPlan);
      localStorage.setItem('fitora_diet_plan', JSON.stringify(fallback.dietPlan));
      localStorage.setItem('fitora_workout_plan', JSON.stringify(fallback.workoutPlan));

      let initialLogs = {
        0: { calories: 0, protein: 0, meals: [] },
        1: { calories: 0, protein: 0, meals: [] },
        2: { calories: 0, protein: 0, meals: [] },
        3: { calories: 0, protein: 0, meals: [] },
        4: { calories: 0, protein: 0, meals: [] },
        5: { calories: 0, protein: 0, meals: [] },
        6: { calories: 0, protein: 0, meals: [] },
      };
      setLoggedDays(initialLogs);
      localStorage.setItem('fitora_logged_days', JSON.stringify(initialLogs));
    }
    setIsGenerating(false);
  };

  const handleSwapMeal = async (slotKey) => {
    const dayPlan = weeklyDietPlan[selectedDayIndex];
    if (!dayPlan) return;
    
    const config = dayPlan.meals.find((c) => c.slot === slotKey);
    if (!config) return;

    const apiKey = secureApiKey;
    let newMeal = null;

    if (apiKey) {
      showToast('Swapping meal using AI...');
      try {
        newMeal = await generateSingleMealAi({
          slot: slotKey,
          preference,
          extraPreferences,
          goal,
          targetCalories: config.targetCalories,
          apiKey,
          provider: aiProvider,
          model: openRouterModel
        });
      } catch (err) {
        console.error(err);
        showToast('AI Swap failed. Using local database swap.');
      }
    }

    const isMealValid = newMeal && 
      typeof newMeal === 'object' && 
      Array.isArray(newMeal.ingredients) && 
      newMeal.ingredients.length > 0;

    if (!isMealValid) {
      if (newMeal) {
        showToast('AI Swap response was incomplete. Using local database swap.');
      }
      const templates = MEAL_TEMPLATES[slotKey] || [];
      let filtered = templates.filter((t) => t.diets.includes(preference));
      if (filtered.length === 0) {
        filtered = templates;
      }

      const currentMealId = config.meal?.id;
      const otherChoices = filtered.filter((t) => t.id !== currentMealId);
      const finalChoices = otherChoices.length > 0 ? otherChoices : filtered;

      if (finalChoices.length === 0) {
        showToast('No alternative recipes found.');
        return;
      }

      const randomIndex = Math.floor(Math.random() * finalChoices.length);
      newMeal = finalChoices[randomIndex];
    }

    // Update meal config in diet plan
    const updatedMeals = dayPlan.meals.map((c) => {
      if (c.slot === slotKey) {
        return { ...c, meal: newMeal };
      }
      return c;
    });

    const updatedPlan = weeklyDietPlan.map((p, idx) => {
      if (idx === selectedDayIndex) {
        return { ...p, meals: updatedMeals };
      }
      return p;
    });

    setWeeklyDietPlan(updatedPlan);
    localStorage.setItem('fitora_diet_plan', JSON.stringify(updatedPlan));

    const wasLogged = loggedMeals.includes(slotKey);
    let newLoggedMeals = [...loggedMeals];

    if (wasLogged) {
      newLoggedMeals = loggedMeals.filter((s) => s !== slotKey);
      
      let updatedCalories = 0;
      let updatedProtein = 0;

      newLoggedMeals.forEach(s => {
        const c = mealsConfig.find(m => m.slot === s);
        if (c && c.meal) {
          const sf = c.targetCalories / c.meal.baseCalories;
          updatedCalories += Math.round(c.targetCalories);
          updatedProtein += Math.round(c.meal.macros.protein * sf);
        }
      });

      const customEntries = currentDayLog.customEntries || [];
      customEntries.forEach(entry => {
        updatedCalories += entry.calories;
        updatedProtein += entry.protein;
      });

      const updatedLogs = {
        ...loggedDays,
        [selectedDayIndex]: {
          ...currentDayLog,
          calories: updatedCalories,
          protein: updatedProtein,
          meals: newLoggedMeals,
        }
      };
      setLoggedDays(updatedLogs);
      localStorage.setItem('fitora_logged_days', JSON.stringify(updatedLogs));
    }

    showToast(`Swapped to ${newMeal.name}`);
  };

  const handleLogMeal = (slotKey) => {
    if (loggedMeals.includes(slotKey)) return;

    const config = mealsConfig.find((c) => c.slot === slotKey);
    if (!config) return;

    const scaleFactor = config.targetCalories / config.meal.baseCalories;
    const mealProtein = Math.round(config.meal.macros.protein * scaleFactor);
    const mealCalories = Math.round(config.targetCalories);
    const newLoggedMeals = [...loggedMeals, slotKey];

    // Compute updated total calories and protein dynamically
    let updatedCalories = mealCalories;
    let updatedProtein = mealProtein;

    loggedMeals.forEach(s => {
      const c = mealsConfig.find(m => m.slot === s);
      if (c && c.meal) {
        const sf = c.targetCalories / c.meal.baseCalories;
        updatedCalories += Math.round(c.targetCalories);
        updatedProtein += Math.round(c.meal.macros.protein * sf);
      }
    });

    const customEntries = currentDayLog.customEntries || [];
    customEntries.forEach(entry => {
      updatedCalories += entry.calories;
      updatedProtein += entry.protein;
    });

    const updatedLogs = {
      ...loggedDays,
      [selectedDayIndex]: {
        ...currentDayLog,
        calories: updatedCalories,
        protein: updatedProtein,
        meals: newLoggedMeals,
      }
    };

    setLoggedDays(updatedLogs);
    localStorage.setItem('fitora_logged_days', JSON.stringify(updatedLogs));

    showToast(`Logged ${config.meal.name}! (+${mealCalories} kcal)`);
  };

  const handleViewDetails = (slotKey) => {
    setSelectedMealSlot(slotKey);
    setSelectedCatalogRecipe(null);
    setModalOpen(true);
  };

  const handleViewCatalogRecipeDetails = (recipe) => {
    setSelectedCatalogRecipe(recipe);
    setSelectedMealSlot(null);
    setModalOpen(true);
  };

  const handleAddCustomEntry = () => {
    const customKcalStr = prompt('Enter custom calories to log (kcal):', '200');
    if (customKcalStr === null) return;
    
    const kcal = parseInt(customKcalStr, 10);
    if (isNaN(kcal) || kcal <= 0) {
      alert('Please enter a valid positive number.');
      return;
    }

    const customProteinStr = prompt('Enter protein amount for this entry (grams):', '15');
    if (customProteinStr === null) return;
    
    const protein = parseInt(customProteinStr, 10);
    if (isNaN(protein) || protein < 0) {
      alert('Please enter a valid number.');
      return;
    }

    const customEntriesList = currentDayLog.customEntries || [];
    const newEntry = { id: `custom_${Date.now()}`, calories: kcal, protein: protein };
    const updatedCustomEntries = [...customEntriesList, newEntry];

    // Compute new totals
    let computedCalories = kcal;
    let computedProtein = protein;

    loggedMeals.forEach(slotKey => {
      const config = mealsConfig.find(c => c.slot === slotKey);
      if (config && config.meal) {
        const scaleFactor = config.targetCalories / config.meal.baseCalories;
        computedCalories += Math.round(config.targetCalories);
        computedProtein += Math.round(config.meal.macros.protein * scaleFactor);
      }
    });

    customEntriesList.forEach(entry => {
      computedCalories += entry.calories;
      computedProtein += entry.protein;
    });

    const updatedLogs = {
      ...loggedDays,
      [selectedDayIndex]: {
        ...currentDayLog,
        calories: computedCalories,
        protein: computedProtein,
        customEntries: updatedCustomEntries
      }
    };

    setLoggedDays(updatedLogs);
    localStorage.setItem('fitora_logged_days', JSON.stringify(updatedLogs));

    showToast(`Added custom entry: +${kcal} kcal, +${protein}g Protein`);
  };

  // Workout Session Completed handler
  const handleFinishWorkout = (exercisesDone) => {
    if (exercisesDone === 0) {
      showToast('No exercises completed yet! Do some reps first.');
      setIsWorkoutActive(false);
      return;
    }

    // Add to completed list if not already completed today
    let updatedCompleted = [...completedDays];
    if (!completedDays.includes(workoutDayIndex)) {
      updatedCompleted.push(workoutDayIndex);
    }

    const newStreak = workoutStreak + 1;
    setWorkoutStreak(newStreak);
    setCompletedDays(updatedCompleted);

    localStorage.setItem('fitora_workout_streak', newStreak.toString());
    localStorage.setItem('fitora_workout_completed', JSON.stringify(updatedCompleted));

    setIsWorkoutActive(false);
    showToast(`Workout Finished! Streak: ${newStreak} days! 🔥`);
  };

  const selectedMealConfig = mealsConfig.find((c) => c.slot === selectedMealSlot);

  // Computed values
  const calPercent = Math.min(100, Math.round((loggedCalories / calorieTarget) * 100)) || 0;
  const calRemaining = Math.max(0, calorieTarget - loggedCalories);

  return (
    <div className="app-container">
      {/* Main Header */}
      <header className="app-header">
        <span className="logo-fitora">Fitora</span>
        <nav className="nav-links" aria-label="Main Navigation">
          <button 
            type="button" 
            className={`nav-link-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
            id="nav-btn-dashboard"
          >
            Dashboard
          </button>
          <button 
            type="button" 
            className={`nav-link-btn ${activeTab === 'workout' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('workout');
              setIsWorkoutActive(false); // Default to calendar browser view
            }}
            id="nav-btn-workout"
          >
            Workout
          </button>
          <button 
            type="button" 
            className={`nav-link-btn ${activeTab === 'recipes' ? 'active' : ''}`}
            onClick={() => setActiveTab('recipes')}
            id="nav-btn-recipes"
          >
            Recipes
          </button>
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-secondary)' }}>
          {workoutStreak > 0 && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.85rem', fontWeight: '700', color: 'var(--accent-coral)', background: 'rgba(255, 125, 112, 0.1)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="12" height="12" fill="currentColor"><path d="M12 12.5c-1.38 0-2.5-1.12-2.5-2.5 0-1.89 1.5-3.5 3.5-5.5 2 2 3.5 3.61 3.5 5.5 0 1.38-1.12 2.5-2.5 2.5zM17.66 11.2c-.22-2.15-1.74-4.88-5.66-8.2-3.92 3.32-5.44 6.05-5.66 8.2-1 .92-1.63 2.24-1.63 3.7A5.25 5.25 0 0 0 10.3 20.3a5.25 5.25 0 0 0 7.4 0 5.25 5.25 0 0 0 1.63-3.7c0-1.46-.63-2.78-1.67-3.7z"/></svg>
              {workoutStreak} Day Streak
            </span>
          )}
          <span style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer', color: 'var(--text-secondary)' }} onClick={() => alert('Logged in as Kunal')}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
          </span>
        </div>
      </header>

      {/* DASHBOARD TAB */}
      {activeTab === 'dashboard' && (
        <main className="step-container">
          {/* Top Form Panel (Design 2 Form) */}
          <section className="form-panel-card" aria-label="Profile Settings Form">
            <div className="inline-form-grid">
              <div className="form-input-group">
                <label htmlFor="age">Age</label>
                <input
                  type="number"
                  id="age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="inline-input"
                  min="1"
                  max="120"
                />
              </div>

              <div className="form-input-group">
                <label htmlFor="weight">Weight (KG)</label>
                <input
                  type="number"
                  id="weight"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="inline-input"
                  min="30"
                  max="250"
                />
              </div>

              <div className="form-input-group">
                <label htmlFor="height">Height (FT)</label>
                <input
                  type="number"
                  id="height"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="inline-input"
                  step="0.1"
                  min="3"
                  max="8"
                />
              </div>


              <div className="form-input-group">
                <label htmlFor="sleep">Sleep (HRS)</label>
                <input
                  type="number"
                  id="sleep"
                  step="0.5"
                  value={sleep}
                  onChange={(e) => setSleep(e.target.value)}
                  className="inline-input"
                  min="0"
                  max="24"
                />
              </div>

              {/* Preference toggle */}
              <div className="form-input-group">
                <label>Preference</label>
                <div className="toggle-group-row">
                  <button
                    type="button"
                    className={`toggle-btn ${preference === 'veg' ? 'active' : ''}`}
                    onClick={() => setPreference('veg')}
                    id="pref-veg-btn"
                  >
                    Veg
                  </button>
                  <button
                    type="button"
                    className={`toggle-btn ${preference === 'non' ? 'active' : ''}`}
                    onClick={() => setPreference('non')}
                    id="pref-non-btn"
                  >
                    Non
                  </button>
                </div>
              </div>


              {/* Extra Preferences */}
              {/* Extra Preferences */}
              <div className="form-input-group" style={{ gridColumn: 'span 2' }}>
                <label htmlFor="extraPreferences">Allergies / Special Requests</label>
                <input
                  type="text"
                  id="extraPreferences"
                  value={extraPreferences}
                  onChange={(e) => setExtraPreferences(e.target.value)}
                  placeholder="e.g. gluten-free, focus legs..."
                  className="inline-input"
                />
              </div>
            </div>

            {/* Centered Generate Button */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem', width: '100%' }}>
              <button 
                type="button" 
                className="btn btn-primary" 
                style={{ width: '100%', maxWidth: '360px', minHeight: '44px', background: 'var(--accent-coral)' }}
                onClick={handleGeneratePlan}
                id="generate-plan-btn"
              >
                Generate My Plan
              </button>
            </div>
          </section>

          {/* Targets Strip Row (Design 2 target bar) */}
          <section className="targets-strip-card" aria-label="Nutritional Target Values">
            <div className="target-strip-item">
              <span className="target-strip-label">Calorie Target</span>
              <span className="target-strip-value">{calorieTarget}</span>
            </div>
            <div className="target-strip-item">
              <span className="target-strip-label">Protein</span>
              <span className="target-strip-value">{proteinTarget}<span className="target-strip-unit">g</span></span>
            </div>
            <div className="target-strip-item">
              <span className="target-strip-label">Carbs</span>
              <span className="target-strip-value">{carbTarget}<span className="target-strip-unit">g</span></span>
            </div>
            <div className="target-strip-item">
              <span className="target-strip-label">Fats</span>
              <span className="target-strip-value">{fatTarget}<span className="target-strip-unit">g</span></span>
            </div>
          </section>

          {/* Weekday Selector Row */}
          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(7, 1fr)', 
              gap: '1rem', 
              marginBottom: '2.5rem' 
            }}
          >
            {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((dayName, idx) => {
              const isActive = selectedDayIndex === idx;
              const dayNumber = `0${idx + 1}`;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedDayIndex(idx)}
                  style={{
                    background: '#11131a',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '6px',
                    padding: '1.25rem 0.5rem',
                    cursor: 'pointer',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.25rem',
                    transition: 'all var(--transition-normal)',
                    position: 'relative',
                    outline: 'none'
                  }}
                  id={`db-day-select-${idx}`}
                >
                  <span style={{ fontSize: '0.75rem', fontWeight: '800', color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)', letterSpacing: '0.05em' }}>
                    {dayName}
                  </span>
                  <span style={{ fontSize: '1.6rem', fontWeight: '900', color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                    {dayNumber}
                  </span>
                  {/* Highlight red underline */}
                  {isActive && (
                    <div 
                      style={{ 
                        position: 'absolute', 
                        bottom: 0, 
                        left: 0, 
                        right: 0, 
                        height: '3px', 
                        background: 'var(--accent-red)' 
                      }} 
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* 4 Column Meal Plan menu list (Design 2) */}
          <section aria-labelledby="daily-meal-plan-menu" style={{ marginBottom: '2.5rem' }}>
            <div className="section-heading-row" id="daily-meal-plan-menu">
              <h2 style={{ fontSize: '1.4rem', fontWeight: '800' }}>Personalised Meal Plan</h2>
            </div>
            
            {weeklyDietPlan.length === 0 ? (
              <div 
                className="glass-panel" 
                style={{ 
                  padding: '2.5rem', 
                  textAlign: 'center', 
                  color: 'var(--text-secondary)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.75rem',
                  border: '1px dashed rgba(255, 255, 255, 0.15)',
                  borderRadius: '12px',
                  background: 'rgba(20, 22, 30, 0.5)'
                }}
              >
                 <span style={{ display: 'flex', alignItems: 'center' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="currentColor" style={{ opacity: 0.5, marginBottom: '0.75rem', color: 'var(--text-secondary)' }}><path d="M11 9H9V2H7v7H5V2H3v7c0 2.21 1.79 4 4 4v9h2v-9c2.21 0 4-1.79 4-4V2h-2v7zm10-5c0-1.1-.9-2-2-2h-3v12h3c1.1 0 2-.9 2-2V4zm-5 18h2v-6h-2v6z"/></svg>
                </span>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--text-primary)' }}>No Meal Plan Generated</h3>
                <p style={{ maxWidth: '400px', fontSize: '0.85rem', lineHeight: '1.5', margin: '0' }}>
                  Please enter your profile details above and click <strong>"Generate My Plan"</strong> (or choose your Diet Preference) to build your custom day-wise meal plan.
                </p>
              </div>
            ) : (
              <div className="menu-grid-4col">
                {['breakfast', 'lunch', 'snack', 'dinner'].map((slot) => {
                  const config = mealsConfig.find((c) => c.slot === slot);
                  if (!config) return null;

                  return (
                    <MealColumn
                      key={slot}
                      slot={slot}
                      meal={config.meal}
                      targetCalories={config.targetCalories}
                      isLogged={loggedMeals.includes(slot)}
                      onLog={() => handleLogMeal(slot)}
                      onSwap={() => handleSwapMeal(slot)}
                      onViewDetails={() => handleViewDetails(slot)}
                    />
                  );
                })}
              </div>
            )}
          </section>

          {/* Header Section Performance (Design 1) */}
          <section className="summary-performance-section" aria-labelledby="daily-summary-performance">
            <div className="performance-title-group" id="daily-summary-performance">
              <span className="performance-subtitle">Daily Summary</span>
              <h1 className="performance-main-title">Performance</h1>
            </div>
            <button 
              type="button" 
              className="btn btn-primary" 
              onClick={handleAddCustomEntry}
              id="add-entry-btn"
            >
              Add Entry
            </button>
          </section>

          {/* Trackers Row (Design 1 & 2 layout merge) */}
          <section className="trackers-row-grid" aria-label="Progress Trackers Dashboard">


            {/* Card 2: Protein Goal Circle (Design 1) */}
            <div className="tracker-card" style={{ alignItems: 'center' }}>
              <h3 style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', alignSelf: 'flex-start', marginBottom: '0.5rem' }}>
                Protein Goal
              </h3>
              <ProteinCircle logged={loggedProtein} target={proteinTarget} />
            </div>

            {/* Card 3: Macro Ratio Donut (Design 2) */}
            <div className="tracker-card">
              <h3 style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                Macro Ratio
              </h3>
              <DynamicChart 
                proteinPct={40} 
                carbPct={40} 
                fatPct={20} 
              />
              <div style={{ fontSize: '0.75rem', fontStyle: 'italic', color: 'var(--text-muted)', textAlign: 'center', marginTop: '1rem' }}>
                Optimize for hypertrophy
              </div>
            </div>
          </section>
        </main>
      )}

      {/* WORKOUT TAB */}
      {activeTab === 'workout' && (
        <main className="step-container" style={{ margin: '1rem 0' }}>
          {isWorkoutActive ? (
            <ActiveWorkout
              routine={weeklyWorkoutPlan[selectedDayIndex] || WORKOUT_ROUTINES[selectedDayIndex]}
              onFinishWorkout={handleFinishWorkout}
            />
          ) : (
            <RoutineBrowser
              weeklyWorkoutPlan={weeklyWorkoutPlan}
              selectedDayIndex={selectedDayIndex}
              onSelectDay={setSelectedDayIndex}
              onStartWorkout={() => setIsWorkoutActive(true)}
            />
          )}
        </main>
      )}

      {/* RECIPES CATALOG TAB */}
      {activeTab === 'recipes' && (
        <main className="step-container" style={{ margin: '1rem 0' }}>
          <RecipesCatalog 
            onViewDetails={handleViewCatalogRecipeDetails} 
            apiKey={secureApiKey}
            provider={aiProvider}
            model={openRouterModel}
          />
        </main>
      )}

      {/* Footer Section */}
      <footer className="app-footer">
        <span style={{ fontWeight: '800' }}>Fitora</span>
        <span>© 2024 Fitora Performance. All Rights Reserved.</span>
        <div className="footer-links">
          <button type="button" className="footer-link-btn" onClick={() => alert('Privacy policy is standard client-side compliance.')}>Privacy Policy</button>
          <button type="button" className="footer-link-btn" onClick={() => alert('Terms of service apply.')}>Terms</button>
          <button type="button" className="footer-link-btn" onClick={() => alert('Contact us at support@fitora.com')}>Contact</button>
        </div>
      </footer>

      {/* Recipe Instructions Details Modal */}
      <RecipeModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedCatalogRecipe(null);
        }}
        meal={selectedCatalogRecipe ? selectedCatalogRecipe : selectedMealConfig?.meal}
        targetCalories={selectedCatalogRecipe ? selectedCatalogRecipe.baseCalories : (selectedMealConfig?.targetCalories || 0)}
        isLogged={selectedCatalogRecipe ? loggedMeals.includes(selectedCatalogRecipe.id) : loggedMeals.includes(selectedMealSlot)}
        onLog={() => {
          if (selectedCatalogRecipe) {
            const newCalories = loggedCalories + selectedCatalogRecipe.baseCalories;
            const newProtein = loggedProtein + selectedCatalogRecipe.macros.protein;
            const newLoggedMeals = [...loggedMeals, selectedCatalogRecipe.id];
            
            const customEntriesList = currentDayLog.customEntries || [];
            const newEntry = { id: selectedCatalogRecipe.id, calories: selectedCatalogRecipe.baseCalories, protein: selectedCatalogRecipe.macros.protein };
            const updatedCustomEntries = [...customEntriesList, newEntry];

            const updatedLogs = {
              ...loggedDays,
              [selectedDayIndex]: {
                ...currentDayLog,
                calories: newCalories,
                protein: newProtein,
                customEntries: updatedCustomEntries,
                meals: newLoggedMeals
              }
            };
            setLoggedDays(updatedLogs);
            localStorage.setItem('fitora_logged_days', JSON.stringify(updatedLogs));
            showToast(`Logged ${selectedCatalogRecipe.name}! (+${selectedCatalogRecipe.baseCalories} kcal)`);
          } else {
            handleLogMeal(selectedMealSlot);
          }
        }}
      />



      {/* AI Generation Loading Overlay */}
      {isGenerating && (
        <div 
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(7, 8, 11, 0.95)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            zIndex: 4000,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            textAlign: 'center'
          }}
        >
          {/* Animated pulsing robot icon */}
          <div 
            style={{ 
              marginBottom: '1.5rem', 
              animation: 'pulse 1.5s infinite ease-in-out',
              filter: 'drop-shadow(0 0 15px rgba(255, 125, 112, 0.6))',
              color: 'var(--accent-coral)'
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="72" height="72" fill="currentColor"><path d="M19 8h-1.18c-.46-2.28-2.48-4-4.82-4-.83 0-1.62.24-2.3.66L9.66 3.62C9.44 3.4 9.11 3.4 8.89 3.62L7.48 5.03c-.22.22-.22.56 0 .78l1.35 1.35C8.34 8.01 8 9.07 8 10.22c0 2.34 1.72 4.36 4 4.82V17h-2c-1.1 0-2 .9-2 2v2h8v-2c0-1.1-.9-2-2-2h-2v-1.96c2.28-.46 4-2.48 4-4.82 0-1.15-.34-2.21-.83-3.05l1.35-1.35c.22-.22.22-.56 0-.78L19 8zM12 13c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z"/></svg>
          </div>
          
          <h2 style={{ fontSize: '2rem', fontWeight: '900', letterSpacing: '-0.02em', marginBottom: '0.75rem', color: '#ffffff' }}>
            Crafting Your Plan
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '400px', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '2rem' }}>
            Fitora AI Trainer is generating your personalized 7-day diet and workout plan. This will take about 10-15 seconds...
          </p>

          {/* Spinning loader */}
          <div 
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              border: '4px solid rgba(255, 255, 255, 0.05)',
              borderTopColor: 'var(--accent-coral)',
              animation: 'spin 1s infinite linear'
            }}
          />

          <style>{`
            @keyframes pulse {
              0% { transform: scale(1); opacity: 0.8; }
              50% { transform: scale(1.15); opacity: 1; }
              100% { transform: scale(1); opacity: 0.8; }
            }
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            @keyframes typing {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-4px); }
            }
          `}</style>
        </div>
      )}

      {/* Chat Bot Coach */}
      <ChatBot
        profileContext={{
          age,
          weight,
          height,
          preference,
          calorieTarget,
          proteinTarget,
          carbTarget,
          fatTarget
        }}
        apiKey={secureApiKey}
        provider={aiProvider}
        model={openRouterModel}
      />

      {/* Floating Toast Notification */}
      {toast && (
        <div className="toast-msg" id="toast-message">
          <span style={{ display: 'inline-flex', alignItems: 'center' }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" style={{ marginRight: '6px' }}><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>
          </span>
          {toast}
        </div>
      )}
    </div>
  );
}
