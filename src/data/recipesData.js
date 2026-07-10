/**
 * Fitora Recipes Catalog Database
 * Stores high-performance catalog items with tags, macros, ingredients, and instructions.
 * Expanded to 7 Veg and 7 Non-Veg recipes to ensure adequate grid capacity.
 */

export const RECIPES_CATALOG = [
  // --- NON-VEG RECIPES ---
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
    name: 'Buffalo Shred Chicken',
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
  },
  {
    id: 'c_chicken_tikka',
    name: 'Spice-Rubbed Chicken Tikka',
    description: 'Juicy, flame-grilled chicken breast pieces marinated in yogurt and Indian spices, served with fresh onions.',
    tag: 'ANABOLIC GRILLED',
    prepTime: '20 mins',
    baseCalories: 354,
    macros: { protein: 45, carbs: 12, fat: 14 },
    ingredients: [
      { name: 'Chicken Breast', baseAmount: 180, unit: 'g' },
      { name: 'Yogurt Marinade', baseAmount: 50, unit: 'g' },
      { name: 'Lemon Juice', baseAmount: 1, unit: 'tbsp' },
      { name: 'Spices (Tikka Masala)', baseAmount: 10, unit: 'g' }
    ],
    instructions: [
      'Cut chicken breast into medium-sized cubes.',
      'Marinate in spiced yogurt and lemon juice for 1 hour.',
      'Thread onto skewers and grill or bake at 200°C for 15 minutes.'
    ]
  },
  {
    id: 'c_salmon_salad',
    name: 'Keto Salmon Avocado Salad',
    description: 'Pan-seared salmon fillet served over a bed of baby spinach, sliced avocado, and pumpkin seeds.',
    tag: 'HIGH FAT LOW CARB',
    prepTime: '12 mins',
    baseCalories: 420,
    macros: { protein: 38, carbs: 8, fat: 26 },
    ingredients: [
      { name: 'Salmon Fillet', baseAmount: 150, unit: 'g' },
      { name: 'Avocado', baseAmount: 0.5, unit: 'medium' },
      { name: 'Baby Spinach', baseAmount: 80, unit: 'g' },
      { name: 'Pumpkin Seeds', baseAmount: 15, unit: 'g' }
    ],
    instructions: [
      'Pan-sear salmon in a non-stick skillet for 4 minutes per side.',
      'Assemble spinach, avocado slices, and seeds in a salad bowl.',
      'Place hot salmon fillet on top and drizzle with lemon dressing.'
    ]
  },

  // --- VEG RECIPES ---
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
    id: 'c_paneer_tikka',
    name: 'High-Protein Paneer Tikka',
    description: 'Spiced low-fat paneer cubes skewered and grilled with bell peppers and onions, a vegetarian high-protein classic.',
    tag: 'VEG POWER BUILDER',
    prepTime: '18 mins',
    baseCalories: 370,
    macros: { protein: 28, carbs: 15, fat: 22 },
    ingredients: [
      { name: 'Low-Fat Paneer', baseAmount: 160, unit: 'g' },
      { name: 'Bell Peppers', baseAmount: 80, unit: 'g' },
      { name: 'Yogurt Marinade', baseAmount: 40, unit: 'g' },
      { name: 'Mustard Oil', baseAmount: 1, unit: 'tsp' }
    ],
    instructions: [
      'Cut paneer, onions, and bell peppers into cubes.',
      'Marinate in a thick spiced yogurt mixture for 30 minutes.',
      'Skewer and grill in an oven or air-fryer until edges are slightly charred.'
    ]
  },
  {
    id: 'c_tofu_stir_fry',
    name: 'Anabolic Tofu Stir-Fry',
    description: 'Crispy pan-seared organic tofu tossed with broccoli, snap peas, and low-sodium soy sesame dressing.',
    tag: 'VEGAN SHRED',
    prepTime: '15 mins',
    baseCalories: 340,
    macros: { protein: 26, carbs: 32, fat: 12 },
    ingredients: [
      { name: 'Extra Firm Tofu', baseAmount: 180, unit: 'g' },
      { name: 'Broccoli Florets & Snap Peas', baseAmount: 150, unit: 'g' },
      { name: 'Soy Sauce & Sesame Oil', baseAmount: 1, unit: 'tbsp' },
      { name: 'Brown Rice (Cooked)', baseAmount: 100, unit: 'g' }
    ],
    instructions: [
      'Press tofu to remove excess water, then cube and pan-fry until golden.',
      'Sauté vegetables in a wok with sesame oil and soy sauce.',
      'Toss tofu back into the wok, mix well, and serve over brown rice.'
    ]
  },
  {
    id: 'c_chana_masala',
    name: 'High-Fiber Chickpea Masala',
    description: 'Authentic spiced chickpea curry packed with plant-based protein and dietary fiber, served with cucumber slices.',
    tag: 'FIBER & POWER',
    prepTime: '20 mins',
    baseCalories: 424,
    macros: { protein: 20, carbs: 68, fat: 8 },
    ingredients: [
      { name: 'Chickpeas (Boiled)', baseAmount: 220, unit: 'g' },
      { name: 'Onion Tomato Gravy', baseAmount: 100, unit: 'g' },
      { name: 'Ginger Garlic Paste', baseAmount: 1, unit: 'tsp' },
      { name: 'Fresh Coriander', baseAmount: 10, unit: 'g' }
    ],
    instructions: [
      'Sauté onions, ginger, garlic, and tomato puree until fragrant.',
      'Add boiled chickpeas and spices, simmer for 15 minutes.',
      'Garnish with fresh chopped coriander and serve hot.'
    ]
  },
  {
    id: 'c_lentil_pasta',
    name: 'Red Lentil Protein Pasta',
    description: 'Gluten-free red lentil penne pasta tossed in herb marinara sauce and topped with fresh baby spinach.',
    tag: 'ANABOLIC CARBLOAD',
    prepTime: '15 mins',
    baseCalories: 594,
    macros: { protein: 42, carbs: 84, fat: 10 },
    ingredients: [
      { name: 'Red Lentil Penne (Dry)', baseAmount: 110, unit: 'g' },
      { name: 'Marinara Tomato Sauce', baseAmount: 80, unit: 'g' },
      { name: 'Baby Spinach', baseAmount: 50, unit: 'g' },
      { name: 'Olive Oil', baseAmount: 1, unit: 'tsp' }
    ],
    instructions: [
      'Boil red lentil pasta in salted water for 8-9 minutes, then drain.',
      'Sauté spinach in olive oil until wilted.',
      'Toss pasta, tomato sauce, and spinach together, and serve hot.'
    ]
  },
  {
    id: 'c_soya_curry',
    name: 'High-Protein Soya Curry',
    description: 'Soya chunks slow-cooked in a spicy, aromatic Indian gravy, providing an exceptionally high vegetarian protein density.',
    tag: 'VEG MACRO KING',
    prepTime: '18 mins',
    baseCalories: 396,
    macros: { protein: 36, carbs: 45, fat: 8 },
    ingredients: [
      { name: 'Soya Chunks', baseAmount: 70, unit: 'g' },
      { name: 'Onion Tomato Curry Paste', baseAmount: 80, unit: 'g' },
      { name: 'Low-Fat Yogurt', baseAmount: 50, unit: 'g' },
      { name: 'Spices', baseAmount: 10, unit: 'g' }
    ],
    instructions: [
      'Boil soya chunks in water for 5 minutes, rinse, and squeeze out water.',
      'Cook spices and onion-tomato gravy base in a pan.',
      'Add soya chunks and yogurt, cover, and simmer for 10 minutes.'
    ]
  },
  {
    id: 'c_moong_dal',
    name: 'Moong Dal Pancakes',
    description: 'Savory lentil crepes stuffed with low-fat paneer, fresh onions, and green chilies, served with mint chutney.',
    tag: 'CLEAN MORNING FUEL',
    prepTime: '15 mins',
    baseCalories: 394,
    macros: { protein: 22, carbs: 54, fat: 10 },
    ingredients: [
      { name: 'Moong Dal Batter', baseAmount: 120, unit: 'ml' },
      { name: 'Paneer (Low-Fat, Grated)', baseAmount: 80, unit: 'g' },
      { name: 'Green Chillies & Onions', baseAmount: 20, unit: 'g' },
      { name: 'Ghee', baseAmount: 1, unit: 'tsp' }
    ],
    instructions: [
      'Spread moong dal batter onto a hot greased flat pan.',
      'Cook both sides until light brown and crisp.',
      'Fill with grated paneer and onions, fold, and serve with chutney.'
    ]
  }
];
