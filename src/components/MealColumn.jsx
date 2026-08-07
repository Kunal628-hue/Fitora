import React from 'react';

// Exact macro density database for dynamic calculations per 100g or unit
const INGREDIENT_PROT_MAP = {
  'rolled oats': 16.9 / 100,
  'whey protein powder': 80.0 / 100,
  'fresh blueberries': 0.7 / 100,
  'blueberries': 0.7 / 100,
  'almonds (sliced)': 21.2 / 100,
  'almonds': 21.2 / 100,
  'almond milk': 0.5 / 100,
  'sourdough bread': 4.0,
  'whole wheat bread': 4.5,
  'eggs': 6.3,
  'egg white': 3.6,
  'egg whites': 3.6,
  'avocado': 3.0,
  'peanut butter': 4.0,
  'banana': 1.3,
  'chia seeds': 16.5 / 100,
  'vanilla protein powder': 80.0 / 100,
  'mixed berries': 1.0 / 100,
  'firm tofu': 8.0 / 100,
  'tofu': 8.0 / 100,
  'low-fat paneer': 20.0 / 100,
  'paneer (low-fat)': 20.0 / 100,
  'paneer': 20.0 / 100,
  'firm tofu or paneer': 14.0 / 100,
  'greek yogurt': 10.0 / 100,
  'greek yogurt (plain)': 10.0 / 100,
  'greek yogurt (fat-free)': 10.3 / 100,
  'chicken breast': 31.0 / 100,
  'chicken breast (cooked & shredded)': 31.0 / 100,
  'chicken keema': 20.0 / 100,
  'minced chicken': 20.0 / 100,
  'salmon fillet': 22.0 / 100,
  'salmon': 22.0 / 100,
  'fish fillet': 22.0 / 100,
  'fish': 22.0 / 100,
  'shrimp (peeled)': 20.1 / 100,
  'shrimp': 20.1 / 100,
  'sirloin steak': 27.0 / 100,
  'turkey breast (deli)': 17.0 / 100,
  'smoked turkey breast': 17.0 / 100,
  'brown rice (cooked)': 2.6 / 100,
  'jasmine rice (cooked)': 2.7 / 100,
  'basmati brown rice': 2.6 / 100,
  'basmati rice': 2.6 / 100,
  'quinoa (cooked)': 4.4 / 100,
  'red lentil pasta (dry)': 25.0 / 100,
  'red lentil penne (dry)': 25.0 / 100,
  'split yellow moong dal': 24.0 / 100,
  'moong dal batter': 10.0 / 100,
  'moong dal': 24.0 / 100,
  'sprouted moong': 24.0 / 100,
  'moong sprouts': 24.0 / 100,
  'boiled chickpeas': 8.9 / 100,
  'chana': 8.9 / 100,
  'red kidney beans (boiled)': 8.7 / 100,
  'rajma': 8.7 / 100,
  'soya chunks (dry)': 52.0 / 100,
  'soya chunks': 52.0 / 100,
  'makhana': 9.7 / 100,
  'fox nuts': 9.7 / 100,
  'roti': 3.0,
  'chapati': 3.0,
  'paratha': 4.0,
  'whole wheat paratha': 4.0,
  'broccoli florets': 2.8 / 100,
  'broccoli': 2.8 / 100,
  'asparagus spears': 2.2 / 100,
  'asparagus': 2.2 / 100,
  'spinach': 2.9 / 100,
  'baby spinach': 2.9 / 100,
  'fresh spinach': 2.9 / 100,
};

const getIngredientProteins = (ingredients, totalProtein, scaleFactor) => {
  const scaledTotal = Math.round(totalProtein * scaleFactor);
  let sumBaseProtein = 0;

  const baseProteins = ingredients.map(ing => {
    const name = ing.name.toLowerCase();
    let factor = 0;

    const matchedKey = Object.keys(INGREDIENT_PROT_MAP).find(k => name.includes(k));
    if (matchedKey) {
      factor = INGREDIENT_PROT_MAP[matchedKey];
    } else {
      factor = 0.05;
    }

    const baseP = factor * ing.baseAmount;
    sumBaseProtein += baseP;
    return baseP;
  });

  if (sumBaseProtein > 0) {
    return baseProteins.map(p => Math.round((p / sumBaseProtein) * scaledTotal));
  }

  return ingredients.map(() => Math.round(scaledTotal / ingredients.length));
};

