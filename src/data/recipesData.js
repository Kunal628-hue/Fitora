/**
 * Fitora Recipes Catalog Database
 * Stores high-performance catalog items with tags, macros, ingredients, and instructions.
 */

export const RECIPES_CATALOG = [
  {
    id: 'c_ribeye_bowl',
    name: 'Iron-Clad Ribeye Bowl',
    description: 'A muscle-building powerhouse featuring premium ribeye steak over warm jasmine rice, spinach, and broccoli.',
    tag: 'POST-WORKOUT POWER',
    prepTime: '15 mins',
    baseCalories: 506,
    macros: { protein: 52, carbs: 34, fat: 18 },
    ingredients: [
      { name: 'Ribeye Steak (Lean Trimmed)', baseAmount: 200, unit: 'g' },
      { name: 'Jasmine Rice (Cooked)', baseAmount: 150, unit: 'g' },
      { name: 'Baby Spinach', baseAmount: 50, unit: 'g' },
      { name: 'Broccoli Florets', baseAmount: 100, unit: 'g' },
      { name: 'Olive Oil', baseAmount: 1, unit: 'tsp' }
    ],
    instructions: [
      'Season the ribeye steak with coarse salt and black pepper.',
      'Sear the steak in a hot skillet for 3-4 minutes per side (medium-rare). Let rest, then slice.',
      'Steam broccoli florets and baby spinach until tender.',
      'Assemble the bowl with a base of jasmine rice, then top with greens and sliced ribeye steak.'
    ]
  },
  {
    id: 'c_arctic_salmon',
    name: 'Glazed Arctic Salmon',
    description: 'An endurance-supporting dish rich in healthy omega-3 fatty acids, served with grilled asparagus spears.',
    tag: 'ENDURANCE FUEL',
    prepTime: '18 mins',
    baseCalories: 414,
    macros: { protein: 42, carbs: 12, fat: 22 },
    ingredients: [
      { name: 'Salmon Fillet', baseAmount: 180, unit: 'g' },
      { name: 'Teriyaki / Coconut Aminos Glaze', baseAmount: 1.5, unit: 'tbsp' },
      { name: 'Asparagus Spears', baseAmount: 150, unit: 'g' },
      { name: 'Sesame Oil', baseAmount: 1, unit: 'tsp' }
    ],
    instructions: [
      'Preheat oven to 200°C (400°F).',
      'Brush the salmon fillet with teriyaki glaze, then bake for 12-15 minutes.',
      'Sauté the asparagus spears in sesame oil in a hot pan for 5-6 minutes.',
      'Serve salmon hot alongside the asparagus.'
    ]
  },
  {
    id: 'c_breakfast_bowl',
    name: 'Elite Breakfast Bowl',
    description: 'A nutrient-dense morning ritual bowl featuring soft-boiled eggs, avocado, smoked turkey breast, and tomatoes.',
    tag: 'MORNING RITUAL',
    prepTime: '10 mins',
    baseCalories: 400,
    macros: { protein: 38, carbs: 8, fat: 24 },
    ingredients: [
      { name: 'Soft-Boiled Eggs', baseAmount: 2, unit: 'large' },
      { name: 'Avocado', baseAmount: 0.5, unit: 'medium' },
      { name: 'Smoked Turkey Breast', baseAmount: 120, unit: 'g' },
      { name: 'Baby Spinach', baseAmount: 50, unit: 'g' },
      { name: 'Cherry Tomatoes', baseAmount: 60, unit: 'g' }
    ],
    instructions: [
      'Boil eggs for 6.5 minutes for a perfect soft yolk, then peel and slice.',
      'Layer fresh baby spinach at the bottom of the bowl.',
      'Arrange sliced smoked turkey breast, avocado slices, halved cherry tomatoes, and eggs.',
      'Drizzle with olive oil, salt, and pepper.'
    ]
  },
  {
    id: 'c_buffalo_shred',
    name: 'Buffalo Shred Shred',
    description: 'High-volume shredded chicken breast tossed in zesty buffalo sauce, served with celery and blue cheese dressing.',
    tag: 'HIGH-VOLUME LEAN',
    prepTime: '10 mins',
    baseCalories: 302,
    macros: { protein: 58, carbs: 4, fat: 6 },
    ingredients: [
      { name: 'Chicken Breast (Cooked & Shredded)', baseAmount: 250, unit: 'g' },
      { name: 'Buffalo Hot Sauce', baseAmount: 2, unit: 'tbsp' },
      { name: 'Celery (Chopped)', baseAmount: 60, unit: 'g' },
      { name: 'Greek Yogurt Blue Cheese Dip', baseAmount: 2, unit: 'tbsp' }
    ],
    instructions: [
      'Toss the hot shredded chicken breast with buffalo sauce until fully coated.',
      'Transfer to a plate and garnish with crisp chopped celery.',
      'Serve with a side of light blue cheese dip.'
    ]
  },
  {
    id: 'c_protein_mousse',
    name: 'Midnight Protein Mousse',
    description: 'A thick, rich, chocolate casein mousse topped with fresh raspberries—the ultimate guilt-free functional reward.',
    tag: 'FUNCTIONAL REWARD',
    prepTime: '5 mins',
    baseCalories: 265,
    macros: { protein: 32, carbs: 14, fat: 9 },
    ingredients: [
      { name: 'Chocolate Casein Protein Powder', baseAmount: 30, unit: 'g' },
      { name: 'Unsweetened Cocoa Powder', baseAmount: 1, unit: 'tbsp' },
      { name: 'Greek Yogurt (Fat-Free)', baseAmount: 150, unit: 'g' },
      { name: 'Fresh Raspberries', baseAmount: 50, unit: 'g' }
    ],
    instructions: [
      'In a bowl, mix casein protein powder and cocoa powder.',
      'Add Greek yogurt and whisk vigorously. Gradually add 1-2 tbsp water if needed to reach a thick mousse texture.',
      'Chill in the refrigerator for 30 minutes, then top with raspberries.'
    ]
  },
  {
    id: 'c_pesto_pasta',
    name: 'Pesto Performance Pasta',
    description: 'High-protein penne pasta tossed with basil pesto, grilled chicken breast, cherry tomatoes, and baby spinach.',
    tag: 'ANABOLIC LOAD',
    prepTime: '15 mins',
    baseCalories: 507,
    macros: { protein: 45, carbs: 48, fat: 15 },
    ingredients: [
      { name: 'Red Lentil or Chickpea Penne (Dry)', baseAmount: 75, unit: 'g' },
      { name: 'Grilled Chicken Breast (Sliced)', baseAmount: 120, unit: 'g' },
      { name: 'Basil Pesto Sauce', baseAmount: 1.5, unit: 'tbsp' },
      { name: 'Cherry Tomatoes', baseAmount: 60, unit: 'g' },
      { name: 'Baby Spinach', baseAmount: 40, unit: 'g' }
    ],
    instructions: [
      'Cook protein pasta in boiling salted water, then drain.',
      'Toss warm pasta with basil pesto until evenly coated.',
      'Stir in sliced grilled chicken, halved cherry tomatoes, and baby spinach until spinach is slightly wilted.'
    ]
  }
];
