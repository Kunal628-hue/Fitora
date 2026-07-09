# Fitora - Personalized Daily Meal Planner & Workout Tracker

Fitora is a high-performance, premium client-side React web application designed to optimize your health, nutrition, and training routines.

## 🌟 Key Features

1. **Dashboard & Targets (Design 1 & 2 Merge)**:
   - **Inline Metrics Form**: Quick adjustment panel at the top (Age, Weight, Height, Steps, Sleep, Preference toggle, Goal toggle).
   - **Targets Strip**: Calorie Target, Protein (g), Carbs (g), and Fats (g) calculated scientifically.
   - **Daily Calories Tracker**: Horizontal progress bar comparing logged calories against target.
   - **Protein Goal Indicator**: Animated circular progress ring showing logged protein progress and remaining amount.
   - **Macro Ratio Donut Chart**: Rendered in SVG showing 40/40/20 target distribution (Protein, Carbs, Fats).
2. **Interactive 4-Column Meal Plan**:
   - breakfast, lunch, snack, and dinner slots with custom icon sets and bullet lists of ingredients.
   - Scaled mathematically to match the exact calorie targets for each meal.
   - Click **Log Meal** to increment the progress indicators on the Dashboard.
   - Click the swap button (🔄) to cycle through alternative recipes.
3. **Featured Next Meal Showcase**:
   - Shows the next slot based on current local time with a custom CSS plate graphic.
4. **Workout Routines & Active Tracker**:
   - **Routine Browser**: Day selector (MON-SUN) displaying focus muscle groups and exercises.
   - **Active Session Tracker**: Live 45-minute ticking countdown timer, exercise checkboxes, focus safety tips, and workout streaks.
5. **Shopping List Compilation**:
   - Automatically aggregates and scales all ingredients from your current active meals. Features checkable items and clipboard copy.

## 🚀 Getting Started

To run the application locally:

```bash
# Install dependencies
npm install

# Run the development server
npm run dev

# Build for production
npm run build
```
