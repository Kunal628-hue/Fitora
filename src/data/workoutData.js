/**
 * Fitora Workout Routines Database
 * Contains exercise schedules, targets, rest intervals, and tips.
 */

export const WORKOUT_ROUTINES = [
  {
    dayIndex: 0,
    dayName: 'MON',
    dayNumber: '01',
    routineName: 'Push Hypertrophy',
    focus: 'CHEST, SHOULDERS, TRICEPS',
    focusTip: 'Keep your elbows tucked at roughly 45 degrees during presses to protect your shoulders. Focus on deep stretch at the bottom.',
    exercises: [
      { name: 'Incline Barbell Press', sets: 4, reps: '10', rest: '90s', rpe: '9' },
      { name: 'Weighted Dips', sets: 3, reps: '12', rest: '120s', rpe: '8.5' },
      { name: 'Overhead Press', sets: 4, reps: '8', rest: '180s', rpe: '9' },
      { name: 'Lateral Raises', sets: 4, reps: '15', rest: '60s', rpe: '10' }
    ]
  },
  {
    dayIndex: 1,
    dayName: 'TUE',
    dayNumber: '02',
    routineName: 'Pull Hypertrophy',
    focus: 'BACK, BICEPS, REAR DELTS',
    focusTip: 'Lead the movement with your elbows and squeeze your shoulder blades together. Avoid using momentum on lat pull-downs.',
    exercises: [
      { name: 'Weighted Pull-ups', sets: 4, reps: '8', rest: '120s', rpe: '9' },
      { name: 'Barbell Rows', sets: 3, reps: '10', rest: '90s', rpe: '8.5' },
      { name: 'Lat Pulldowns (Wide)', sets: 3, reps: '12', rest: '90s', rpe: '8' },
      { name: 'Incline Dumbbell Curls', sets: 3, reps: '12', rest: '60s', rpe: '9' }
    ]
  },
  {
    dayIndex: 2,
    dayName: 'WED',
    dayNumber: '03',
    routineName: 'Active Recovery',
    focus: 'CORE, STEADY CARDIO',
    focusTip: 'Keep your heart rate in Zone 2 (easy conversational pace). Recovery is where the muscle actually grows.',
    exercises: [
      { name: 'Hanging Leg Raises', sets: 3, reps: '15', rest: '60s', rpe: '7.5' },
      { name: 'Plank Hold', sets: 3, reps: '60s', rest: '60s', rpe: '8' },
      { name: 'Russian Twists', sets: 3, reps: '20', rest: '45s', rpe: '7' },
      { name: 'Zone 2 Jog / Incline Walk', sets: 1, reps: '30 mins', rest: 'N/A', rpe: '6' }
    ]
  },
  {
    dayIndex: 3,
    dayName: 'THU',
    dayNumber: '04',
    routineName: 'Legs & Core Day',
    focus: 'QUADS, HAMSTRINGS, CORE',
    focusTip: 'Keep your core braced and shoulders back during heavy sets. Quality of movement exceeds quantity of weight.',
    exercises: [
      { name: 'Squats', sets: 4, reps: '8-10', rest: '180s', rpe: '9' },
      { name: 'Bench Press', sets: 3, reps: '12', rest: '90s', rpe: '8' }, // Mixed workout matching Design 1
      { name: 'Barbell Rows', sets: 3, reps: '10', rest: '90s', rpe: '8.5' },
      { name: 'Deadlifts', sets: 5, reps: '5', rest: '180s', rpe: '9.5' }
    ]
  },
  {
    dayIndex: 4,
    dayName: 'FRI',
    dayNumber: '05',
    routineName: 'Upper Body Power',
    focus: 'CHEST, BACK POWER',
    focusTip: 'Control the eccentric phase of the lift (the lowering phase). Explode with power on the concentric phase.',
    exercises: [
      { name: 'Flat Barbell Bench Press', sets: 5, reps: '5', rest: '180s', rpe: '9.5' },
      { name: 'Pendlay Rows', sets: 4, reps: '6', rest: '120s', rpe: '9' },
      { name: 'Incline Dumbbell Press', sets: 3, reps: '8', rest: '90s', rpe: '8.5' },
      { name: 'Face Pulls', sets: 4, reps: '15', rest: '60s', rpe: '9' }
    ]
  },
  {
    dayIndex: 5,
    dayName: 'SAT',
    dayNumber: '06',
    routineName: 'Lower Body Power',
    focus: 'POSTERIOR CHAIN POWER',
    focusTip: 'Push the floor away through your heels on deadlifts. Keep the bar path tight against your shins.',
    exercises: [
      { name: 'Conventional Deadlifts', sets: 5, reps: '3', rest: '240s', rpe: '9.5' },
      { name: 'Bulgarian Split Squats', sets: 3, reps: '8 each', rest: '90s', rpe: '9' },
      { name: 'Hamstring Curls', sets: 3, reps: '10', rest: '90s', rpe: '8.5' },
      { name: 'Standing Calf Raises', sets: 4, reps: '12', rest: '60s', rpe: '9' }
    ]
  },
  {
    dayIndex: 6,
    dayName: 'SUN',
    dayNumber: '07',
    routineName: 'Rest & Mobility',
    focus: 'FLEXIBILITY, MOBILITY',
    focusTip: 'Perform deep diaphragmatic breathing during stretches to release muscle tension and reduce cortisol.',
    exercises: [
      { name: 'Decompression Hangs', sets: 3, reps: '45s', rest: '60s', rpe: '5' },
      { name: 'Hip Opener Flow', sets: 1, reps: '15 mins', rest: 'N/A', rpe: '5' },
      { name: 'Thoracic Spine Extensions', sets: 3, reps: '12', rest: '45s', rpe: '5' },
      { name: 'Full Body Foam Roll', sets: 1, reps: '20 mins', rest: 'N/A', rpe: '4' }
    ]
  }
];