const formatHumanQuantity = (amount, unit, scaleFactor) => {
  if (amount === null || amount === undefined) return '';
  const scaled = amount * scaleFactor;
  const unitLower = (unit || '').toLowerCase().trim();

  if (unitLower === 'g' || unitLower === 'ml') {
    return Math.round(scaled).toString();
  }

  const quarterRounded = Math.round(scaled * 4) / 4;
  const halfRounded = Math.round(scaled * 2) / 2;

  if (Math.abs(scaled - halfRounded) <= 0.15) {
    return halfRounded % 1 === 0 ? halfRounded.toString() : halfRounded.toFixed(1);
  }
  return quarterRounded % 1 === 0 ? quarterRounded.toString() : quarterRounded.toString();
};

/**
 * MealColumn - Sleek Professional Dark Gym Theme
 * Single-line ingredients with strict ellipsis truncation
 */
export default function MealColumn({ 
  slot, 
  meal, 
  targetCalories, 
  isLogged = false,
  onLog,
  onSwap, 
  onViewDetails, 
  t = k => k, 
  translateContent = k => k 
}) {
  if (!meal) return null;

  const slotIcons = {
    breakfast: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4"/>
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
      </svg>
    ),
    lunch: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
        <line x1="6" y1="1" x2="6" y2="4"/>
        <line x1="10" y1="1" x2="10" y2="4"/>
        <line x1="14" y1="1" x2="14" y2="4"/>
      </svg>
    ),
    snack: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 8h1a4 4 0 1 1 0 8h-1"/>
        <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z"/>
        <line x1="6" y1="2" x2="6" y2="4"/>
        <line x1="10" y1="2" x2="10" y2="4"/>
        <line x1="14" y1="2" x2="14" y2="4"/>
      </svg>
    ),
    dinner: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
      </svg>
    )
  };

  const slotTitle = slot === 'snack' ? (t('snackMeal') || 'SNACKS') : (t(slot) || slot).toUpperCase();
  const scaleFactor = targetCalories / (meal.baseCalories || 500);

  const ingredients = meal.ingredients || [];
  const ingredientProteins = getIngredientProteins(ingredients, meal.macros?.protein || 0, scaleFactor);
  const totalMealProtein = ingredientProteins.reduce((acc, p) => acc + p, 0);

  return (
    <div 
      className={`pro-meal-card ${isLogged ? 'logged' : ''}`} 
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '1.25rem',
        minHeight: '410px',
        border: `1px solid ${isLogged ? 'rgba(200, 255, 0, 0.4)' : 'rgba(255, 255, 255, 0.08)'}`,
        borderRadius: '16px',
        background: isLogged 
          ? 'linear-gradient(180deg, rgba(200, 255, 0, 0.06) 0%, rgba(13, 16, 24, 0.95) 100%)' 
          : 'rgba(13, 16, 24, 0.9)',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(12px)',
        position: 'relative',
        transition: 'all 0.25s ease',
      }}
      id={`meal-column-${slot}`}
    >
      <div>
        {/* Header Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem', paddingBottom: '0.8rem', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div 
              style={{ 
                width: '34px', 
                height: '34px', 
                borderRadius: '8px', 
                background: 'rgba(200, 255, 0, 0.08)',
                border: '1px solid rgba(200, 255, 0, 0.2)',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: 'var(--accent-coral)'
              }}
            >
              {slotIcons[slot] || slotIcons.breakfast}
            </div>
            <div>
              <h3 style={{ fontSize: '0.85rem', fontWeight: '800', letterSpacing: '0.08em', color: '#ffffff', textTransform: 'uppercase' }}>
                {slotTitle}
              </h3>
              <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: '600' }}>
                {totalMealProtein}g Protein
              </span>
            </div>
          </div>

          {/* Log Check Button */}
          {onLog && (
            <button
              type="button"
              onClick={onLog}
              title={isLogged ? 'Mark as Not Eaten' : 'Mark as Eaten'}
              style={{
                background: isLogged ? 'rgba(200, 255, 0, 0.18)' : 'rgba(255, 255, 255, 0.05)',
                border: `1px solid ${isLogged ? 'var(--accent-coral)' : 'rgba(255, 255, 255, 0.1)'}`,
                color: isLogged ? 'var(--accent-coral)' : '#94a3b8',
                borderRadius: '6px',
                padding: '0.25rem 0.55rem',
                fontSize: '0.72rem',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                transition: 'all 0.2s ease'
              }}
            >
              {isLogged ? '✓ Logged' : '+ Log'}
            </button>
          )}
        </div>

        {/* Single-Line Ingredients List */}
        <ul style={{ listStyle: 'none', paddingLeft: 0, marginBottom: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {ingredients.map((ing, idx) => {
            const prot = ingredientProteins[idx] || 0;
            const qtyStr = formatHumanQuantity(ing.baseAmount, ing.unit, scaleFactor);
            const unitTrans = ing.unit === 'g' ? 'g' : ing.unit === 'pieces' ? (t('pieces') || 'pcs') : ing.unit;
            const translatedName = translateContent(ing.name);

            return (
              <li 
                key={idx} 
                title={`${qtyStr} ${unitTrans} ${translatedName}`}
                style={{ 
                  fontSize: '0.8rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  gap: '0.4rem', 
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.03)',
                  borderRadius: '8px',
                  padding: '0.45rem 0.65rem',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden'
                }}
              >
                {/* Left Side: Qty + Name strictly on 1 line */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', minWidth: 0, flex: 1, overflow: 'hidden', whiteSpace: 'nowrap' }}>
                  <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--accent-coral)', flexShrink: 0 }} />
                  <span style={{ fontWeight: '700', color: 'var(--accent-coral)', flexShrink: 0 }}>
                    {qtyStr} {unitTrans}
                  </span>
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#e2e8f0', fontWeight: '500' }}>
                    {translatedName}
                  </span>
                </div>

                {/* Right Side: Protein Tag */}
                {prot > 0 && (
                  <span 
                    style={{ 
                      fontSize: '0.68rem', 
                      fontWeight: '700', 
                      color: 'var(--accent-coral)', 
                      background: 'rgba(200, 255, 0, 0.1)',
                      border: '1px solid rgba(200, 255, 0, 0.2)',
                      padding: '0.1rem 0.35rem', 
                      borderRadius: '4px', 
                      whiteSpace: 'nowrap', 
                      flexShrink: 0 
                    }}
                  >
                    {prot}g P
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Footer Details */}
      <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '0.85rem' }}>
        <div 
          style={{ 
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '0.75rem'
          }}
        >
          <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Calories
          </span>
          <span style={{ fontSize: '1.15rem', fontWeight: '900', color: '#ffffff' }}>
            {Math.round(targetCalories)} <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: '600' }}>kcal</span>
          </span>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          <button
            type="button"
            className="pro-action-btn"
            style={{ 
              flex: 1, 
              minHeight: '36px', 
              fontSize: '0.8rem', 
              fontWeight: '700',
              cursor: 'pointer',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#ffffff',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.35rem',
              transition: 'all 0.2s ease'
            }}
            onClick={onViewDetails}
            id={`details-btn-${slot}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="13" height="13" fill="currentColor"><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/></svg>
            {t('recipes') || 'Recipe'}
          </button>
          <button
            type="button"
            className="pro-action-btn secondary"
            style={{ 
              padding: '0 0.7rem', 
              minHeight: '36px', 
              fontSize: '0.8rem', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              cursor: 'pointer',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              color: '#94a3b8',
              borderRadius: '8px',
              transition: 'all 0.2s ease'
            }}
            onClick={onSwap}
            title={t('swapMealBtn') || 'Swap Meal'}
            id={`swap-btn-${slot}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M19 8l-4 4h3c0 3.31-2.69 6-6 6-1.01 0-1.97-.25-2.8-.7l-1.46 1.46C8.97 19.54 10.43 20 12 20c4.42 0 8-3.58 8-8h3l-4-4zM6 12c0-3.31 2.69-6 6-6 1.01 0 1.97.25 2.8.7l1.46-1.46C15.03 4.46 13.57 4 12 4c-4.42 0-8 3.58-8 8H1l4 4 4-4H6z"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}

