import React, { useState, useEffect, useCallback } from 'react';
import MealColumn from './components/MealColumn';
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
import AuthPage from './components/AuthPage';
import { supabase } from './utils/supabase';
import { sendWelcomeEmail } from './utils/emailService';
import { translations, contentTranslations } from './utils/translations';

export default function App() {
  // Auth state
  const [currentUser, setCurrentUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  // Custom Beautified Dialogs State
  const [customDialog, setCustomDialog] = useState({
    isOpen: false,
    type: 'alert', // 'alert' | 'confirm' | 'prompt'
    title: '',
    message: '',
    defaultValue: '',
    resolve: null,
  });
  const [dialogInputVal, setDialogInputVal] = useState('');

  // Fitness Notes State
  const [dailyNotes, setDailyNotes] = useState([]);
  const [noteInput, setNoteInput] = useState('');

  const showCustomAlert = (message, title = 'Alert') => {
    return new Promise((resolve) => {
      setCustomDialog({
        isOpen: true,
        type: 'alert',
        title,
        message,
        defaultValue: '',
        resolve,
      });
    });
  };

  const showCustomConfirm = (message, title = 'Confirm Action') => {
    return new Promise((resolve) => {
      setCustomDialog({
        isOpen: true,
        type: 'confirm',
        title,
        message,
        defaultValue: '',
        resolve,
      });
    });
  };

  const showCustomPrompt = (message, defaultValue = '', title = 'Input Required') => {
    setDialogInputVal(defaultValue);
    return new Promise((resolve) => {
      setCustomDialog({
        isOpen: true,
        type: 'prompt',
        title,
        message,
        defaultValue,
        resolve,
      });
    });
  };

  const handleDialogCancel = () => {
    const { resolve } = customDialog;
    setCustomDialog(prev => ({ ...prev, isOpen: false }));
    if (resolve) {
      if (customDialog.type === 'prompt') {
        resolve(null);
      } else {
        resolve(false);
      }
    }
  };

  const handleDialogConfirm = () => {
    const { resolve, type } = customDialog;
    setCustomDialog(prev => ({ ...prev, isOpen: false }));
    if (resolve) {
      if (type === 'prompt') {
        resolve(dialogInputVal);
      } else {
        resolve(true);
      }
    }
  };

  // Build user-scoped localStorage key so each user has isolated data
  const userKey = useCallback((key) => {
    const uid = currentUser?.id || currentUser?.uid || currentUser?.email || 'guest';
    return `fitora_${uid}_${key}`;
  }, [currentUser]);

  // Check for persisted session on mount
  useEffect(() => {
    const stored = localStorage.getItem('fitora_user');
    if (stored) {
      try { setCurrentUser(JSON.parse(stored)); } catch (_) {}
    }
    setAuthChecked(true);
  }, []);

  // Close user settings dropdown when clicking outside
  useEffect(() => {
    if (!showUserDropdown) return;
    const closeDropdown = () => setShowUserDropdown(false);
    document.addEventListener('click', closeDropdown);
    return () => document.removeEventListener('click', closeDropdown);
  }, [showUserDropdown]);

  const handleAuthSuccess = (user) => {
    setCurrentUser(user);
    localStorage.setItem('fitora_user', JSON.stringify(user));
    
    // Check if welcome email has been sent for this email
    const email = user?.email;
    if (email) {
      const welcomeKey = `fitora_welcome_sent_${email.trim().toLowerCase()}`;
      const sent = localStorage.getItem(welcomeKey);
      if (!sent) {
        sendWelcomeEmail(email, user.user_metadata?.full_name || user.name || email.split('@')[0]);
        localStorage.setItem(welcomeKey, 'true');
      }
    }
  };

  const handleSignOut = async () => {
    if (supabase) await supabase.auth.signOut();
    setCurrentUser(null);
    localStorage.removeItem('fitora_user');
    // Reset all in-memory state so next user starts fresh
    setAge('');
    setWeight('');
    setHeight('');
    setSleep('');
    setExtraPreferences('');
    setPreference('veg');
    setGoal('bulk');
    setCalorieTarget(0);
    setProteinTarget(0);
    setCarbTarget(0);
    setFatTarget(0);
    setWeeklyDietPlan([]);
    setWeeklyWorkoutPlan([]);
    setLoggedDays({ 0:{calories:0,protein:0,meals:[]}, 1:{calories:0,protein:0,meals:[]}, 2:{calories:0,protein:0,meals:[]}, 3:{calories:0,protein:0,meals:[]}, 4:{calories:0,protein:0,meals:[]}, 5:{calories:0,protein:0,meals:[]}, 6:{calories:0,protein:0,meals:[]} });
    setWorkoutStreak(0);
    setCompletedDays([]);
    setDailyNotes([]);
    setIsLoaded(false);
  };

  const handleDeleteAccount = async () => {
    const confirmed = await showCustomConfirm("Are you sure you want to permanently delete your account? This action cannot be undone and will delete all your workout streaks and custom plans.", "Delete Account");
    if (!confirmed) return;

    const email = currentUser?.email;
    const uid = currentUser?.id || currentUser?.uid || currentUser?.email || 'guest';

    // Delete from mock users database
    if (!supabase) {
      const usersJson = localStorage.getItem('fitora_mock_users');
      if (usersJson) {
        try {
          const users = JSON.parse(usersJson);
          const updatedUsers = users.filter(u => u.email !== email?.trim().toLowerCase());
          localStorage.setItem('fitora_mock_users', JSON.stringify(updatedUsers));
        } catch {}
      }
    }

    // Clean up all local storage data associated with this user
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(`fitora_${uid}_`)) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.push(`fitora_welcome_sent_${email?.trim().toLowerCase()}`);
    keysToRemove.forEach(k => localStorage.removeItem(k));

    // Sign out and reset in-memory state
    await handleSignOut();
    showToast("Account deleted successfully.");
  };

  // Navigation
  const [activeTab, setActiveTab] = useState('dashboard');

  // Language state
  const [language, setLanguage] = useState(() => localStorage.getItem('fitora_lang') || 'en');

  useEffect(() => {
    localStorage.setItem('fitora_lang', language);
  }, [language]);

  const t = useCallback((key) => {
    return translations[language]?.[key] || translations['en']?.[key] || key;
  }, [language]);

  const translateContent = useCallback((text) => {
    if (!text) return '';
    const key = text.toLowerCase().trim();
    return contentTranslations[language]?.[key] || text;
  }, [language]);

  // Input Panel Form State — empty by default; populated from user-scoped localStorage on mount
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [steps, setSteps] = useState('');
  const [sleep, setSleep] = useState('');
  const [preference, setPreference] = useState('veg'); // veg / non
  const [goal, setGoal] = useState('bulk'); // cut / bulk
  const [extraPreferences, setExtraPreferences] = useState('');

  // Target values state — zero until user fills in their profile
  const [calorieTarget, setCalorieTarget] = useState(0);
  const [proteinTarget, setProteinTarget] = useState(0);
  const [carbTarget, setCarbTarget] = useState(0);
  const [fatTarget, setFatTarget] = useState(0);

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

  // Load/reset data whenever the logged-in user changes
  // Load/reset data whenever the logged-in user changes
  useEffect(() => {
    if (!authChecked) return;
    setIsLoaded(false);

    const d = new Date().getDay();
    const todayIdx = d === 0 ? 6 : d - 1;
    setSelectedDayIndex(todayIdx);

    const loadData = async () => {
      // User-scoped keys
      const uid = currentUser?.id || currentUser?.uid || currentUser?.email || 'guest';
      const prefix = `fitora_${uid}_`;

      let cloudData = null;
      if (supabase && currentUser && uid !== 'guest') {
        try {
          const { data, error } = await supabase
            .from('user_data')
            .select('*')
            .single();
          if (!error && data) {
            cloudData = data;
          }
        } catch (err) {
          console.error("Error loading user data from Supabase:", err);
        }
      }

      const savedProfile    = localStorage.getItem(`${prefix}merged_profile`);
      const savedDietPlan   = localStorage.getItem(`${prefix}diet_plan`);
      const savedWorkoutPlan= localStorage.getItem(`${prefix}workout_plan`);
      const savedLoggedDays = localStorage.getItem(`${prefix}logged_days`);
      const savedStreak     = localStorage.getItem(`${prefix}workout_streak`);
      const savedCompleted  = localStorage.getItem(`${prefix}workout_completed`);
      const savedProvider   = localStorage.getItem(`${prefix}ai_provider`);
      const savedModel      = localStorage.getItem(`${prefix}openrouter_model`);
      const savedNotes      = localStorage.getItem(`${prefix}daily_notes`);

      if (savedProvider) setAiProvider(savedProvider);
      if (savedModel) {
        if (savedModel === 'nvidia/llama-3.1-nemotron-70b-instruct') {
          localStorage.setItem(`${prefix}openrouter_model`, 'nvidia/llama-3.3-nemotron-super-49b-v1.5');
          setOpenRouterModel('nvidia/llama-3.3-nemotron-super-49b-v1.5');
        } else {
          setOpenRouterModel(savedModel);
        }
      }

      let loadedProfile = null;
      let loadedDiet = [];
      let loadedWorkout = [];
      let loadedLoggedDays = {
        0: { calories: 0, protein: 0, meals: [] },
        1: { calories: 0, protein: 0, meals: [] },
        2: { calories: 0, protein: 0, meals: [] },
        3: { calories: 0, protein: 0, meals: [] },
        4: { calories: 0, protein: 0, meals: [] },
        5: { calories: 0, protein: 0, meals: [] },
        6: { calories: 0, protein: 0, meals: [] },
      };
      let loadedStreak = 0;
      let loadedCompleted = [];
      let loadedNotes = [];
      let hasLocalData = false;

      if (savedProfile && savedProfile !== 'undefined') {
        try {
          loadedProfile = JSON.parse(savedProfile);
          hasLocalData = true;
        } catch {}
      }
      if (savedDietPlan && savedDietPlan !== 'undefined') {
        try { loadedDiet = JSON.parse(savedDietPlan); } catch {}
      }
      if (savedWorkoutPlan && savedWorkoutPlan !== 'undefined') {
        try { loadedWorkout = JSON.parse(savedWorkoutPlan); } catch {}
      }
      if (savedLoggedDays && savedLoggedDays !== 'undefined') {
        try { loadedLoggedDays = JSON.parse(savedLoggedDays); } catch {}
      }
      if (savedStreak) {
        loadedStreak = parseInt(savedStreak, 10) || 0;
      }
      if (savedCompleted && savedCompleted !== 'undefined') {
        try {
          const parsed = JSON.parse(savedCompleted);
          loadedCompleted = Array.isArray(parsed) ? parsed : [];
        } catch {}
      }
      if (savedNotes && savedNotes !== 'undefined') {
        try {
          const parsed = JSON.parse(savedNotes);
          loadedNotes = Array.isArray(parsed) ? parsed : [];
        } catch {}
      }

      // Sync cloud data back to local variables and local storage cache if available
      if (cloudData) {
        const profile = cloudData.profile || {};
        loadedProfile = profile;
        loadedDiet = Array.isArray(cloudData.diet_plan) ? cloudData.diet_plan : [];
        loadedWorkout = Array.isArray(cloudData.workout_plan) ? cloudData.workout_plan : [];
        loadedLoggedDays = cloudData.logged_days || loadedLoggedDays;
        loadedStreak = cloudData.workout_streak || 0;
        loadedCompleted = Array.isArray(cloudData.completed_days) ? cloudData.completed_days : [];
        loadedNotes = Array.isArray(cloudData.daily_notes) ? cloudData.daily_notes : [];

        localStorage.setItem(`${prefix}merged_profile`, JSON.stringify(profile));
        localStorage.setItem(`${prefix}diet_plan`, JSON.stringify(loadedDiet));
        localStorage.setItem(`${prefix}workout_plan`, JSON.stringify(loadedWorkout));
        localStorage.setItem(`${prefix}logged_days`, JSON.stringify(loadedLoggedDays));
        localStorage.setItem(`${prefix}workout_streak`, loadedStreak.toString());
        localStorage.setItem(`${prefix}workout_completed`, JSON.stringify(loadedCompleted));
        localStorage.setItem(`${prefix}daily_notes`, JSON.stringify(loadedNotes));
      } else if (supabase && currentUser && uid !== 'guest' && hasLocalData) {
        // No cloud data, but we have local data and a signed-in user -> Sync local data to cloud immediately!
        try {
          await supabase
            .from('user_data')
            .upsert({
              user_id: uid,
              updated_at: new Date().toISOString(),
              profile: loadedProfile,
              diet_plan: loadedDiet,
              workout_plan: loadedWorkout,
              logged_days: loadedLoggedDays,
              workout_streak: loadedStreak,
              completed_days: loadedCompleted,
              daily_notes: loadedNotes
            });
        } catch (err) {
          console.error("Failed to initialize cloud database with local data:", err);
        }
      }

      if (loadedProfile) {
        let loadedHeight = loadedProfile.height;
        if (loadedHeight && parseFloat(loadedHeight) > 15) {
          loadedHeight = (parseFloat(loadedHeight) / 30.48).toFixed(1);
          loadedProfile.height = loadedHeight;
        }

        setAge(loadedProfile.age || '');
        setWeight(loadedProfile.weight || '');
        setHeight(loadedHeight || '');
        setSteps(loadedProfile.steps || '');
        setSleep(loadedProfile.sleep || '');
        setPreference(loadedProfile.preference || 'veg');
        setExtraPreferences(loadedProfile.extraPreferences || '');
        setGoal(loadedProfile.goal || 'bulk');

        setCalorieTarget(loadedProfile.calorieTarget || 0);
        setProteinTarget(loadedProfile.proteinTarget || 0);
        setCarbTarget(loadedProfile.carbTarget || 0);
        setFatTarget(loadedProfile.fatTarget || 0);
      } else {
        setAge('');
        setWeight('');
        setHeight('');
        setSteps('');
        setSleep('');
        setPreference('veg');
        setExtraPreferences('');
        setGoal('bulk');
        setCalorieTarget(0);
        setProteinTarget(0);
        setCarbTarget(0);
        setFatTarget(0);
      }

      setWeeklyDietPlan(loadedDiet);
      setWeeklyWorkoutPlan(loadedWorkout);
      setLoggedDays(loadedLoggedDays);
      setWorkoutStreak(loadedStreak);
      setCompletedDays(loadedCompleted);
      setDailyNotes(loadedNotes);

      setIsLoaded(true);
    };

    loadData();
  }, [authChecked, currentUser]);

  // Auto-sync state changes to Supabase (debounced to avoid spamming the database)
  useEffect(() => {
    if (!isLoaded || !supabase || !currentUser) return;
    const uid = currentUser.id || currentUser.uid || currentUser.email || 'guest';
    if (uid === 'guest') return;

    const timer = setTimeout(async () => {
      const profile = {
        age,
        weight,
        height,
        steps,
        sleep,
        preference,
        extraPreferences,
        goal,
        calorieTarget,
        proteinTarget,
        carbTarget,
        fatTarget,
      };

      try {
        await supabase
          .from('user_data')
          .upsert({
            user_id: uid,
            updated_at: new Date().toISOString(),
            profile,
            diet_plan: weeklyDietPlan,
            workout_plan: weeklyWorkoutPlan,
            logged_days: loggedDays,
            workout_streak: workoutStreak,
            completed_days: completedDays,
            daily_notes: dailyNotes
          });
      } catch (err) {
        console.error("Auto-sync to Supabase failed:", err);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [
    isLoaded, currentUser, age, weight, height, steps, sleep, preference,
    extraPreferences, goal, calorieTarget, proteinTarget, carbTarget,
    fatTarget, weeklyDietPlan, weeklyWorkoutPlan, loggedDays, workoutStreak,
    completedDays, dailyNotes
  ]);


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
    localStorage.setItem(userKey('merged_profile'), JSON.stringify(profile));

  }, [age, weight, height, steps, sleep, preference, goal, extraPreferences, isLoaded, isGenerating, userKey]);

  // Full AI Generation when clicking "Generate My Plan"
  const handleGeneratePlan = async () => {
    const parsedAge = parseInt(age, 10);
    const parsedWeight = parseFloat(weight);
    const parsedHeight = parseFloat(height);
    const parsedSteps = parseInt(steps, 10) || 8000;
    const parsedSleep = parseFloat(sleep);

    if (!age || isNaN(parsedAge) || parsedAge <= 0) {
      showToast('Please enter a valid age.');
      return;
    }
    if (!weight || isNaN(parsedWeight) || parsedWeight <= 0) {
      showToast('Please enter a valid weight.');
      return;
    }
    if (!height || isNaN(parsedHeight) || parsedHeight <= 0) {
      showToast('Please enter a valid height.');
      return;
    }
    if (isNaN(parsedSleep) || parsedSleep < 0) {
      showToast('Please enter valid sleep hours.');
      return;
    }

    setIsGenerating(true);
    showToast('Generating personalized AI plan...');

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
    localStorage.setItem(userKey('merged_profile'), JSON.stringify(profile));

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
          model: openRouterModel,
          language
        });
      } catch (err) {
        console.error(err);
        showToast('AI Plan generation failed. Using local fallback.');
      }
    }

    if (!generatedPlan) {
      generatedPlan = generateLocalFallbackPlan({
        preference,
        calorieTarget: calories,
        goal,
        age: parsedAge,
        weight: parsedWeight
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
      localStorage.setItem(userKey('diet_plan'), JSON.stringify(finalDietPlan));
      localStorage.setItem(userKey('workout_plan'), JSON.stringify(finalWorkoutPlan));

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
      localStorage.setItem(userKey('logged_days'), JSON.stringify(initialLogs));

      showToast('Personalized AI plan generated!');
    } else {
      showToast('AI response was incomplete. Using local fallback.');
      const fallback = generateLocalFallbackPlan({
        preference,
        calorieTarget: calories
      });
      setWeeklyDietPlan(fallback.dietPlan);
      setWeeklyWorkoutPlan(fallback.workoutPlan);
      localStorage.setItem(userKey('diet_plan'), JSON.stringify(fallback.dietPlan));
      localStorage.setItem(userKey('workout_plan'), JSON.stringify(fallback.workoutPlan));

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
      localStorage.setItem(userKey('logged_days'), JSON.stringify(initialLogs));
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
          model: openRouterModel,
          language
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
    localStorage.setItem(userKey('diet_plan'), JSON.stringify(updatedPlan));

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
      localStorage.setItem(userKey('logged_days'), JSON.stringify(updatedLogs));
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
    localStorage.setItem(userKey('logged_days'), JSON.stringify(updatedLogs));

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

  const _handleAddCustomEntry = async () => {
    const customKcalStr = await showCustomPrompt('Enter custom calories to log (kcal):', '200', 'Log Calories');
    if (customKcalStr === null) return;
    
    const kcal = parseInt(customKcalStr, 10);
    if (isNaN(kcal) || kcal <= 0) {
      await showCustomAlert('Please enter a valid positive number.', 'Invalid Calories');
      return;
    }

    const customProteinStr = await showCustomPrompt('Enter protein amount for this entry (grams):', '15', 'Log Protein');
    if (customProteinStr === null) return;
    
    const protein = parseInt(customProteinStr, 10);
    if (isNaN(protein) || protein < 0) {
      await showCustomAlert('Please enter a valid number.', 'Invalid Protein');
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
    localStorage.setItem(userKey('logged_days'), JSON.stringify(updatedLogs));

    showToast(`Added custom entry: +${kcal} kcal, +${protein}g Protein`);
  };

  const handleAddExercise = (dayIdx, ex) => {
    const currentRoutines = weeklyWorkoutPlan && weeklyWorkoutPlan.length > 0 ? weeklyWorkoutPlan : WORKOUT_ROUTINES;
    const updatedPlan = JSON.parse(JSON.stringify(currentRoutines));
    if (!updatedPlan[dayIdx]) return;
    updatedPlan[dayIdx].exercises.push(ex);
    setWeeklyWorkoutPlan(updatedPlan);
    localStorage.setItem(userKey('workout_plan'), JSON.stringify(updatedPlan));
  };

  const handleEditExercise = (dayIdx, exIdx, updatedEx) => {
    const currentRoutines = weeklyWorkoutPlan && weeklyWorkoutPlan.length > 0 ? weeklyWorkoutPlan : WORKOUT_ROUTINES;
    const updatedPlan = JSON.parse(JSON.stringify(currentRoutines));
    if (!updatedPlan[dayIdx] || !updatedPlan[dayIdx].exercises[exIdx]) return;
    updatedPlan[dayIdx].exercises[exIdx] = updatedEx;
    setWeeklyWorkoutPlan(updatedPlan);
    localStorage.setItem(userKey('workout_plan'), JSON.stringify(updatedPlan));
  };

  const handleDeleteExercise = (dayIdx, exIdx) => {
    const currentRoutines = weeklyWorkoutPlan && weeklyWorkoutPlan.length > 0 ? weeklyWorkoutPlan : WORKOUT_ROUTINES;
    const updatedPlan = JSON.parse(JSON.stringify(currentRoutines));
    if (!updatedPlan[dayIdx]) return;
    updatedPlan[dayIdx].exercises = updatedPlan[dayIdx].exercises.filter((_, idx) => idx !== exIdx);
    setWeeklyWorkoutPlan(updatedPlan);
    localStorage.setItem(userKey('workout_plan'), JSON.stringify(updatedPlan));
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
    let newStreak = workoutStreak;
    if (!completedDays.includes(workoutDayIndex)) {
      updatedCompleted.push(workoutDayIndex);
      newStreak = workoutStreak + 1;
    }

    setWorkoutStreak(newStreak);
    setCompletedDays(updatedCompleted);

    localStorage.setItem(userKey('workout_streak'), newStreak.toString());
    localStorage.setItem(userKey('workout_completed'), JSON.stringify(updatedCompleted));

    setIsWorkoutActive(false);
    showToast(`Workout Finished! Streak: ${newStreak} days! 🔥`);
  };

  const selectedMealConfig = mealsConfig.find((c) => c.slot === selectedMealSlot);

  // Computed values

  // Show nothing until we've checked localStorage for a stored session
  if (!authChecked) return null;

  // Show auth page if not logged in
  if (!currentUser) {
    return <AuthPage onAuthSuccess={handleAuthSuccess} />;
  }

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
            {t('dashboard')}
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
            {t('workout')}
          </button>
          <button 
            type="button" 
            className={`nav-link-btn ${activeTab === 'recipes' ? 'active' : ''}`}
            onClick={() => setActiveTab('recipes')}
            id="nav-btn-recipes"
          >
            {t('recipes')}
          </button>
        </nav>
        <div className="header-controls" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--text-secondary)' }}>
          {workoutStreak > 0 && (
            <span className="header-streak-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.85rem', fontWeight: '700', color: 'var(--accent-coral)', background: 'rgba(200, 255, 0, 0.10)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="12" height="12" fill="currentColor"><path d="M12 12.5c-1.38 0-2.5-1.12-2.5-2.5 0-1.89 1.5-3.5 3.5-5.5 2 2 3.5 3.61 3.5 5.5 0 1.38-1.12 2.5-2.5 2.5zM17.66 11.2c-.22-2.15-1.74-4.88-5.66-8.2-3.92 3.32-5.44 6.05-5.66 8.2-1 .92-1.63 2.24-1.63 3.7A5.25 5.25 0 0 0 10.3 20.3a5.25 5.25 0 0 0 7.4 0 5.25 5.25 0 0 0 1.63-3.7c0-1.46-.63-2.78-1.67-3.7z"/></svg>
              {workoutStreak} {t('streakSuffix')}
            </span>
          )}

          {/* Language Selector Dropdown */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <select
              className="header-lang-select"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1.5px solid rgba(255, 255, 255, 0.08)',
                color: 'var(--text-primary)',
                padding: '0.35rem 0.5rem',
                borderRadius: '12px',
                cursor: 'pointer',
                fontSize: '0.82rem',
                fontWeight: '700',
                outline: 'none',
                transition: 'background 0.2s, border-color 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
              }}
            >
              <option value="en" style={{ background: '#0e1118', color: '#fff' }}>EN</option>
              <option value="hi" style={{ background: '#0e1118', color: '#fff' }}>HI (हिन्दी)</option>
              <option value="te" style={{ background: '#0e1118', color: '#fff' }}>TE (తెలుగు)</option>
            </select>
          </div>

          {/* User info dropdown menu wrapper */}
          <div style={{ position: 'relative' }}>
            <button
              type="button"
              className="header-user-btn"
              onClick={(e) => {
                e.stopPropagation();
                setShowUserDropdown(!showUserDropdown);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1.5px solid rgba(255, 255, 255, 0.08)',
                padding: '0.35rem 0.75rem',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'background 0.2s, border-color 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
              }}
            >
              <div style={{
                width: 26, height: 26, borderRadius: '50%',
                background: 'linear-gradient(135deg, #ff4d4d 0%, var(--accent-red) 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.78rem', fontWeight: 700, color: '#ffffff',
                flexShrink: 0,
                boxShadow: '0 0 8px rgba(200, 255, 0, 0.25)',
              }}>
                {(currentUser?.name || currentUser?.email || currentUser?.user_metadata?.full_name || 'U')[0].toUpperCase()}
              </div>
              <span className="header-username" style={{ fontSize: '0.8rem', fontWeight: '600', color: 'rgba(255,255,255,0.95)', maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {currentUser?.name || currentUser?.user_metadata?.full_name || currentUser?.email?.split('@')[0] || 'User'}
              </span>
              <svg 
                width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="2.5"
                style={{ 
                  transform: showUserDropdown ? 'rotate(180deg)' : 'none', 
                  transition: 'transform 0.2s',
                  marginLeft: '0.1rem',
                }}
              >
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>

            {showUserDropdown && (
              <div 
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  right: 0,
                  background: 'rgba(12, 12, 16, 0.98)',
                  border: '1.5px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '12px',
                  padding: '0.4rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.25rem',
                  minWidth: 160,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.5), 0 0 15px rgba(200, 255, 0, 0.05)',
                  zIndex: 100,
                  animation: 'welcomeCardSlideUp 0.15s ease-out',
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Sign Out */}
                <button
                  type="button"
                  onClick={() => {
                    setShowUserDropdown(false);
                    handleSignOut();
                  }}
                  style={{
                    background: 'none', border: 'none',
                    borderRadius: '8px', padding: '0.45rem 0.65rem', cursor: 'pointer',
                    color: 'var(--text-secondary)', display: 'flex', alignItems: 'center',
                    fontSize: '0.78rem', gap: '0.45rem', width: '100%', textAlign: 'left',
                    transition: 'background 0.2s, color 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                    e.currentTarget.style.color = '#fff';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'none';
                    e.currentTarget.style.color = 'var(--text-secondary)';
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
                    <polyline points="16,17 21,12 16,7"/>
                    <line x1="21" y1="12" x2="9" y2="12"/>
                  </svg>
                  Sign Out
                </button>

                {/* Divider */}
                <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.06)', margin: '0.2rem 0.4rem' }} />

                {/* Delete Account */}
                <button
                  type="button"
                  onClick={() => {
                    setShowUserDropdown(false);
                    handleDeleteAccount();
                  }}
                  style={{
                    background: 'none', border: 'none',
                    borderRadius: '8px', padding: '0.45rem 0.65rem', cursor: 'pointer',
                    color: 'var(--accent-red)', display: 'flex', alignItems: 'center',
                    fontSize: '0.78rem', gap: '0.45rem', width: '100%', textAlign: 'left',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(200, 255, 0, 0.15)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'none';
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                  </svg>
                  Delete Account
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* DASHBOARD TAB */}
      {activeTab === 'dashboard' && (
        <main className="step-container">
          {/* Top Form Panel (Design 2 Form) */}
          <section className="form-panel-card" aria-label="Profile Settings Form">
            <div className="inline-form-grid">
              <div className="form-input-group">
                <label htmlFor="age">{t('age')}</label>
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
                <label htmlFor="weight">{t('weight')}</label>
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
                <label htmlFor="height">{t('height')}</label>
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
                <label htmlFor="sleep">{t('sleep')}</label>
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
                <label>{t('preference')}</label>
                <div className="toggle-group-row">
                  <button
                    type="button"
                    className={`toggle-btn ${preference === 'veg' ? 'active' : ''}`}
                    onClick={() => setPreference('veg')}
                    id="pref-veg-btn"
                  >
                    {t('veg')}
                  </button>
                  <button
                    type="button"
                    className={`toggle-btn ${preference === 'non' ? 'active' : ''}`}
                    onClick={() => setPreference('non')}
                    id="pref-non-btn"
                  >
                    {t('nonVeg')}
                  </button>
                </div>
              </div>


              {/* Extra Preferences */}
              <div className="form-input-group" style={{ gridColumn: 'span 2' }}>
                <label htmlFor="extraPreferences">{t('allergiesLabel')}</label>
                <input
                  type="text"
                  id="extraPreferences"
                  value={extraPreferences}
                  onChange={(e) => setExtraPreferences(e.target.value)}
                  placeholder={t('allergiesPlaceholder')}
                  className="inline-input"
                />
              </div>
            </div>

            {/* Centered Generate Button */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem', width: '100%' }}>
              <button 
                type="button" 
                className="btn btn-primary" 
                style={{ width: '100%', maxWidth: '360px', minHeight: '44px', background: 'var(--accent-coral)', color: '#000000', fontWeight: 700 }}
                onClick={handleGeneratePlan}
                id="generate-plan-btn"
              >
                {isGenerating ? t('generating') : t('generatePlan')}
              </button>
            </div>
          </section>

          {/* Targets Strip Row (Design 2 target bar) */}
          <section className="targets-strip-card" aria-label="Nutritional Target Values">
            <div className="target-strip-item">
              <span className="target-strip-label">{t('calorieTarget')}</span>
              <span className="target-strip-value">{calorieTarget}</span>
            </div>
            <div className="target-strip-item">
              <span className="target-strip-label">{t('protein')}</span>
              <span className="target-strip-value">{proteinTarget}<span className="target-strip-unit">g</span></span>
            </div>
            <div className="target-strip-item">
              <span className="target-strip-label">{t('carbs')}</span>
              <span className="target-strip-value">{carbTarget}<span className="target-strip-unit">g</span></span>
            </div>
            <div className="target-strip-item">
              <span className="target-strip-label">{t('fats')}</span>
              <span className="target-strip-value">{fatTarget}<span className="target-strip-unit">g</span></span>
            </div>
          </section>

          {/* Weekday Selector Row */}
          <div className="weekday-grid">
            {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((dayName, idx) => {
              const isActive = selectedDayIndex === idx;
              const dayNumber = `0${idx + 1}`;
              const isCompleted = completedDays.includes(idx);
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedDayIndex(idx)}
                  className={`weekday-btn ${isActive ? 'active' : ''}`}
                  id={`db-day-select-${idx}`}
                >
                  <span className="weekday-name">{dayName}</span>
                  <span className="weekday-num">{dayNumber}</span>
                  {isActive && <div className="weekday-indicator" />}
                  {isCompleted && (
                    <span 
                      style={{ 
                        position: 'absolute', 
                        top: '4px', 
                        right: '4px', 
                        color: 'var(--accent-coral)', 
                        fontSize: '0.65rem',
                        fontWeight: 'bold' 
                      }}
                      title="Workout Completed"
                    >
                      ✓
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* 4 Column Meal Plan menu list (Design 2) */}
          <section aria-labelledby="daily-meal-plan-menu" style={{ marginBottom: '2.5rem' }}>
            <div className="section-heading-row" id="daily-meal-plan-menu">
              <h2 style={{ fontSize: '1.4rem', fontWeight: '800' }}>{t('personalisedMealPlan')}</h2>
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
                <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--text-primary)' }}>{t('noMealPlanTitle')}</h3>
                <p style={{ maxWidth: '400px', fontSize: '0.85rem', lineHeight: '1.5', margin: '0' }}>
                  {t('noMealPlanDesc')}
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
                      t={t}
                      translateContent={translateContent}
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
          </section>

          {/* Trackers Row (Design 1 & 2 layout merge) */}
          <section className="trackers-row-grid" aria-label="Progress Trackers Dashboard">


            {/* Card 2: Fitness Note Taker */}
            <div className="tracker-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', height: '100%', minHeight: '340px' }}>
              <h3 style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.2rem' }}>
                Fitness Notes
              </h3>
              
              {/* Form to Add Note */}
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!noteInput.trim()) return;
                  const newNote = {
                    id: Date.now().toString(),
                    text: noteInput.trim(),
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' - ' + new Date().toLocaleDateString([], { month: 'short', day: 'numeric' })
                  };
                  const updatedNotes = [newNote, ...dailyNotes];
                  setDailyNotes(updatedNotes);
                  localStorage.setItem(userKey('daily_notes'), JSON.stringify(updatedNotes));
                  setNoteInput('');
                }}
                style={{ display: 'flex', gap: '0.5rem', width: '100%' }}
              >
                <input
                  type="text"
                  placeholder="Record today's training thoughts..."
                  value={noteInput}
                  onChange={(e) => setNoteInput(e.target.value)}
                  style={{
                    flex: 1,
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1.5px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '8px',
                    padding: '0.45rem 0.75rem',
                    color: '#ffffff',
                    fontSize: '0.82rem',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--accent-red)'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)'}
                />
                <button
                  type="submit"
                  style={{
                    background: 'var(--accent-red)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0 0.85rem',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#a8e600'}
                  onMouseLeave={e => e.currentTarget.style.background = 'var(--accent-red)'}
                >
                  Add
                </button>
              </form>

              {/* Scrollable list of notes */}
              <div style={{
                flex: 1,
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.6rem',
                paddingRight: '0.2rem',
                maxHeight: '240px',
              }}>
                {dailyNotes.length === 0 ? (
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    color: 'var(--text-muted)',
                    fontSize: '0.78rem',
                    textAlign: 'center',
                    padding: '2rem 1rem',
                    gap: '0.5rem',
                  }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ opacity: 0.4 }}>
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                    <span>No fitness notes logged today.<br/>Log weight, workouts, or mood!</span>
                  </div>
                ) : (
                  dailyNotes.map((note) => (
                    <div
                      key={note.id}
                      style={{
                        background: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid rgba(255, 255, 255, 0.04)',
                        borderRadius: '8px',
                        padding: '0.55rem 0.75rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.25rem',
                        position: 'relative',
                        transition: 'background 0.2s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)'}
                    >
                      {/* Timestamp */}
                      <span style={{ fontSize: '0.65rem', color: 'var(--accent-coral)', fontWeight: 700 }}>
                        {note.timestamp}
                      </span>
                      
                      {/* Note Content */}
                      <span style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.85)', lineHeight: '1.4', wordBreak: 'break-word', paddingRight: '1.2rem' }}>
                        {note.text}
                      </span>

                      {/* Delete Button */}
                      <button
                        type="button"
                        onClick={() => {
                          const updated = dailyNotes.filter(n => n.id !== note.id);
                          setDailyNotes(updated);
                          localStorage.setItem(userKey('daily_notes'), JSON.stringify(updated));
                        }}
                        style={{
                          position: 'absolute',
                          top: '0.45rem',
                          right: '0.45rem',
                          background: 'none',
                          border: 'none',
                          color: 'var(--text-muted)',
                          cursor: 'pointer',
                          padding: 2,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: '4px',
                          transition: 'color 0.2s, background 0.2s',
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.color = 'var(--accent-red)';
                          e.currentTarget.style.background = 'rgba(200, 255, 0, 0.08)';
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.color = 'var(--text-muted)';
                          e.currentTarget.style.background = 'none';
                        }}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                      </button>
                    </div>
                  ))
                )}
              </div>
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
          {weeklyWorkoutPlan.length === 0 ? (
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
                 <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5, marginBottom: '0.75rem', color: 'var(--text-secondary)' }}>
                   <path d="m6.5 6.5 11 11M3 21l3-3m15-15-3 3M17 3l4 4M3 17l4 4"/>
                 </svg>
              </span>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--text-primary)' }}>{t('noWorkoutPlanTitle')}</h3>
              <p style={{ maxWidth: '400px', fontSize: '0.85rem', lineHeight: '1.5', margin: '0' }}>
                {t('noWorkoutPlanDesc')}
              </p>
            </div>
          ) : isWorkoutActive ? (
            <ActiveWorkout
              routine={weeklyWorkoutPlan[selectedDayIndex] || WORKOUT_ROUTINES[selectedDayIndex]}
              onFinishWorkout={handleFinishWorkout}
            />
          ) : (
            <RoutineBrowser
              weeklyWorkoutPlan={weeklyWorkoutPlan}
              selectedDayIndex={selectedDayIndex}
              onSelectDay={setSelectedDayIndex}
              onAddExercise={handleAddExercise}
              onEditExercise={handleEditExercise}
              onDeleteExercise={handleDeleteExercise}
              showConfirm={showCustomConfirm}
              completedDays={completedDays}
              t={t}
              translateContent={translateContent}
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
            t={t}
            translateContent={translateContent}
          />
        </main>
      )}

      {/* Footer Section */}
      <footer className="app-footer">
        <span style={{ fontWeight: '800' }}>Fitora</span>
        <span>© 2024 Fitora Performance. All Rights Reserved.</span>
        <div className="footer-links">
          <button type="button" className="footer-link-btn" onClick={() => showCustomAlert('Privacy policy is standard client-side compliance.', 'Privacy Policy')}>Privacy Policy</button>
          <button type="button" className="footer-link-btn" onClick={() => showCustomAlert('Terms of service apply.', 'Terms of Service')}>Terms</button>
          <button type="button" className="footer-link-btn" onClick={() => showCustomAlert('Contact us at support@fitora.com', 'Contact Us')}>Contact</button>
        </div>
      </footer>

      <RecipeModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedCatalogRecipe(null);
        }}
        meal={selectedCatalogRecipe ? selectedCatalogRecipe : selectedMealConfig?.meal}
        targetCalories={selectedCatalogRecipe ? selectedCatalogRecipe.baseCalories : (selectedMealConfig?.targetCalories || 0)}
        isLogged={selectedCatalogRecipe ? loggedMeals.includes(selectedCatalogRecipe.id) : loggedMeals.includes(selectedMealSlot)}
        t={t}
        translateContent={translateContent}
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
            localStorage.setItem(userKey('logged_days'), JSON.stringify(updatedLogs));
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
              filter: 'drop-shadow(0 0 15px rgba(200, 255, 0, 0.55))',
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
        showConfirm={showCustomConfirm}
        language={language}
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

      {/* Custom Beautified Dialog Modal */}
      {customDialog.isOpen && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(5, 5, 8, 0.85)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 9999,
          padding: '1.5rem',
          animation: 'fadeIn 0.2s ease',
        }}>
          <div style={{
            background: '#0c0d12',
            border: '2px solid var(--accent-red)',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '400px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6), 0 0 25px rgba(200, 255, 0, 0.20)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            animation: 'welcomeCardSlideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          }}>
            {/* Header */}
            <div style={{
              padding: '1.25rem 1.5rem 0.75rem',
              display: 'flex',
              alignItems: 'center',
              borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
            }}>
              <h3 style={{
                margin: 0,
                fontSize: '1.1rem',
                fontWeight: 800,
                color: '#ffffff',
                letterSpacing: '0.5px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}>
                {customDialog.type === 'confirm' && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-coral)" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                )}
                {customDialog.type === 'prompt' && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-coral)" strokeWidth="2.5">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                )}
                {customDialog.type === 'alert' && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-red)" strokeWidth="2.5">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                    <line x1="12" y1="9" x2="12" y2="13"></line>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                )}
                {customDialog.title}
              </h3>
            </div>

            {/* Body */}
            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <p style={{
                margin: 0,
                fontSize: '0.92rem',
                lineHeight: '1.5',
                color: 'var(--text-secondary)',
              }}>
                {customDialog.message}
              </p>

              {customDialog.type === 'prompt' && (
                <input
                  type="text"
                  value={dialogInputVal}
                  onChange={(e) => setDialogInputVal(e.target.value)}
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleDialogConfirm();
                    if (e.key === 'Escape') handleDialogCancel();
                  }}
                  style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1.5px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    padding: '0.65rem 0.85rem',
                    color: '#ffffff',
                    fontSize: '0.95rem',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    width: '100%',
                    boxSizing: 'border-box',
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--accent-red)'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                />
              )}
            </div>

            {/* Footer */}
            <div style={{
              padding: '0.75rem 1.5rem 1.25rem',
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '0.75rem',
            }}>
              {customDialog.type !== 'alert' && (
                <button
                  type="button"
                  onClick={handleDialogCancel}
                  style={{
                    background: 'transparent',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: 'var(--text-secondary)',
                    borderRadius: '8px',
                    padding: '0.55rem 1.2rem',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'background 0.2s, color 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = 'var(--text-secondary)';
                  }}
                >
                  Cancel
                </button>
              )}
              <button
                type="button"
                onClick={handleDialogConfirm}
                style={{
                  background: 'var(--accent-red)',
                  border: 'none',
                  color: '#000000',
                  borderRadius: '8px',
                  padding: '0.55rem 1.2rem',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(200, 255, 0, 0.30)',
                  transition: 'background 0.2s, transform 0.1s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#a8e600';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'var(--accent-red)';
                }}
                onMouseDown={e => e.currentTarget.style.transform = 'scale(0.97)'}
                onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                {customDialog.type === 'alert' ? 'OK' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Mobile Bottom Navigation */}
      <nav className="mobile-nav-bar" aria-label="Mobile Navigation">
        <button 
          type="button" 
          className={`mobile-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <rect x="3" y="3" width="7" height="9" rx="1"/>
            <rect x="14" y="3" width="7" height="5" rx="1"/>
            <rect x="14" y="12" width="7" height="9" rx="1"/>
            <rect x="3" y="16" width="7" height="5" rx="1"/>
          </svg>
          <span>Dashboard</span>
        </button>
        <button 
          type="button" 
          className={`mobile-nav-item ${activeTab === 'workout' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('workout');
            setIsWorkoutActive(false); // Default to calendar browser view
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m6.5 6.5 11 11M3 21l3-3m15-15-3 3M17 3l4 4M3 17l4 4"/>
          </svg>
          <span>Workout</span>
        </button>
        <button 
          type="button" 
          className={`mobile-nav-item ${activeTab === 'recipes' ? 'active' : ''}`}
          onClick={() => setActiveTab('recipes')}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5V4.5z"/>
          </svg>
          <span>Recipes</span>
        </button>
      </nav>
    </div>
  );
}
