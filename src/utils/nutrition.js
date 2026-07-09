/**
 * Nutrition Utilities for Fitora
 * Calculates BMR, TDEE, Calorie Targets, and Macronutrient splits.
 */

/**
 * Calculates Basal Metabolic Rate (BMR) using Mifflin-St Jeor Equation.
 * @param {number} weight - Weight in kg
 * @param {number} height - Height in cm
 * @param {number} age - Age in years
 * @param {string} gender - 'male' or 'female'
 * @returns {number} BMR in kcal
 */
export function calculateBMR(weight, height, age, gender) {
  const w = parseFloat(weight);
  const h = parseFloat(height);
  const a = parseInt(age, 10);
  
  if (isNaN(w) || isNaN(h) || isNaN(a)) return 0;

  if (gender === 'male') {
    return Math.round(10 * w + 6.25 * h - 5 * a + 5);
  } else {
    return Math.round(10 * w + 6.25 * h - 5 * a - 161);
  }
}

/**
 * Calculates Total Daily Energy Expenditure (TDEE).
 * @param {number} bmr - BMR in kcal
 * @param {string} activityLevel - 'sedentary' | 'light' | 'moderate' | 'active' | 'extreme'
 * @returns {number} TDEE in kcal
 */
export function calculateTDEE(bmr, activityLevel) {
  const multipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    extreme: 1.9,
  };

  const multiplier = multipliers[activityLevel] || 1.2;
  return Math.round(bmr * multiplier);
}

/**
 * Calculates Calorie Target based on TDEE and health goal.
 * Enforces safe minimum calories to prevent starvation states.
 * @param {number} tdee - TDEE in kcal
 * @param {string} goal - 'lose' | 'maintain' | 'gain'
 * @param {string} gender - 'male' or 'female'
 * @returns {number} Calorie target in kcal
 */
export function calculateCalorieTarget(tdee, goal, gender) {
  let target = tdee;

  if (goal === 'lose') {
    target = tdee - 500; // Safe 500 kcal deficit (approx 0.5kg loss per week)
    
    // Enforce safe minimums
    const minCalories = gender === 'male' ? 1500 : 1200;
    if (target < minCalories) {
      target = minCalories;
    }
  } else if (goal === 'gain') {
    target = tdee + 300; // Lean surplus for muscle growth
  }

  return Math.round(target);
}

/**
 * Calculates Macro Targets (g) based on daily calorie target and diet preference.
 * @param {number} calories - Daily calorie target
 * @param {string} dietPreference - 'balanced' | 'keto' | 'low_carb' | 'high_carb' | 'vegan' | 'vegetarian' | 'paleo'
 * @returns {{protein: number, fat: number, carbs: number, proteinPct: number, fatPct: number, carbPct: number}}
 */
export function calculateMacros(calories, dietPreference) {
  let proteinPct = 30;
  let fatPct = 30;
  let carbPct = 40;

  switch (dietPreference) {
    case 'keto':
      proteinPct = 20;
      fatPct = 75;
      carbPct = 5;
      break;
    case 'low_carb':
      proteinPct = 35;
      fatPct = 35;
      carbPct = 30;
      break;
    case 'high_carb':
    case 'vegan':
      proteinPct = 20;
      fatPct = 20;
      carbPct = 60;
      break;
    case 'paleo':
      proteinPct = 35;
      fatPct = 40;
      carbPct = 25;
      break;
    case 'balanced':
    case 'vegetarian':
    default:
      proteinPct = 30;
      fatPct = 30;
      carbPct = 40;
      break;
  }

  // Gram calculations
  // Protein: 4 kcal/g
  // Carbs: 4 kcal/g
  // Fat: 9 kcal/g
  const proteinGrams = Math.round((calories * (proteinPct / 100)) / 4);
  const fatGrams = Math.round((calories * (fatPct / 100)) / 9);
  const carbGrams = Math.round((calories * (carbPct / 100)) / 4);

  return {
    protein: proteinGrams,
    fat: fatGrams,
    carbs: carbGrams,
    proteinPct,
    fatPct,
    carbPct,
  };
}
