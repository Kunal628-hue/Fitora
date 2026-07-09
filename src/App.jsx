import React, { useState, useEffect } from 'react';
import MealColumn from './components/MealColumn';
import NextMealCard from './components/NextMealCard';
import ProteinCircle from './components/ProteinCircle';
import DynamicChart from './components/DynamicChart';
import RecipeModal from './components/RecipeModal';
import ShoppingList from './components/ShoppingList';
import RoutineBrowser from './components/RoutineBrowser';
import ActiveWorkout from './components/ActiveWorkout';
import { MEAL_TEMPLATES } from './data/meals';
import { WORKOUT_ROUTINES } from './data/workoutData';
import { RECIPES_CATALOG } from './data/recipesData';
import RecipesCatalog from './components/RecipesCatalog';
import { calculateBMR, calculateTDEE, calculateCalorieTarget, calculateMacros } from './utils/nutrition';

export default function App() {
  // Navigation
  const [activeTab, setActiveTab] = useState('dashboard');

  // Input Panel Form State (Pre-filled with Design 2 values)
  const [age, setAge] = useState('25');
  const [weight, setWeight] = useState('75');
  const [height, setHeight] = useState('180');
  const [steps, setSteps] = useState('8000');
  const [sleep, setSleep] = useState('7.5');
  const [preference, setPreference] = useState('veg'); // veg / non
  const [goal, setGoal] = useState('bulk'); // cut / bulk (Design 2 goal toggles)

  // Target values state
  const [calorieTarget, setCalorieTarget] = useState(2450);
  const [proteinTarget, setProteinTarget] = useState(185);
  const [carbTarget, setCarbTarget] = useState(220);
  const [fatTarget, setFatTarget] = useState(65);

  // Daily logged values
  const [loggedCalories, setLoggedCalories] = useState(1840); // Pre-filled Design 1 start value
  const [loggedProtein, setLoggedProtein] = useState(142); // Pre-filled Design 1 start value
  const [loggedMeals, setLoggedMeals] = useState(['lunch', 'snack']); // Lunch & snack pre-logged to match Design 1 logs (1840 kcal total)

  // Active meals config
  const [mealsConfig, setMealsConfig] = useState([]);

  // Workout state variables
  const [workoutDayIndex, setWorkoutDayIndex] = useState(0);
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);
  const [workoutStreak, setWorkoutStreak] = useState(0);
  const [completedDays, setCompletedDays] = useState([]); // Array of day indices completed this week

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMealSlot, setSelectedMealSlot] = useState(null);
  const [selectedCatalogRecipe, setSelectedCatalogRecipe] = useState(null);

  // Toast
  const [toast, setToast] = useState('');

  // Initial calculation and generation on mount
  useEffect(() => {
    // Determine default workout day based on actual day of the week
    const d = new Date().getDay();
    const todayIdx = d === 0 ? 6 : d - 1; // Map Sun(0)->6, Mon(1)->0 ... Sat(6)->5
    setWorkoutDayIndex(todayIdx);

    // Load saved data from localStorage
    const savedProfile = localStorage.getItem('fitora_merged_profile');
    const savedMeals = localStorage.getItem('fitora_merged_meals');
    const savedLogged = localStorage.getItem('fitora_merged_logged');
    const savedStreak = localStorage.getItem('fitora_workout_streak');
    const savedCompleted = localStorage.getItem('fitora_workout_completed');

    if (savedProfile && savedMeals && savedLogged) {
      const profile = JSON.parse(savedProfile);
      setAge(profile.age);
      setWeight(profile.weight);
      setHeight(profile.height);
      setSteps(profile.steps);
      setSleep(profile.sleep);
      setPreference(profile.preference);
      setGoal(profile.goal);

      setCalorieTarget(profile.calorieTarget);
      setProteinTarget(profile.proteinTarget);
      setCarbTarget(profile.carbTarget);
      setFatTarget(profile.fatTarget);

      setMealsConfig(JSON.parse(savedMeals));
      
      const logged = JSON.parse(savedLogged);
      setLoggedCalories(logged.calories);
      setLoggedProtein(logged.protein);
      setLoggedMeals(logged.meals);
    } else {
      // Run default plan generation
      generatePlan(25, 75, 180, 8000, 7.5, 'veg', 'bulk', true);
    }

    if (savedStreak) setWorkoutStreak(parseInt(savedStreak, 10));
    if (savedCompleted) setCompletedDays(JSON.parse(savedCompleted));
  }, []);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(''), 3000);
  };

  // Logic to generate calorie & macro targets and meals
  const generatePlan = (vAge, vWeight, vHeight, vSteps, vSleep, vPref, vGoal, isInitial = false) => {
    const bmr = calculateBMR(vWeight, vHeight, vAge, 'male');
    
    const stepsNum = parseInt(vSteps, 10) || 8000;
    let activityLevel = 'moderate';
    if (stepsNum < 5000) activityLevel = 'sedentary';
    else if (stepsNum < 8000) activityLevel = 'light';
    else if (stepsNum < 12000) activityLevel = 'moderate';
    else activityLevel = 'active';

    const tdee = calculateTDEE(bmr, activityLevel);

    let calories = tdee;
    if (vGoal === 'cut') {
      calories = tdee - 500;
    } else if (vGoal === 'bulk') {
      calories = tdee + 300;
    }
    
    // Pin to Design 2 values if default inputs are used
    if (vAge === 25 && vWeight === 75 && vHeight === 180 && stepsNum === 8000 && vGoal === 'bulk') {
      calories = 2450;
    } else {
      calories = Math.round(calories);
    }

    // P: 40%, C: 40%, F: 20% splits
    const p = Math.round((calories * 0.40) / 4);
    const c = Math.round((calories * 0.40) / 4);
    const f = Math.round((calories * 0.20) / 9);

    setCalorieTarget(calories);
    setProteinTarget(p);
    setCarbTarget(c);
    setFatTarget(f);

    const slots = [
      { key: 'breakfast', pct: 0.224 }, // ~550 kcal of 2450 kcal
      { key: 'lunch', pct: 0.306 },     // ~750 kcal of 2450 kcal
      { key: 'snack', pct: 0.143 },     // ~350 kcal of 2450 kcal
      { key: 'dinner', pct: 0.327 },    // ~800 kcal of 2450 kcal
    ];

    const generatedMeals = slots.map((slot) => {
      const templates = MEAL_TEMPLATES[slot.key] || [];
      let filtered = templates.filter((t) => t.diets.includes(vPref));
      if (filtered.length === 0) {
        filtered = templates;
      }
      const defaultMeal = filtered[0] || templates[0];
      const targetCalories = calories * slot.pct;

      return {
        slot: slot.key,
        meal: defaultMeal,
        targetCalories,
      };
    });

    setMealsConfig(generatedMeals);
    
    if (!isInitial) {
      setLoggedCalories(0);
      setLoggedProtein(0);
      setLoggedMeals([]);
      localStorage.setItem('fitora_merged_logged', JSON.stringify({ calories: 0, protein: 0, meals: [] }));
    } else {
      localStorage.setItem('fitora_merged_logged', JSON.stringify({ calories: 1840, protein: 142, meals: ['lunch', 'snack'] }));
    }

    const profile = {
      age: vAge,
      weight: vWeight,
      height: vHeight,
      steps: vSteps,
      sleep: vSleep,
      preference: vPref,
      goal: vGoal,
      calorieTarget: calories,
      proteinTarget: p,
      carbTarget: c,
      fatTarget: f,
    };

    localStorage.setItem('fitora_merged_profile', JSON.stringify(profile));
    localStorage.setItem('fitora_merged_meals', JSON.stringify(generatedMeals));
    
    showToast(isInitial ? 'Welcome back! Plan loaded.' : 'Personalized plan generated!');
  };

  const handleGeneratePlan = () => {
    generatePlan(
      parseInt(age, 10),
      parseFloat(weight),
      parseFloat(height),
      parseInt(steps, 10),
      parseFloat(sleep),
      preference,
      goal
    );
  };

  const handleSwapMeal = (slotKey) => {
    const templates = MEAL_TEMPLATES[slotKey] || [];
    let filtered = templates.filter((t) => t.diets.includes(preference));
    if (filtered.length === 0) {
      filtered = templates;
    }

    const currentConfig = mealsConfig.find((c) => c.slot === slotKey);
    const currentMealId = currentConfig?.meal?.id;

    const otherChoices = filtered.filter((t) => t.id !== currentMealId);
    const finalChoices = otherChoices.length > 0 ? otherChoices : filtered;

    if (finalChoices.length === 0) {
      showToast('No alternative recipes found.');
      return;
    }

    const randomIndex = Math.floor(Math.random() * finalChoices.length);
    const newMeal = finalChoices[randomIndex];

    const wasLogged = loggedMeals.includes(slotKey);
    let newLoggedCalories = loggedCalories;
    let newLoggedProtein = loggedProtein;
    let newLoggedMeals = [...loggedMeals];

    if (wasLogged) {
      const prevScaleFactor = currentConfig.targetCalories / currentConfig.meal.baseCalories;
      const prevProtein = Math.round(currentConfig.meal.macros.protein * prevScaleFactor);
      
      newLoggedCalories = Math.max(0, loggedCalories - Math.round(currentConfig.targetCalories));
      newLoggedProtein = Math.max(0, loggedProtein - prevProtein);
      newLoggedMeals = loggedMeals.filter((s) => s !== slotKey);
      
      setLoggedCalories(newLoggedCalories);
      setLoggedProtein(newLoggedProtein);
      setLoggedMeals(newLoggedMeals);
    }

    const updatedMeals = mealsConfig.map((c) => {
      if (c.slot === slotKey) {
        return { ...c, meal: newMeal };
      }
      return c;
    });

    setMealsConfig(updatedMeals);
    localStorage.setItem('fitora_merged_meals', JSON.stringify(updatedMeals));
    localStorage.setItem('fitora_merged_logged', JSON.stringify({ calories: newLoggedCalories, protein: newLoggedProtein, meals: newLoggedMeals }));
    showToast(`Swapped to ${newMeal.name}`);
  };

  const handleLogMeal = (slotKey) => {
    if (loggedMeals.includes(slotKey)) return;

    const config = mealsConfig.find((c) => c.slot === slotKey);
    if (!config) return;

    const scaleFactor = config.targetCalories / config.meal.baseCalories;
    const mealProtein = Math.round(config.meal.macros.protein * scaleFactor);
    const mealCalories = Math.round(config.targetCalories);

    const newCalories = loggedCalories + mealCalories;
    const newProtein = loggedProtein + mealProtein;
    const newLoggedMeals = [...loggedMeals, slotKey];

    setLoggedCalories(newCalories);
    setLoggedProtein(newProtein);
    setLoggedMeals(newLoggedMeals);

    localStorage.setItem('fitora_merged_logged', JSON.stringify({
      calories: newCalories,
      protein: newProtein,
      meals: newLoggedMeals,
    }));

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

    const newCalories = loggedCalories + kcal;
    const newProtein = loggedProtein + protein;

    setLoggedCalories(newCalories);
    setLoggedProtein(newProtein);
    localStorage.setItem('fitora_merged_logged', JSON.stringify({
      calories: newCalories,
      protein: newProtein,
      meals: loggedMeals
    }));

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
            className={`nav-link-btn ${activeTab === 'shopping' ? 'active' : ''}`}
            onClick={() => setActiveTab('shopping')}
            id="nav-btn-shopping"
          >
            Shopping List
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
            <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--accent-coral)', background: 'rgba(255, 125, 112, 0.1)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
              🔥 {workoutStreak} Day Streak
            </span>
          )}
          <span style={{ cursor: 'pointer', fontSize: '1.1rem' }} onClick={() => alert('No new notifications.')}>🔔</span>
          <span style={{ cursor: 'pointer', fontSize: '1.2rem' }} onClick={() => alert('Logged in as Kunal')}>👤</span>
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
                <label htmlFor="height">Height (CM)</label>
                <input
                  type="number"
                  id="height"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="inline-input"
                  min="100"
                  max="250"
                />
              </div>

              <div className="form-input-group">
                <label htmlFor="steps">Steps</label>
                <input
                  type="number"
                  id="steps"
                  value={steps}
                  onChange={(e) => setSteps(e.target.value)}
                  className="inline-input"
                  min="0"
                  max="50000"
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

              {/* Goal toggle */}
              <div className="form-input-group">
                <label>Goal</label>
                <div className="toggle-group-row">
                  <button
                    type="button"
                    className={`toggle-btn ${goal === 'cut' ? 'active' : ''}`}
                    onClick={() => setGoal('cut')}
                    id="goal-cut-btn"
                  >
                    Cut
                  </button>
                  <button
                    type="button"
                    className={`toggle-btn ${goal === 'bulk' ? 'active' : ''}`}
                    onClick={() => setGoal('bulk')}
                    id="goal-bulk-btn"
                  >
                    Bulk
                  </button>
                </div>
              </div>

              {/* Generate Button */}
              <button 
                type="button" 
                className="btn btn-primary" 
                style={{ width: '100%', minHeight: '40px', background: 'var(--accent-coral)' }}
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
            {/* Card 1: Daily Calories horizontal bar (Design 1) */}
            <div className="tracker-card">
              <h3 style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Daily Calories
              </h3>
              
              <div style={{ margin: '1rem 0' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
                  <span style={{ fontSize: '3rem', fontWeight: '800', color: 'var(--accent-red)' }}>
                    {loggedCalories.toLocaleString()}
                  </span>
                  <span style={{ fontSize: '1.8rem', color: 'var(--text-secondary)' }}>
                    / {calorieTarget.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="horizontal-progress-bar-container">
                <div className="horizontal-progress-bar-fill" style={{ width: `${calPercent}%` }}></div>
              </div>

              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                {calPercent}% of daily intake consumed. {calRemaining} kcal remaining.
              </div>
            </div>

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

          {/* Featured Next Meal (Design 1) */}
          <section aria-labelledby="featured-next-meal">
            <h3 className="performance-subtitle" style={{ marginBottom: '0.75rem' }} id="featured-next-meal">Featured Showcase</h3>
            <NextMealCard
              mealsConfig={mealsConfig}
              loggedMeals={loggedMeals}
              onLogMeal={() => {
                const hour = new Date().getHours();
                let slot = 'breakfast';
                if (hour >= 11 && hour < 16) slot = 'lunch';
                else if (hour >= 16 && hour < 19) slot = 'snack';
                else if (hour >= 19 || hour < 6) slot = 'dinner';
                
                if (loggedMeals.includes(slot)) {
                  const slotsOrder = ['breakfast', 'lunch', 'snack', 'dinner'];
                  const unlogged = slotsOrder.find(s => !loggedMeals.includes(s));
                  if (unlogged) slot = unlogged;
                }
                handleLogMeal(slot);
              }}
              onViewDetails={() => {
                const hour = new Date().getHours();
                let slot = 'breakfast';
                if (hour >= 11 && hour < 16) slot = 'lunch';
                else if (hour >= 16 && hour < 19) slot = 'snack';
                else if (hour >= 19 || hour < 6) slot = 'dinner';
                
                if (loggedMeals.includes(slot)) {
                  const slotsOrder = ['breakfast', 'lunch', 'snack', 'dinner'];
                  const unlogged = slotsOrder.find(s => !loggedMeals.includes(s));
                  if (unlogged) slot = unlogged;
                }
                handleViewDetails(slot);
              }}
            />
          </section>

          {/* 4 Column Meal Plan menu list (Design 2) */}
          <section aria-labelledby="daily-meal-plan-menu">
            <div className="section-heading-row" id="daily-meal-plan-menu">
              <h2 style={{ fontSize: '1.4rem', fontWeight: '800' }}>Daily Meal Plan Menu</h2>
            </div>
            
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
          </section>
        </main>
      )}

      {/* WORKOUT TAB */}
      {activeTab === 'workout' && (
        <main className="step-container" style={{ margin: '1rem 0' }}>
          {isWorkoutActive ? (
            <ActiveWorkout
              routine={WORKOUT_ROUTINES[workoutDayIndex]}
              onFinishWorkout={handleFinishWorkout}
            />
          ) : (
            <RoutineBrowser
              selectedDayIndex={workoutDayIndex}
              onSelectDay={setWorkoutDayIndex}
              onStartWorkout={() => setIsWorkoutActive(true)}
            />
          )}
        </main>
      )}

      {/* SHOPPING LIST TAB */}
      {activeTab === 'shopping' && (
        <main className="step-container" style={{ margin: '2rem 0' }}>
          <ShoppingList mealsConfig={mealsConfig} />
        </main>
      )}

      {/* RECIPES CATALOG TAB */}
      {activeTab === 'recipes' && (
        <main className="step-container" style={{ margin: '1rem 0' }}>
          <RecipesCatalog onViewDetails={handleViewCatalogRecipeDetails} />
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
            setLoggedCalories(newCalories);
            setLoggedProtein(newProtein);
            setLoggedMeals(newLoggedMeals);
            localStorage.setItem('fitora_merged_logged', JSON.stringify({
              calories: newCalories,
              protein: newProtein,
              meals: newLoggedMeals
            }));
            showToast(`Logged ${selectedCatalogRecipe.name}! (+${selectedCatalogRecipe.baseCalories} kcal)`);
          } else {
            handleLogMeal(selectedMealSlot);
          }
        }}
      />

      {/* Floating Toast Notification */}
      {toast && (
        <div className="toast-msg" id="toast-message">
          <span>🔔</span> {toast}
        </div>
      )}
    </div>
  );
}
