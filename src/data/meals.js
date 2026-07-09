/**
 * Fitora Recipe and Meal Templates Database (Merged Designs Version)
 * Contains recipes matching Design 1 & 2 layout bullet points.
 */

export const MEAL_TEMPLATES = {
  breakfast: [
    {
      id: 'b_oatmeal_whey',
      name: 'Oatmeal w/ Whey',
      description: 'Creamy oatmeal topped with whey protein, fresh blueberries, and sliced almonds.',
      prepTime: '8 mins',
      diets: ['veg', 'non'],
      baseCalories: 550,
      macros: { protein: 35, fat: 15, carbs: 68 },
      bullets: ['Oatmeal w/ Whey', 'Blueberries', 'Almonds'],
      ingredients: [
        { name: 'Rolled Oats', baseAmount: 80, unit: 'g' },
        { name: 'Whey Protein Powder', baseAmount: 35, unit: 'g' },
        { name: 'Fresh Blueberries', baseAmount: 70, unit: 'g' },
        { name: 'Almonds (Sliced)', baseAmount: 20, unit: 'g' },
        { name: 'Almond Milk', baseAmount: 200, unit: 'ml' }
      ],
      instructions: [
        'Cook rolled oats in almond milk until thick and creamy.',
        'Stir in whey protein powder until smooth and dissolved.',
        'Top with fresh blueberries and sliced almonds.'
      ]
    },
    {
      id: 'b_avocado_eggs',
      name: 'Avocado & Eggs Toast',
      description: 'Poached eggs on toasted sourdough bread with smashed avocado.',
      prepTime: '10 mins',
      diets: ['veg', 'non'],
      baseCalories: 480,
      macros: { protein: 22, fat: 28, carbs: 35 },
      bullets: ['Sourdough Toast', 'Avocado Mash', '2 Poached Eggs'],
      ingredients: [
        { name: 'Sourdough Bread', baseAmount: 2, unit: 'slices' },
        { name: 'Avocado', baseAmount: 1, unit: 'medium' },
        { name: 'Eggs', baseAmount: 2, unit: 'large' }
      ],
      instructions: [
        'Toast the sourdough bread.',
        'Mash the avocado and spread it over the toast.',
        'Poach eggs for 3 minutes and place them on top.'
      ]
    }
  ],
  lunch: [
    {
      id: 'l_tofu_paneer',
      name: 'Grilled Tofu/Paneer',
      description: 'Marinated grilled tofu or paneer served with brown rice and steamed broccoli.',
      prepTime: '15 mins',
      diets: ['veg'],
      baseCalories: 750,
      macros: { protein: 35, fat: 25, carbs: 96 },
      bullets: ['Grilled Tofu/Paneer', 'Brown Rice', 'Steamed Broccoli'],
      ingredients: [
        { name: 'Firm Tofu or Paneer', baseAmount: 200, unit: 'g' },
        { name: 'Brown Rice (Cooked)', baseAmount: 250, unit: 'g' },
        { name: 'Broccoli Florets', baseAmount: 150, unit: 'g' },
        { name: 'Olive Oil', baseAmount: 1, unit: 'tbsp' }
      ],
      instructions: [
        'Slice tofu or paneer and grill in olive oil until golden on both sides.',
        'Steam broccoli florets until tender-crisp.',
        'Serve grilled protein alongside brown rice and steamed broccoli.'
      ]
    },
    {
      id: 'l_chicken_asparagus',
      name: 'Grilled Chicken & Asparagus',
      description: 'High-protein lean meal designed for post-workout recovery. Includes complex carbohydrates from quinoa and micronutrients from fresh greens.',
      prepTime: '20 mins',
      diets: ['non'],
      baseCalories: 480, // Matches next meal calories pill from Design 1
      macros: { protein: 42, fat: 12, carbs: 51 },
      bullets: ['Grilled Chicken', 'Steamed Asparagus', 'Quinoa Side'],
      ingredients: [
        { name: 'Chicken Breast', baseAmount: 160, unit: 'g' },
        { name: 'Asparagus Spears', baseAmount: 150, unit: 'g' },
        { name: 'Quinoa (Cooked)', baseAmount: 150, unit: 'g' },
        { name: 'Olive Oil', baseAmount: 1, unit: 'tsp' }
      ],
      instructions: [
        'Season chicken breast and grill until fully cooked through.',
        'Toss asparagus in olive oil and grill or roast for 10 minutes.',
        'Serve with a side of cooked quinoa.'
      ]
    }
  ],
  snack: [
    {
      id: 's_greek_yogurt',
      name: 'Greek Yogurt',
      description: 'Creamy plain Greek yogurt topped with organic chia seeds and a touch of honey.',
      prepTime: '3 mins',
      diets: ['veg', 'non'],
      baseCalories: 350,
      macros: { protein: 25, fat: 10, carbs: 40 },
      bullets: ['Greek Yogurt', 'Chia Seeds', 'Honey Drizzle'],
      ingredients: [
        { name: 'Greek Yogurt (Plain)', baseAmount: 250, unit: 'g' },
        { name: 'Chia Seeds', baseAmount: 2, unit: 'tbsp' },
        { name: 'Honey', baseAmount: 1, unit: 'tbsp' }
      ],
      instructions: [
        'Spoon Greek yogurt into a bowl.',
        'Stir in the chia seeds.',
        'Drizzle with raw honey before serving.'
      ]
    },
    {
      id: 's_nuts_berries',
      name: 'Nuts and Berries',
      description: 'Raw mixed almonds and walnuts served with a side of organic raspberries.',
      prepTime: '2 mins',
      diets: ['veg', 'non'],
      baseCalories: 300,
      macros: { protein: 8, fat: 22, carbs: 18 },
      bullets: ['Mixed Nuts', 'Raspberries'],
      ingredients: [
        { name: 'Mixed Nuts', baseAmount: 45, unit: 'g' },
        { name: 'Fresh Raspberries', baseAmount: 100, unit: 'g' }
      ],
      instructions: [
        'Portion out raw nuts in a bowl.',
        'Rinse berries and serve together.'
      ]
    }
  ],
  dinner: [
    {
      id: 'd_lentil_pasta',
      name: 'Lentil Pasta',
      description: 'Protein-rich red lentil pasta tossed with fresh baby greens and high-quality extra virgin olive oil.',
      prepTime: '15 mins',
      diets: ['veg', 'non'],
      baseCalories: 800,
      macros: { protein: 42, fat: 24, carbs: 104 },
      bullets: ['Lentil Pasta', 'Mixed Greens', 'Olive Oil Drizzle'],
      ingredients: [
        { name: 'Red Lentil Pasta (Dry)', baseAmount: 120, unit: 'g' },
        { name: 'Mixed Salad Greens', baseAmount: 80, unit: 'g' },
        { name: 'Extra Virgin Olive Oil', baseAmount: 1.5, unit: 'tbsp' },
        { name: 'Garlic', baseAmount: 2, unit: 'cloves' }
      ],
      instructions: [
        'Boil lentil pasta in salted water according to package directions.',
        'Sauté garlic lightly in olive oil, then toss with the drained pasta.',
        'Serve hot topped with fresh mixed greens.'
      ]
    },
    {
      id: 'd_beef_veggies',
      name: 'Sirloin & Roasted Veggies',
      description: 'Lean grilled sirloin steak with a side of mixed roasted root vegetables and greens.',
      prepTime: '20 mins',
      diets: ['non'],
      baseCalories: 720,
      macros: { protein: 50, fat: 32, carbs: 58 },
      bullets: ['Grilled Sirloin', 'Roasted Root Veggies', 'Olive Oil Dressing'],
      ingredients: [
        { name: 'Sirloin Steak', baseAmount: 200, unit: 'g' },
        { name: 'Sweet Potatoes (Cubed)', baseAmount: 150, unit: 'g' },
        { name: 'Asparagus & Carrots', baseAmount: 150, unit: 'g' },
        { name: 'Olive Oil', baseAmount: 1.5, unit: 'tbsp' }
      ],
      instructions: [
        'Season steak and grill to desired level of doneness.',
        'Toss cubed root veggies and greens in olive oil and roast at 200°C for 20 minutes.',
        'Serve together hot.'
      ]
    }
  ]
};
