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
      diets: ['non'],
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
      name: 'Sprouted Moong Salad',
      description: 'Sprouted green gram mixed with chopped onions, tomatoes, cucumber, lemon juice, and chaat masala.',
      prepTime: '10 mins',
      diets: ['veg', 'non'],
      baseCalories: 400,
      macros: { protein: 28, fat: 11, carbs: 44 },
      bullets: ['Moong Sprouts', 'Cucumber & Tomatoes', 'Lemon & Chaat Masala'],
      ingredients: [
        { name: 'Sprouted Moong', baseAmount: 120, unit: 'g' },
        { name: 'Greek Yogurt', baseAmount: 80, unit: 'g' },
        { name: 'Almonds', baseAmount: 20, unit: 'g' }
      ],
      instructions: [
        'Rinse sprouted moong and transfer to a large mixing bowl.',
        'Add chopped onions, cucumber, tomato, and fresh coriander.',
        'Dress with fresh lemon juice, salt, and spicy chaat masala, then mix well.'
      ]
    },
    {
      id: 'b_tofu_scramble',
      name: 'Spiced Tofu Bhurji Toast',
      description: 'Indian style scrambled tofu cooked with onions, turmeric, spinach, and tomatoes served on whole wheat bread.',
      prepTime: '12 mins',
      diets: ['veg', 'non'],
      baseCalories: 420,
      macros: { protein: 25, fat: 14, carbs: 48 },
      bullets: ['Tofu Bhurji', 'Sautéed Spinach', 'Whole Wheat Toast'],
      ingredients: [
        { name: 'Firm Tofu', baseAmount: 150, unit: 'g' },
        { name: 'Spinach', baseAmount: 50, unit: 'g' },
        { name: 'Whole Wheat Bread', baseAmount: 1, unit: 'slice' },
        { name: 'Olive Oil', baseAmount: 1, unit: 'tsp' },
        { name: 'Turmeric & Pepper', baseAmount: 1, unit: 'pinch' }
      ],
      instructions: [
        'Crumble tofu in a pan with olive oil, chopped onions, turmeric, and spices.',
        'Sauté for 5 minutes, then add spinach and tomatoes until wilted.',
        'Serve hot alongside toasted whole wheat bread.'
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
      name: 'Egg White Omelette & Bread',
      description: 'Fluffy Indian egg white omelette made with green chillies and coriander, served with toasted whole wheat bread.',
      prepTime: '10 mins',
      diets: ['non'],
      baseCalories: 460,
      macros: { protein: 32, fat: 8, carbs: 65 },
      bullets: ['Egg White Omelette', 'Whole Wheat Toast', 'Coriander & Chillies'],
      ingredients: [
        { name: 'Whole Wheat Bread', baseAmount: 2, unit: 'slices' },
        { name: 'Egg Whites', baseAmount: 6, unit: 'large' },
        { name: 'Onions', baseAmount: 30, unit: 'g' },
        { name: 'Green Chillies', baseAmount: 5, unit: 'g' }
      ],
      instructions: [
        'Whisk egg whites with chopped onions, coriander, green chillies, and salt.',
        'Cook on a non-stick pan with 1 tsp oil/ghee until cooked through.',
        'Serve hot with toasted whole wheat bread.'
      ]
    },
    {
      id: 'b_idli_sambhar',
      name: 'High-Protein Oats Idli & Sambhar',
      description: 'Healthy steamed oats and semolina idlis served with hot mixed-vegetable lentil sambhar.',
      prepTime: '15 mins',
      diets: ['veg', 'non'],
      baseCalories: 390,
      macros: { protein: 18, fat: 6, carbs: 64 },
      bullets: ['3 Oats Idlis', 'Veggie Sambhar', 'Coconut Chutney'],
      ingredients: [
        { name: 'Rolled Oats', baseAmount: 60, unit: 'g' },
        { name: 'Moong Dal', baseAmount: 40, unit: 'g' },
        { name: 'Low-Fat Yogurt', baseAmount: 50, unit: 'g' }
      ],
      instructions: [
        'Dry roast oats and grind to powder, mix with yogurt and water to make a batter.',
        'Steam batter in an idli plate for 10-12 minutes.',
        'Serve hot idlis with freshly made mixed-vegetable sambhar.'
      ]
    },
    {
      id: 'b_upma_paneer',
      name: 'High-Protein Oats Paneer Upma',
      description: 'Savory roasted oats and semolina upma loaded with veggies and cubes of fresh paneer.',
      prepTime: '12 mins',
      diets: ['veg', 'non'],
      baseCalories: 410,
      macros: { protein: 20, fat: 12, carbs: 55 },
      bullets: ['Paneer Oats Upma', 'Sautéed Mixed Veggies', 'Lemon Squeeze'],
      ingredients: [
        { name: 'Rolled Oats', baseAmount: 60, unit: 'g' },
        { name: 'Low-Fat Paneer', baseAmount: 80, unit: 'g' },
        { name: 'Ghee', baseAmount: 1, unit: 'tsp' }
      ],
      instructions: [
        'Roast oats and set aside. Sauté mustard seeds, curry leaves, onions, and veggies in ghee.',
        'Add water and bring to a boil, then slowly stir in roasted oats.',
        'Fold in paneer cubes, cook for 3 minutes, and serve hot.'
      ]
    },
    {
      id: 'b_egg_bhurji_toast',
      name: 'Double Egg Bhurji & Toast',
      description: 'Spiced Indian scrambled eggs cooked with tomatoes, onions, and green chillies, served with toast.',
      prepTime: '10 mins',
      diets: ['non'],
      baseCalories: 450,
      macros: { protein: 24, fat: 18, carbs: 36 },
      bullets: ['2-Egg Bhurji', 'Whole Wheat Toast', 'Chopped Coriander'],
      ingredients: [
        { name: 'Whole Wheat Bread', baseAmount: 2, unit: 'slices' },
        { name: 'Eggs', baseAmount: 2, unit: 'large' },
        { name: 'Ghee', baseAmount: 1, unit: 'tsp' }
      ],
      instructions: [
        'Sauté onions, tomatoes, and green chillies in ghee.',
        'Whisk eggs and pour into the pan, scrambling until fully cooked.',
        'Serve hot alongside toasted whole wheat bread.'
      ]
    },
    {
      id: 'b_chicken_keema_toast',
      name: 'Chicken Keema Toast',
      description: 'Minced chicken breast cooked in home-style spices, served on toasted whole wheat bread.',
      prepTime: '15 mins',
      diets: ['non'],
      baseCalories: 470,
      macros: { protein: 32, fat: 12, carbs: 40 },
      bullets: ['Chicken Keema', '2 Slices Whole Wheat Toast'],
      ingredients: [
        { name: 'Whole Wheat Bread', baseAmount: 2, unit: 'slices' },
        { name: 'Chicken Keema', baseAmount: 120, unit: 'g' },
        { name: 'Ghee', baseAmount: 1, unit: 'tsp' }
      ],
      instructions: [
        'Cook minced chicken with ginger-garlic paste, spices, and onions until tender.',
        'Toast whole wheat bread until crisp.',
        'Spoon hot chicken keema on the toast and serve.'
      ]
    },
    {
      id: 'b_egg_white_chilla',
      name: 'Egg White Moong Dal Chilla',
      description: 'Traditional moong dal lentil pancake reinforced with fluffy whipped egg whites.',
      prepTime: '12 mins',
      diets: ['non'],
      baseCalories: 420,
      macros: { protein: 26, fat: 8, carbs: 54 },
      bullets: ['Egg White Chilla', 'Mint Coriander Chutney'],
      ingredients: [
        { name: 'Moong Dal Batter', baseAmount: 100, unit: 'ml' },
        { name: 'Egg Whites', baseAmount: 4, unit: 'large' },
        { name: 'Ghee', baseAmount: 1, unit: 'tsp' }
      ],
      instructions: [
        'Whisk egg whites into moong dal batter with salt, pepper, and coriander.',
        'Pour onto a hot tawa, spread in a circle, and drizzle ghee.',
        'Cook until golden brown on both sides and serve hot with chutney.'
      ]
    },
    {
      id: 'b_scrambled_eggs_roti',
      name: 'Masala Scrambled Eggs & Roti',
      description: 'Double eggs scrambled with Indian spices, served with fresh whole wheat roti.',
      prepTime: '10 mins',
      diets: ['non'],
      baseCalories: 430,
      macros: { protein: 22, fat: 16, carbs: 42 },
      bullets: ['Masala Scrambled Eggs', '2 Whole Wheat Rotis'],
      ingredients: [
        { name: 'Eggs', baseAmount: 2, unit: 'large' },
        { name: 'Roti', baseAmount: 2, unit: 'pieces' },
        { name: 'Ghee', baseAmount: 1, unit: 'tsp' }
      ],
      instructions: [
        'Scramble eggs in a pan with ghee, cumin seeds, onions, and turmeric.',
        'Prepare warm fresh whole wheat rotis on a tawa.',
        'Serve hot eggs folded inside rotis.'
      ]
    },
    {
      id: 'b_boiled_eggs_chana',
      name: 'Boiled Eggs & Chickpea Chaat',
      description: 'Hard-boiled egg halves served alongside a tangy, spiced boiled chickpea salad.',
      prepTime: '10 mins',
      diets: ['non'],
      baseCalories: 440,
      macros: { protein: 25, fat: 14, carbs: 48 },
      bullets: ['3 Hard-Boiled Eggs', 'Spiced Chickpea Salad'],
      ingredients: [
        { name: 'Eggs', baseAmount: 3, unit: 'large' },
        { name: 'Chana', baseAmount: 100, unit: 'g' }
      ],
      instructions: [
        'Boil eggs for 9 minutes, peel and slice in halves.',
        'Mix boiled chickpeas (chana) with chopped onions, tomatoes, chaat masala, and lemon juice.',
        'Serve eggs alongside chickpea salad.'
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
      name: 'Tandoori Chicken & Rice',
      description: 'High-protein tandoori chicken breast served with cumin-flavored jeera brown rice and green beans.',
      prepTime: '20 mins',
      diets: ['non'],
      baseCalories: 480,
      macros: { protein: 42, fat: 12, carbs: 51 },
      bullets: ['Tandoori Chicken', 'Jeera Brown Rice', 'Sautéed Green Beans'],
      ingredients: [
        { name: 'Chicken Breast', baseAmount: 160, unit: 'g' },
        { name: 'Brown Rice (Cooked)', baseAmount: 180, unit: 'g' },
        { name: 'Olive Oil', baseAmount: 1, unit: 'tsp' }
      ],
      instructions: [
        'Marinate chicken breast in lemon juice, yogurt, and tandoori spices, then grill.',
        'Sauté green beans in a small skillet with a drop of olive oil.',
        'Serve hot with warm jeera brown rice.'
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
      name: 'Masala Fish & Brown Rice',
      description: 'Spiced pan-seared fish fillet cooked in a light home-style coconut tomato gravy, served with basmati brown rice.',
      prepTime: '18 mins',
      diets: ['non'],
      baseCalories: 550,
      macros: { protein: 38, fat: 14, carbs: 68 },
      bullets: ['Masala Fish Fillet', 'Basmati Brown Rice', 'Sautéed Spinach'],
      ingredients: [
        { name: 'Fish Fillet', baseAmount: 150, unit: 'g' },
        { name: 'Basmati Brown Rice', baseAmount: 180, unit: 'g' },
        { name: 'Fresh Spinach', baseAmount: 100, unit: 'g' },
        { name: 'Olive Oil', baseAmount: 1, unit: 'tbsp' }
      ],
      instructions: [
        'Rub fish fillet with ginger-garlic paste, turmeric, and red chili, then pan-sear in oil.',
        'Sauté spinach with garlic in a separate pan.',
        'Serve fish masala hot alongside cooked basmati brown rice.'
      ]
    },
    {
      id: 'l_lentil_buddha',
      name: 'Dal Tadka & Steamed Rice',
      description: 'Yellow lentils tempered with cumin, garlic, and ghee, served with brown rice and subzi.',
      prepTime: '20 mins',
      diets: ['veg', 'non'],
      baseCalories: 600,
      macros: { protein: 25, fat: 15, carbs: 91 },
      bullets: ['Dal Tadka', 'Brown Rice', 'Sautéed Veggies'],
      ingredients: [
        { name: 'Split Yellow Moong Dal', baseAmount: 100, unit: 'g' },
        { name: 'Brown Rice (Cooked)', baseAmount: 180, unit: 'g' },
        { name: 'Ghee', baseAmount: 1, unit: 'tsp' }
      ],
      instructions: [
        'Pressure cook yellow lentils with turmeric and salt.',
        'Prepare a tadka of garlic, cumin seeds, and red chilies in warm ghee.',
        'Mix tadka into the dal and serve hot with brown rice.'
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
      name: 'Spiced Chicken Keema Roll',
      description: 'Minced chicken breast cooked with Indian spices and wrapped in a whole wheat roti with fresh onion rings.',
      prepTime: '15 mins',
      diets: ['non'],
      baseCalories: 490,
      macros: { protein: 35, fat: 13, carbs: 58 },
      bullets: ['Chicken Keema', 'Whole Wheat Roti Wrap', 'Onion Rings & Mint chutney'],
      ingredients: [
        { name: 'Chicken Keema', baseAmount: 150, unit: 'g' },
        { name: 'Roti', baseAmount: 2, unit: 'pieces' },
        { name: 'Onions', baseAmount: 30, unit: 'g' }
      ],
      instructions: [
        'Sauté minced chicken (keema) with cumin, onions, ginger-garlic, and spices until cooked.',
        'Warm the whole wheat rotis on a tawa.',
        'Place chicken keema in the middle, top with onion slices, roll tightly and serve.'
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
      name: 'Garlic Shrimp Masala & Rice',
      description: 'Pan-seared shrimp seasoned with mustard seeds, curry leaves, and garlic, served with brown rice.',
      prepTime: '15 mins',
      diets: ['non'],
      baseCalories: 510,
      macros: { protein: 35, fat: 16, carbs: 45 },
      bullets: ['Garlic Shrimp Masala', 'Basmati Brown Rice', 'Kachumber Salad'],
      ingredients: [
        { name: 'Shrimp', baseAmount: 170, unit: 'g' },
        { name: 'Basmati Brown Rice', baseAmount: 150, unit: 'g' },
        { name: 'Olive Oil', baseAmount: 1, unit: 'tsp' }
      ],
      instructions: [
        'Sauté shrimp in a pan with ghee/oil, mustard seeds, curry leaves, ginger, and garlic.',
        'Cook until shrimp turns pink and tender.',
        'Serve hot with a side of basmati brown rice.'
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
    },
    {
      id: 'l_chicken_pulao',
      name: 'Spiced Chicken Pulao',
      description: 'Aromatic basmati brown rice cooked with chicken breast chunks, warm spices, and served with cucumber raita.',
      prepTime: '20 mins',
      diets: ['non'],
      baseCalories: 540,
      macros: { protein: 38, fat: 12, carbs: 70 },
      bullets: ['Chicken Pulao', 'Cucumber Raita', 'Roasted Papad'],
      ingredients: [
        { name: 'Chicken Breast', baseAmount: 150, unit: 'g' },
        { name: 'Basmati Brown Rice', baseAmount: 150, unit: 'g' },
        { name: 'Low-Fat Yogurt', baseAmount: 100, unit: 'g' }
      ],
      instructions: [
        'Sauté chicken breast cubes with onions, tomatoes, and pulao spices.',
        'Add soaked brown rice and water, and pressure cook for 2 whistles.',
        'Serve hot pulao with a side of refreshing cucumber raita.'
      ]
    },
    {
      id: 'l_egg_curry_rice',
      name: 'Boiled Egg Curry & Rice',
      description: 'Hard-boiled eggs cooked in a flavorful home-style onion-tomato gravy, served with basmati brown rice.',
      prepTime: '20 mins',
      diets: ['non'],
      baseCalories: 530,
      macros: { protein: 26, fat: 18, carbs: 66 },
      bullets: ['Egg Curry', 'Basmati Brown Rice', 'Kachumber Salad'],
      ingredients: [
        { name: 'Eggs', baseAmount: 3, unit: 'large' },
        { name: 'Basmati Brown Rice', baseAmount: 150, unit: 'g' }
      ],
      instructions: [
        'Boil and peel eggs, slice in halves, and sauté with turmeric.',
        'Simmer the eggs in spiced onion-tomato gravy for 10 minutes.',
        'Serve hot egg curry with steamed brown rice.'
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
      name: 'Roasted Spicy Makhana',
      description: 'Crisp roasted fox nuts seasoned with turmeric, rock salt, and black pepper.',
      prepTime: '5 mins',
      diets: ['veg', 'non'],
      baseCalories: 240,
      macros: { protein: 8, fat: 12, carbs: 36 },
      bullets: ['Roasted Fox Nuts', 'Spicy Masala Seasoning'],
      ingredients: [
        { name: 'Fox Nuts', baseAmount: 80, unit: 'g' },
        { name: 'Ghee', baseAmount: 1, unit: 'tsp' }
      ],
      instructions: [
        'Heat 1 tsp ghee in a pan on low flame.',
        'Add fox nuts (makhana) and roast for 4-5 minutes until crunchy.',
        'Toss with a pinch of turmeric, salt, and pepper, and serve.'
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
      name: 'Palak Paneer & Roti',
      description: 'Paneer cubes simmered in a spiced spinach puree, served with whole wheat rotis.',
      prepTime: '15 mins',
      diets: ['veg', 'non'],
      baseCalories: 800,
      macros: { protein: 42, fat: 24, carbs: 104 },
      bullets: ['Palak Paneer', '3 Whole Wheat Rotis', 'Kachumber Salad'],
      ingredients: [
        { name: 'Paneer', baseAmount: 150, unit: 'g' },
        { name: 'Spinach', baseAmount: 200, unit: 'g' },
        { name: 'Roti', baseAmount: 3, unit: 'pieces' }
      ],
      instructions: [
        'Blanch and puree fresh spinach leaves.',
        'Cook puree with garlic, ginger, onions, tomatoes, and spices.',
        'Add paneer cubes and simmer. Serve hot with whole wheat rotis.'
      ]
    },
    {
      id: 'd_beef_veggies',
      name: 'Tariwala Egg Curry & Roti',
      description: 'Home-style Indian egg curry made with hard-boiled eggs in a spicy onion-tomato gravy, served with rotis.',
      prepTime: '20 mins',
      diets: ['non'],
      baseCalories: 720,
      macros: { protein: 50, fat: 32, carbs: 58 },
      bullets: ['Tariwala Egg Curry', '3 Whole Wheat Rotis', 'Onion Ring Salad'],
      ingredients: [
        { name: 'Eggs', baseAmount: 4, unit: 'large' },
        { name: 'Roti', baseAmount: 3, unit: 'pieces' },
        { name: 'Ghee', baseAmount: 1.5, unit: 'tsp' }
      ],
      instructions: [
        'Boil, peel, and lightly fry the eggs in ghee with a pinch of turmeric.',
        'Prepare a spicy gravy with onions, tomatoes, ginger, garlic, and garam masala.',
        'Simmer the eggs in the gravy for 5-7 minutes. Serve hot with rotis.'
      ]
    },
    {
      id: 'd_tofu_stir_fry',
      name: 'Tofu Matar Masala & Rice',
      description: 'Tofu cubes and green peas cooked in a rich spiced tomato gravy, served with basmati rice.',
      prepTime: '15 mins',
      diets: ['veg', 'non'],
      baseCalories: 680,
      macros: { protein: 28, fat: 18, carbs: 88 },
      bullets: ['Tofu Matar Curry', 'Basmati Rice', 'Cucumber Salad'],
      ingredients: [
        { name: 'Tofu', baseAmount: 150, unit: 'g' },
        { name: 'Basmati Rice', baseAmount: 150, unit: 'g' },
        { name: 'Olive Oil', baseAmount: 1, unit: 'tsp' }
      ],
      instructions: [
        'Sauté tofu cubes in a pan until lightly golden.',
        'Prepare a masala base with onion, tomato, ginger-garlic, and green peas.',
        'Add tofu cubes and simmer for 5 minutes. Serve hot with steamed basmati rice.'
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
      name: 'Tandoori Fish Tikka & Salad',
      description: 'Fish fillets marinated in spiced yogurt and grilled, served with a fresh kachumber salad.',
      prepTime: '20 mins',
      diets: ['non'],
      baseCalories: 690,
      macros: { protein: 40, fat: 22, carbs: 48 },
      bullets: ['Tandoori Fish Tikka', 'Kachumber Salad', 'Mint Yogurt Chutney'],
      ingredients: [
        { name: 'Fish Fillet', baseAmount: 180, unit: 'g' },
        { name: 'Greek Yogurt', baseAmount: 50, unit: 'g' },
        { name: 'Olive Oil', baseAmount: 1, unit: 'tbsp' }
      ],
      instructions: [
        'Marinate fish fillet in thick yogurt, tandoori masala, lemon juice, and ginger-garlic paste.',
        'Grill or bake at 200°C for 12-15 minutes.',
        'Serve hot with a side of kachumber salad and mint chutney.'
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
      name: 'Indian Lentil Shorba & Roti',
      description: 'A comforting, thick spiced yellow lentil soup served with toasted whole wheat rotis.',
      prepTime: '15 mins',
      diets: ['veg', 'non'],
      baseCalories: 580,
      macros: { protein: 24, fat: 10, carbs: 78 },
      bullets: ['Yellow Lentil Shorba', '2 Toasted Rotis', 'Lemon Wedges'],
      ingredients: [
        { name: 'Moong Dal', baseAmount: 100, unit: 'g' },
        { name: 'Roti', baseAmount: 2, unit: 'pieces' },
        { name: 'Ghee', baseAmount: 1, unit: 'tsp' }
      ],
      instructions: [
        'Boil yellow moong dal with turmeric and ginger.',
        'Temper with cumin seeds, garlic, and a touch of red chili in ghee.',
        'Squeeze in fresh lemon juice and serve with toasted rotis.'
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
    },
    {
      id: 'd_chicken_keema_roti',
      name: 'Chicken Keema Masala & Roti',
      description: 'Minced chicken breast cooked in aromatic spices, served with whole wheat rotis.',
      prepTime: '20 mins',
      diets: ['non'],
      baseCalories: 660,
      macros: { protein: 42, fat: 16, carbs: 68 },
      bullets: ['Chicken Keema Masala', '3 Whole Wheat Rotis', 'Kachumber Salad'],
      ingredients: [
        { name: 'Chicken Keema', baseAmount: 180, unit: 'g' },
        { name: 'Roti', baseAmount: 3, unit: 'pieces' }
      ],
      instructions: [
        'Sauté onions, tomatoes, and ginger-garlic with minced chicken (keema).',
        'Add spice powders and simmer until chicken is fully tender.',
        'Serve hot with freshly prepared whole wheat rotis.'
      ]
    },
    {
      id: 'd_fish_curry_rice',
      name: 'Goan Fish Curry & Rice',
      description: 'Traditional coastal fish curry made with coconut milk and mild spices, served with basmati brown rice.',
      prepTime: '22 mins',
      diets: ['non'],
      baseCalories: 680,
      macros: { protein: 38, fat: 20, carbs: 74 },
      bullets: ['Goan Fish Curry', 'Basmati Brown Rice', 'Onion Salad'],
      ingredients: [
        { name: 'Fish Fillet', baseAmount: 160, unit: 'g' },
        { name: 'Basmati Brown Rice', baseAmount: 180, unit: 'g' }
      ],
      instructions: [
        'Simmer fish fillet chunks in a coconut milk and tomato-onion spice gravy.',
        'Prepare brown basmati rice.',
        'Serve fish curry piping hot over cooked basmati brown rice.'
      ]
    },
    {
      id: 'd_egg_bhurji_roti',
      name: 'Double Egg Bhurji & Roti',
      description: 'Indian scrambled eggs seasoned with garam masala, onions, and chillies, served with rotis.',
      prepTime: '15 mins',
      diets: ['non'],
      baseCalories: 630,
      macros: { protein: 26, fat: 22, carbs: 64 },
      bullets: ['Spicy Egg Bhurji', '3 Whole Wheat Rotis', 'Cucumber Slices'],
      ingredients: [
        { name: 'Eggs', baseAmount: 3, unit: 'large' },
        { name: 'Roti', baseAmount: 3, unit: 'pieces' },
        { name: 'Ghee', baseAmount: 1.5, unit: 'tsp' }
      ],
      instructions: [
        'Sauté onions, chillies, and tomatoes in ghee.',
        'Add eggs and scramble until done. Season with coriander.',
        'Serve hot egg bhurji with freshly rolled whole wheat rotis.'
      ]
    },
    {
      id: 'd_chicken_biryani',
      name: 'Healthy Chicken Biryani',
      description: 'Lean chicken breast cooked with aromatic basmati rice and biryani spices, served with spiced raita.',
      prepTime: '25 mins',
      diets: ['non'],
      baseCalories: 710,
      macros: { protein: 44, fat: 14, carbs: 88 },
      bullets: ['Chicken Biryani', 'Mixed Raita', 'Fresh Mint & Coriander'],
      ingredients: [
        { name: 'Chicken Breast', baseAmount: 180, unit: 'g' },
        { name: 'Basmati Rice', baseAmount: 150, unit: 'g' },
        { name: 'Low-Fat Yogurt', baseAmount: 80, unit: 'g' }
      ],
      instructions: [
        'Marinate chicken in yogurt and biryani spices, then sauté.',
        'Layer chicken with partially cooked basmati rice and steam (dum) for 15 minutes.',
        'Serve hot with a side of mixed vegetable raita.'
      ]
    }
  ]
};
