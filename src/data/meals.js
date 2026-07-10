/**
 * Fitora Recipe and Meal Templates Database (Merged Designs Version)
 * Contains recipes matching Design 1 & 2 layout bullet points.
 * Expanded to 7+ options per category to guarantee daily variety.
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
    },
    {
      id: 'b_peanut_banana',
      name: 'Peanut Butter Banana Toast',
      description: 'Whole wheat toast spread with organic peanut butter, banana slices, and chia seeds.',
      prepTime: '5 mins',
      diets: ['veg', 'non'],
      baseCalories: 450,
      macros: { protein: 14, fat: 16, carbs: 60 },
      bullets: ['Whole Wheat Toast', 'Peanut Butter', 'Banana Slices'],
      ingredients: [
        { name: 'Whole Wheat Bread', baseAmount: 2, unit: 'slices' },
        { name: 'Peanut Butter', baseAmount: 2, unit: 'tbsp' },
        { name: 'Banana', baseAmount: 1, unit: 'medium' },
        { name: 'Chia Seeds', baseAmount: 1, unit: 'tsp' }
      ],
      instructions: [
        'Toast the whole wheat bread.',
        'Spread creamy peanut butter evenly on toast.',
        'Top with sliced banana and sprinkle with chia seeds.'
      ]
    },
    {
      id: 'b_chia_berry',
      name: 'Vanilla Berry Chia Pudding',
      description: 'Creamy vanilla chia seed pudding served with fresh raspberries and protein blend.',
      prepTime: '5 mins',
      diets: ['veg', 'non'],
      baseCalories: 400,
      macros: { protein: 28, fat: 11, carbs: 44 },
      bullets: ['Chia Pudding', 'Protein Powder Blend', 'Mixed Berries'],
      ingredients: [
        { name: 'Chia Seeds', baseAmount: 3, unit: 'tbsp' },
        { name: 'Almond Milk', baseAmount: 150, unit: 'ml' },
        { name: 'Vanilla Protein Powder', baseAmount: 25, unit: 'g' },
        { name: 'Mixed Berries', baseAmount: 80, unit: 'g' }
      ],
      instructions: [
        'Mix chia seeds, almond milk, and protein powder in a bowl.',
        'Let sit overnight or for 4 hours to thicken.',
        'Garnish with fresh mixed berries before serving.'
      ]
    },
    {
      id: 'b_tofu_scramble',
      name: 'Turmeric Tofu Scramble',
      description: 'Scrambled tofu with spinach, turmeric, and cherry tomatoes served on sourdough.',
      prepTime: '12 mins',
      diets: ['veg', 'non'],
      baseCalories: 420,
      macros: { protein: 25, fat: 14, carbs: 48 },
      bullets: ['Scrambled Tofu', 'Sautéed Spinach', 'Sourdough Toast'],
      ingredients: [
        { name: 'Firm Tofu', baseAmount: 150, unit: 'g' },
        { name: 'Spinach', baseAmount: 50, unit: 'g' },
        { name: 'Sourdough Bread', baseAmount: 1, unit: 'slice' },
        { name: 'Olive Oil', baseAmount: 1, unit: 'tsp' },
        { name: 'Turmeric & Pepper', baseAmount: 1, unit: 'pinch' }
      ],
      instructions: [
        'Crumble tofu in a pan with olive oil, turmeric, and spices.',
        'Sauté for 5 minutes, then add spinach and tomatoes until wilted.',
        'Serve hot alongside toasted sourdough bread.'
      ]
    },
    {
      id: 'b_moong_dal',
      name: 'Paneer Moong Dal Chilla',
      description: 'Lentil pancakes stuffed with low-fat grated paneer and fresh coriander.',
      prepTime: '15 mins',
      diets: ['veg', 'non'],
      baseCalories: 380,
      macros: { protein: 22, fat: 12, carbs: 54 },
      bullets: ['Moong Dal Chilla', 'Paneer Crumble', 'Mint Chutney'],
      ingredients: [
        { name: 'Moong Dal Batter', baseAmount: 120, unit: 'ml' },
        { name: 'Low-Fat Paneer', baseAmount: 80, unit: 'g' },
        { name: 'Onions & Chillies', baseAmount: 20, unit: 'g' },
        { name: 'Ghee', baseAmount: 1, unit: 'tsp' }
      ],
      instructions: [
        'Pour moong dal batter onto a hot tawa and spread in a circle.',
        'Drizzle with ghee and cook until golden brown.',
        'Fill with grated spiced paneer, fold, and serve with mint chutney.'
      ]
    },
    {
      id: 'b_protein_pancakes',
      name: 'Protein Oat Pancakes',
      description: 'High-protein pancakes made of oat flour, egg whites, and whey protein.',
      prepTime: '15 mins',
      diets: ['veg', 'non'],
      baseCalories: 460,
      macros: { protein: 32, fat: 7, carbs: 65 },
      bullets: ['Oat Flour Pancakes', 'Egg White Blend', 'Maple Syrup Drizzle'],
      ingredients: [
        { name: 'Oat Flour', baseAmount: 70, unit: 'g' },
        { name: 'Egg Whites', baseAmount: 3, unit: 'large' },
        { name: 'Whey Protein', baseAmount: 20, unit: 'g' },
        { name: 'Baking Powder', baseAmount: 0.5, unit: 'tsp' }
      ],
      instructions: [
        'Blend oats, egg whites, protein powder, and baking powder until smooth.',
        'Cook on a non-stick skillet for 2-3 minutes per side.',
        'Stack and drizzle lightly with organic maple syrup.'
      ]
    }
  ],
  lunch: [
    {
      id: 'l_tofu_paneer',
      name: 'Grilled Tofu/Paneer',
      description: 'Marinated grilled tofu or paneer served with brown rice and steamed broccoli.',
      prepTime: '15 mins',
      diets: ['veg', 'non'],
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
      description: 'High-protein lean meal designed for post-workout recovery. Includes complex carbohydrates from quinoa.',
      prepTime: '20 mins',
      diets: ['non'],
      baseCalories: 480,
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
    },
    {
      id: 'l_paneer_tikka_bowl',
      name: 'Paneer Tikka Bowl',
      description: 'Spiced paneer tikka skewers served on a bed of warm quinoa and roasted bell peppers.',
      prepTime: '18 mins',
      diets: ['veg', 'non'],
      baseCalories: 620,
      macros: { protein: 28, fat: 24, carbs: 73 },
      bullets: ['Paneer Tikka cubes', 'Quinoa Bed', 'Roasted Peppers'],
      ingredients: [
        { name: 'Paneer (Low-Fat)', baseAmount: 150, unit: 'g' },
        { name: 'Quinoa (Cooked)', baseAmount: 200, unit: 'g' },
        { name: 'Bell Peppers & Onions', baseAmount: 100, unit: 'g' },
        { name: 'Yogurt Marinade', baseAmount: 50, unit: 'g' }
      ],
      instructions: [
        'Marinate paneer cubes in spiced yogurt and grill.',
        'Sauté chopped bell peppers and onions in olive oil.',
        'Serve grilled paneer over cooked quinoa with sautéed veggies.'
      ]
    },
    {
      id: 'l_chana_masala',
      name: 'Chickpea Chana Masala',
      description: 'Traditional spiced chickpea curry served with whole wheat flatbread and fresh cucumber salad.',
      prepTime: '20 mins',
      diets: ['veg', 'non'],
      baseCalories: 580,
      macros: { protein: 20, fat: 12, carbs: 98 },
      bullets: ['Chana Masala', '2 Whole Wheat Rotis', 'Cucumber Salad'],
      ingredients: [
        { name: 'Boiled Chickpeas', baseAmount: 200, unit: 'g' },
        { name: 'Whole Wheat Roti', baseAmount: 2, unit: 'pieces' },
        { name: 'Tomato Onion Gravy', baseAmount: 100, unit: 'g' },
        { name: 'Cucumber Slices', baseAmount: 80, unit: 'g' }
      ],
      instructions: [
        'Simmer chickpeas in a rich spiced tomato-onion gravy.',
        'Prepare warm fresh whole wheat rotis.',
        'Serve chickpeas hot with rotis and sliced cucumber salad.'
      ]
    },
    {
      id: 'l_fish_rice',
      name: 'Grilled Salmon & Rice',
      description: 'Omega-3 rich grilled salmon fillet alongside seasoned brown rice and baby spinach.',
      prepTime: '18 mins',
      diets: ['non'],
      baseCalories: 550,
      macros: { protein: 38, fat: 14, carbs: 68 },
      bullets: ['Grilled Salmon/Fish', 'Brown Rice', 'Sautéed Spinach'],
      ingredients: [
        { name: 'Salmon Fillet', baseAmount: 150, unit: 'g' },
        { name: 'Brown Rice (Cooked)', baseAmount: 180, unit: 'g' },
        { name: 'Fresh Spinach', baseAmount: 100, unit: 'g' },
        { name: 'Lemon & Olive Oil', baseAmount: 1, unit: 'tbsp' }
      ],
      instructions: [
        'Pan-sear salmon fillet with olive oil and lemon juice.',
        'Sauté spinach lightly in garlic and olive oil.',
        'Serve fish with brown rice and spinach.'
      ]
    },
    {
      id: 'l_lentil_buddha',
      name: 'Lentil Buddha Bowl',
      description: 'Nutrient-dense bowl with green lentils, roasted sweet potatoes, and organic tahini sauce.',
      prepTime: '20 mins',
      diets: ['veg', 'non'],
      baseCalories: 600,
      macros: { protein: 25, fat: 15, carbs: 91 },
      bullets: ['Spiced Lentils', 'Sweet Potatoes', 'Tahini Drizzle'],
      ingredients: [
        { name: 'Brown Lentils (Boiled)', baseAmount: 180, unit: 'g' },
        { name: 'Sweet Potato (Roasted)', baseAmount: 150, unit: 'g' },
        { name: 'Kale / Spinach', baseAmount: 60, unit: 'g' },
        { name: 'Tahini paste', baseAmount: 1.5, unit: 'tbsp' }
      ],
      instructions: [
        'Warm up boiled lentils with simple spices.',
        'Roast sweet potato cubes with olive oil.',
        'Assemble in a bowl with kale and drizzle with rich tahini sauce.'
      ]
    },
    {
      id: 'l_egg_bhurji',
      name: 'Egg Bhurji & Paratha',
      description: 'Protein-packed Indian scrambled eggs with green chilies, onions, and whole wheat paratha.',
      prepTime: '15 mins',
      diets: ['non'],
      baseCalories: 520,
      macros: { protein: 26, fat: 20, carbs: 59 },
      bullets: ['Spicy Egg Bhurji', 'Whole Wheat Paratha', 'Tomato Slices'],
      ingredients: [
        { name: 'Eggs', baseAmount: 3, unit: 'large' },
        { name: 'Whole Wheat Flour (Roti)', baseAmount: 60, unit: 'g' },
        { name: 'Onions & Tomatoes', baseAmount: 50, unit: 'g' },
        { name: 'Butter', baseAmount: 1, unit: 'tsp' }
      ],
      instructions: [
        'Scramble eggs in butter with sautéed onions, tomatoes, and green chilies.',
        'Prepare whole wheat flatbread (paratha) on a hot tawa.',
        'Serve egg bhurji hot alongside paratha.'
      ]
    },
    {
      id: 'l_turkey_wrap',
      name: 'Lean Turkey Wrap',
      description: 'Thinly sliced clean turkey breast rolled in a low-carb wrap with garlic hummus and spinach.',
      prepTime: '10 mins',
      diets: ['non'],
      baseCalories: 490,
      macros: { protein: 35, fat: 13, carbs: 58 },
      bullets: ['Turkey Breast Slices', 'Whole Wheat Wrap', 'Hummus & Greens'],
      ingredients: [
        { name: 'Turkey Breast (Deli)', baseAmount: 150, unit: 'g' },
        { name: 'Whole Wheat Wrap', baseAmount: 1, unit: 'piece' },
        { name: 'Hummus', baseAmount: 2, unit: 'tbsp' },
        { name: 'Romaine Lettuce', baseAmount: 50, unit: 'g' }
      ],
      instructions: [
        'Spread hummus across the whole wheat wrap.',
        'Layer sliced turkey breast and lettuce on top.',
        'Roll tightly, slice in half, and serve cold.'
      ]
    },
    {
      id: 'l_moong_dal_khichdi',
      name: 'Moong Dal Khichdi',
      description: 'Comforting, easily digestible split yellow lentil and rice porridge served with spiced raita.',
      prepTime: '20 mins',
      diets: ['veg', 'non'],
      baseCalories: 450,
      macros: { protein: 18, fat: 8, carbs: 76 },
      bullets: ['Moong Dal Khichdi', 'Roasted Papad', 'Mixed Veg Raita'],
      ingredients: [
        { name: 'Split Yellow Moong Dal', baseAmount: 60, unit: 'g' },
        { name: 'Basmati Rice', baseAmount: 60, unit: 'g' },
        { name: 'Low-Fat Yogurt (Raita)', baseAmount: 100, unit: 'g' },
        { name: 'Ghee', baseAmount: 1, unit: 'tsp' }
      ],
      instructions: [
        'Pressure cook rice and moong dal with turmeric and water until mushy.',
        'Add a tempering (tadka) of cumin seeds in warm ghee.',
        'Serve hot with a side of mixed vegetable raita.'
      ]
    },
    {
      id: 'l_soya_chunks',
      name: 'Soya Chunks Masala',
      description: 'Extremely high-protein vegetarian soya chunks curry served with brown rice.',
      prepTime: '18 mins',
      diets: ['veg', 'non'],
      baseCalories: 560,
      macros: { protein: 36, fat: 10, carbs: 82 },
      bullets: ['Soya Chunks Curry', 'Brown Rice', 'Onion Salad'],
      ingredients: [
        { name: 'Soya Chunks (Dry)', baseAmount: 70, unit: 'g' },
        { name: 'Brown Rice (Cooked)', baseAmount: 200, unit: 'g' },
        { name: 'Onion Tomato Curry paste', baseAmount: 80, unit: 'g' },
        { name: 'Olive Oil', baseAmount: 1, unit: 'tsp' }
      ],
      instructions: [
        'Boil soya chunks, squeeze excess water, and sauté in spices.',
        'Simmer in onion-tomato curry base for 10 minutes.',
        'Serve hot with steamed brown rice.'
      ]
    },
    {
      id: 'l_shrimp_salad',
      name: 'Garlic Shrimp Salad',
      description: 'Pan-seared shrimp seasoned with garlic, tossed with avocado and mixed garden greens.',
      prepTime: '15 mins',
      diets: ['non'],
      baseCalories: 510,
      macros: { protein: 35, fat: 16, carbs: 45 },
      bullets: ['Garlic Shrimp', 'Avocado Slices', 'Mixed Greens Salad'],
      ingredients: [
        { name: 'Shrimp (Peeled)', baseAmount: 170, unit: 'g' },
        { name: 'Avocado', baseAmount: 0.5, unit: 'medium' },
        { name: 'Salad Greens', baseAmount: 120, unit: 'g' },
        { name: 'Butter', baseAmount: 1, unit: 'tsp' }
      ],
      instructions: [
        'Sauté shrimp in butter and minced garlic for 4-5 minutes.',
        'Toss mixed greens and avocado slices in lemon vinaigrette.',
        'Top the salad with warm garlic shrimp and serve.'
      ]
    },
    {
      id: 'l_rajma_rice',
      name: 'Spiced Rajma & Rice',
      description: 'Slow-cooked red kidney beans in thick spicy gravy, a North-Indian high-protein staple.',
      prepTime: '20 mins',
      diets: ['veg', 'non'],
      baseCalories: 600,
      macros: { protein: 20, fat: 10, carbs: 92 },
      bullets: ['Rajma Curry', 'Brown Rice', 'Kachumber Salad'],
      ingredients: [
        { name: 'Red Kidney Beans (Boiled)', baseAmount: 200, unit: 'g' },
        { name: 'Basmati Brown Rice', baseAmount: 220, unit: 'g' },
        { name: 'Onions & Tomatoes', baseAmount: 80, unit: 'g' },
        { name: 'Spices & Coriander', baseAmount: 10, unit: 'g' }
      ],
      instructions: [
        'Cook onion, ginger, garlic, and tomato paste until oil separates.',
        'Add kidney beans and simmer until gravy is thick.',
        'Serve hot over brown basmati rice with cucumber salad.'
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
    },
    {
      id: 's_roasted_chana',
      name: 'Spicy Roasted Chana',
      description: 'Crunchy dry roasted chickpeas seasoned with turmeric, chili powder, and black salt.',
      prepTime: '3 mins',
      diets: ['veg', 'non'],
      baseCalories: 280,
      macros: { protein: 15, fat: 6, carbs: 48 },
      bullets: ['Roasted Chickpeas', 'Spicy Masala Mix'],
      ingredients: [
        { name: 'Roasted Chickpeas (Chana)', baseAmount: 80, unit: 'g' },
        { name: 'Chili Powder & Salt', baseAmount: 5, unit: 'g' }
      ],
      instructions: [
        'Toss dry-roasted chickpeas with simple spices in a bowl.',
        'Serve immediately as a high-fiber, crunchy afternoon snack.'
      ]
    },
    {
      id: 's_whey_shake',
      name: 'Whey Protein Shake',
      description: 'Fast-digesting whey protein isolate blended with ice-cold skimmed milk.',
      prepTime: '2 mins',
      diets: ['veg', 'non'],
      baseCalories: 250,
      macros: { protein: 30, fat: 3, carbs: 12 },
      bullets: ['Whey Protein Isolate', 'Skimmed Milk'],
      ingredients: [
        { name: 'Whey Protein Powder', baseAmount: 32, unit: 'g' },
        { name: 'Skimmed Milk', baseAmount: 250, unit: 'ml' }
      ],
      instructions: [
        'Add skimmed milk and a scoop of whey protein powder to a shaker bottle.',
        'Shake vigorously for 30 seconds until completely smooth.',
        'Drink immediately.'
      ]
    },
    {
      id: 's_peanut_butter_apple',
      name: 'Apple & Peanut Butter',
      description: 'Crispy apple slices served with a side of rich organic peanut butter.',
      prepTime: '3 mins',
      diets: ['veg', 'non'],
      baseCalories: 290,
      macros: { protein: 7, fat: 16, carbs: 32 },
      bullets: ['Apple Slices', 'Organic Peanut Butter'],
      ingredients: [
        { name: 'Apple (Fuji or Gala)', baseAmount: 1, unit: 'large' },
        { name: 'Peanut Butter', baseAmount: 2, unit: 'tbsp' }
      ],
      instructions: [
        'Core and slice a fresh apple.',
        'Portion out peanut butter.',
        'Dip apple slices into peanut butter and enjoy.'
      ]
    },
    {
      id: 's_hummus_carrots',
      name: 'Hummus & Baby Carrots',
      description: 'Spiced garlic chickpeas hummus served with carrot and cucumber dipping sticks.',
      prepTime: '5 mins',
      diets: ['veg', 'non'],
      baseCalories: 240,
      macros: { protein: 8, fat: 12, carbs: 36 },
      bullets: ['Creamy Hummus', 'Baby Carrots', 'Cucumber Sticks'],
      ingredients: [
        { name: 'Hummus (Store-Bought)', baseAmount: 80, unit: 'g' },
        { name: 'Baby Carrots', baseAmount: 100, unit: 'g' },
        { name: 'Cucumber', baseAmount: 1, unit: 'small' }
      ],
      instructions: [
        'Cut cucumbers into clean sticks.',
        'Plate hummus in a small bowl alongside carrots and cucumber.',
        'Dip veggies in hummus.'
      ]
    },
    {
      id: 's_cottage_cheese',
      name: 'Cottage Cheese & Pineapple',
      description: 'Fresh paneer or cottage cheese chunks mixed with sweet diced pineapples.',
      prepTime: '3 mins',
      diets: ['veg', 'non'],
      baseCalories: 260,
      macros: { protein: 20, fat: 5, carbs: 22 },
      bullets: ['Paneer / Cottage Cheese', 'Pineapple Chunks'],
      ingredients: [
        { name: 'Low-Fat Cottage Cheese (or Paneer)', baseAmount: 150, unit: 'g' },
        { name: 'Pineapple Chunks (Fresh)', baseAmount: 100, unit: 'g' }
      ],
      instructions: [
        'Place cottage cheese or fresh paneer cubes in a bowl.',
        'Top with juicy pineapple chunks.',
        'Mix gently and eat chilled.'
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
    },
    {
      id: 'd_tofu_stir_fry',
      name: 'Tofu Vegetable Stir-Fry',
      description: 'Crispy tofu cubes stir-fried with vegetables and whole wheat noodles in sesame glaze.',
      prepTime: '15 mins',
      diets: ['veg', 'non'],
      baseCalories: 680,
      macros: { protein: 28, fat: 18, carbs: 88 },
      bullets: ['Stir-Fry Tofu cubes', 'Whole Wheat Noodles', 'Sesame Ginger Glaze'],
      ingredients: [
        { name: 'Tofu', baseAmount: 150, unit: 'g' },
        { name: 'Whole Wheat Noodles', baseAmount: 100, unit: 'g' },
        { name: 'Broccoli & Bell Peppers', baseAmount: 120, unit: 'g' },
        { name: 'Sesame Ginger Sauce', baseAmount: 2, unit: 'tbsp' }
      ],
      instructions: [
        'Cook whole wheat noodles in boiling water, drain, and set aside.',
        'Sauté tofu and mixed veggies in a hot wok with oil.',
        'Toss noodles, tofu, and glaze sauce together for 3 minutes.'
      ]
    },
    {
      id: 'd_paneer_bhurji',
      name: 'Spiced Paneer Bhurji',
      description: 'Scrambled paneer cooked in a tomato-onion masala base, served with whole wheat rotis.',
      prepTime: '15 mins',
      diets: ['veg', 'non'],
      baseCalories: 650,
      macros: { protein: 30, fat: 26, carbs: 72 },
      bullets: ['Spicy Paneer Bhurji', '2 Whole Wheat Rotis', 'Mixed Veg Salad'],
      ingredients: [
        { name: 'Paneer (Crumble)', baseAmount: 160, unit: 'g' },
        { name: 'Whole Wheat Roti', baseAmount: 2, unit: 'pieces' },
        { name: 'Green Peas', baseAmount: 40, unit: 'g' },
        { name: 'Ghee', baseAmount: 1.5, unit: 'tsp' }
      ],
      instructions: [
        'Crumble fresh paneer and cook with peas, onions, tomatoes, and spices.',
        'Prepare whole wheat rotis.',
        'Serve bhurji hot with fresh salad and rotis.'
      ]
    },
    {
      id: 'd_salmon_sweet_potato',
      name: 'Baked Salmon & Mashed Potato',
      description: 'Seasoned baked salmon fillet alongside light mashed sweet potatoes and asparagus.',
      prepTime: '20 mins',
      diets: ['non'],
      baseCalories: 690,
      macros: { protein: 40, fat: 22, carbs: 48 },
      bullets: ['Baked Salmon Fillet', 'Mashed Sweet Potatoes', 'Steamed Asparagus'],
      ingredients: [
        { name: 'Salmon Fillet', baseAmount: 160, unit: 'g' },
        { name: 'Sweet Potatoes (Mashed)', baseAmount: 150, unit: 'g' },
        { name: 'Asparagus', baseAmount: 120, unit: 'g' },
        { name: 'Olive Oil', baseAmount: 1, unit: 'tbsp' }
      ],
      instructions: [
        'Bake salmon fillet for 12-15 minutes at 200°C.',
        'Mash boiled sweet potatoes with salt and black pepper.',
        'Plate baked salmon with mashed sweet potato and asparagus.'
      ]
    },
    {
      id: 'd_chana_pulao',
      name: 'High-Protein Chickpea Pulao',
      description: 'A aromatic brown rice pulao cooked with healthy chickpeas and served with mint cucumber raita.',
      prepTime: '20 mins',
      diets: ['veg', 'non'],
      baseCalories: 610,
      macros: { protein: 22, fat: 14, carbs: 96 },
      bullets: ['Kabuli Chana Pulao', 'Cucumber Mint Raita', 'Roasted Papad'],
      ingredients: [
        { name: 'Basmati Brown Rice', baseAmount: 100, unit: 'g' },
        { name: 'Boiled Chickpeas', baseAmount: 150, unit: 'g' },
        { name: 'Low-Fat Yogurt', baseAmount: 120, unit: 'g' },
        { name: 'Cardamom & Cloves', baseAmount: 2, unit: 'g' }
      ],
      instructions: [
        'Cook brown basmati rice in a pressure cooker with whole spices and chickpeas.',
        'Mix grated cucumber, chopped mint, and salt into yogurt for raita.',
        'Serve pulao hot with cucumber mint raita.'
      ]
    },
    {
      id: 'd_chicken_masala',
      name: 'Chicken Masala & Rice',
      description: 'Slow-cooked chicken breast in aromatic spices and onion-tomato gravy served with brown rice.',
      prepTime: '22 mins',
      diets: ['non'],
      baseCalories: 640,
      macros: { protein: 45, fat: 16, carbs: 72 },
      bullets: ['Chicken Breast Curry', 'Brown Rice', 'Onion Ring Salad'],
      ingredients: [
        { name: 'Chicken Breast', baseAmount: 180, unit: 'g' },
        { name: 'Brown Basmati Rice', baseAmount: 180, unit: 'g' },
        { name: 'Spiced Tomato onion base', baseAmount: 100, unit: 'g' },
        { name: 'Oil', baseAmount: 1, unit: 'tbsp' }
      ],
      instructions: [
        'Cook chicken breast chunks in oil with gravy base until tender.',
        'Prepare brown basmati rice.',
        'Serve chicken curry hot over warm rice.'
      ]
    },
    {
      id: 'd_lentil_soup',
      name: 'Hearty Lentil Soup',
      description: 'Warm thick split lentil soup with root veggies, served with toasted sourdough.',
      prepTime: '15 mins',
      diets: ['veg', 'non'],
      baseCalories: 580,
      macros: { protein: 24, fat: 10, carbs: 78 },
      bullets: ['Mixed Lentil Soup', 'Sourdough Toast Slices'],
      ingredients: [
        { name: 'Yellow & Red Lentils', baseAmount: 100, unit: 'g' },
        { name: 'Sourdough Bread', baseAmount: 2, unit: 'slices' },
        { name: 'Celery & Carrots', baseAmount: 60, unit: 'g' },
        { name: 'Olive Oil', baseAmount: 1, unit: 'tsp' }
      ],
      instructions: [
        'Simmer lentils with celery, carrots, and vegetable broth until cooked.',
        'Blend slightly for a thick texture, and season.',
        'Serve with toasted sourdough bread.'
      ]
    },
    {
      id: 'd_soya_pulao',
      name: 'High-Protein Soya Pulao',
      description: 'Flavorful brown rice pulao loaded with soya chunks and spices, served with fresh raita.',
      prepTime: '18 mins',
      diets: ['veg', 'non'],
      baseCalories: 650,
      macros: { protein: 32, fat: 12, carbs: 85 },
      bullets: ['Soya Chunks Pulao', 'Spiced Cucumber Raita'],
      ingredients: [
        { name: 'Soya Chunks (Dry)', baseAmount: 60, unit: 'g' },
        { name: 'Brown Basmati Rice', baseAmount: 150, unit: 'g' },
        { name: 'Low-Fat Yogurt', baseAmount: 100, unit: 'g' },
        { name: 'Pulao Spices', baseAmount: 5, unit: 'g' }
      ],
      instructions: [
        'Soak soya chunks and squeeze water.',
        'Cook rice, soya chunks, and pulao spices together in a pressure cooker.',
        'Serve hot with a cooling side of cucumber raita.'
      ]
    },
    {
      id: 'd_dal_makhani',
      name: 'Dal Makhani & Roti',
      description: 'Slow-simmered black lentils (dal) cooked with light spices, served with whole wheat garlic roti.',
      prepTime: '22 mins',
      diets: ['veg', 'non'],
      baseCalories: 700,
      macros: { protein: 24, fat: 18, carbs: 94 },
      bullets: ['Black Lentils (Dal)', 'Whole Wheat Garlic Roti', 'Green Salad'],
      ingredients: [
        { name: 'Black Lentils (Boiled)', baseAmount: 180, unit: 'g' },
        { name: 'Whole Wheat Flour (Roti)', baseAmount: 80, unit: 'g' },
        { name: 'Low-Fat Yogurt / Butter', baseAmount: 1, unit: 'tbsp' }
      ],
      instructions: [
        'Simmer black lentils slowly in tomato puree and spices.',
        'Prepare whole wheat flatbread flavored with crushed fresh garlic.',
        'Serve dal hot topped with a dollop of yogurt alongside garlic roti.'
      ]
    }
  ]
};
