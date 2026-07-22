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
  'sourdough bread': 4.0, // per slice
  'whole wheat bread': 4.5, // per slice
  'eggs': 6.3, // per large egg
  'egg white': 3.6, // per egg white
  'egg whites': 3.6,
  'avocado': 3.0, // per medium
  'peanut butter': 4.0, // per tbsp
  'banana': 1.3, // per medium
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
  'roti': 3.0, // per piece
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

// Calculates scaled protein for each ingredient and normalizes to match target
const getIngredientProteins = (ingredients, totalProtein, scaleFactor) => {
  const scaledTotal = Math.round(totalProtein * scaleFactor);
  let sumBaseProtein = 0;

  const baseProteins = ingredients.map(ing => {
    const name = ing.name.toLowerCase();
    let factor = 0;

    // Substring lookup
    const matchedKey = Object.keys(INGREDIENT_PROT_MAP).find(k => name.includes(k));
    if (matchedKey) {
      factor = INGREDIENT_PROT_MAP[matchedKey];
    } else {
      factor = 0.05; // Fallback 5% protein by weight
    }

    // Multiply factor by base amount to get base protein weight
    const baseP = factor * ing.baseAmount;
    sumBaseProtein += baseP;
    return baseP;
  });

  if (sumBaseProtein > 0) {
    return baseProteins.map(p => Math.round((p / sumBaseProtein) * scaledTotal));
  }

  // Fallback equal split
  return ingredients.map(() => Math.round(scaledTotal / ingredients.length));
};

/**
 * MealColumn - Renders the vertical meal slot columns matching Design 2.
 * Shows scaled ingredient quantities and accurate ingredient-level macros directly.
 */
export default function MealColumn({ slot, meal, targetCalories, onSwap, onViewDetails }) {
  if (!meal) return null;

  const icons = {
    breakfast: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor" style={{ color: '#ffb74d' }}><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 0 0-1.41 0c-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 0 0-1.41 0c-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41l-1.06-1.06zm-12.37 2.47c.39.39 1.03.39 1.41 0l1.06-1.06c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41zm12.37-14.84c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41l-1.06-1.06c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06z"/></svg>
    ),
    lunch: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor" style={{ color: '#4fc3f7' }}><path d="M11 9H9V2H7v7H5V2H3v7c0 2.21 1.79 4 4 4v9h2v-9c2.21 0 4-1.79 4-4V2h-2v7zm10-5c0-1.1-.9-2-2-2h-3v12h3c1.1 0 2-.9 2-2V4zm-5 18h2v-6h-2v6z"/></svg>
    ),
    snack: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor" style={{ color: '#a1887f' }}><path d="M20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.11 0 2-.89 2-2V5c0-1.11-.89-2-2-2zm0 5h-2V5h2v3zM4 19h16v2H4v-2z"/></svg>
    ),
    dinner: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor" style={{ color: '#b0bec5' }}><path d="M12.3 22h-.1c-5.5 0-10-4.5-10-10 0-4.7 3.3-8.8 8-9.8.5-.1 1 .3.9.8-.1.4-.4.8-.8.9-3.3 1.1-5.6 4.3-5.6 7.9 0 4.1 3.4 7.5 7.5 7.5 3.6 0 6.8-2.3 7.9-5.6.1-.4.5-.7.9-.8.5-.1.9.4.8.9-.9 4.8-5 8.1-9.7 8.2z"/></svg>
    ),
  };

  const displaySlotName = slot === 'snack' ? 'SNACKS' : slot.toUpperCase();
  const scaleFactor = targetCalories / (meal.baseCalories || 500);

  const formatQuantity = (amount) => {
    if (amount === null || amount === undefined) return '';
    const scaled = amount * scaleFactor;
    if (scaled % 1 === 0) return scaled.toString();
    if (Math.abs(scaled - Math.round(scaled)) < 0.05) {
      return Math.round(scaled).toString();
    }
    return scaled.toFixed(1);
  };

  const ingredients = meal.ingredients || [];
  const ingredientProteins = getIngredientProteins(ingredients, meal.macros?.protein || 0, scaleFactor);

  return (
    <div 
      className="glass-panel" 
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '1.5rem',
        minHeight: '400px',
        border: '1px solid var(--glass-border)',
        borderRadius: '16px',
        background: 'rgba(20, 22, 30, 0.7)',
        position: 'relative'
      }}
      id={`meal-column-${slot}`}
    >
      <div>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>
            {displaySlotName}
          </h3>
          <span style={{ display: 'flex', alignItems: 'center' }}>
            {icons[slot] || (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor" style={{ color: '#e0e0e0' }}><path d="M2 21h20v-2H2v2zm10-18C7.58 3 4 6.58 4 11h16c0-4.42-3.58-8-8-8zm-8 10h16v3H4v-3z"/></svg>
            )}
          </span>
        </div>

        {/* Scaled Ingredients List */}
        <ul style={{ listStyle: 'none', paddingLeft: 0, marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {ingredients.map((ing, idx) => {
            const prot = ingredientProteins[idx] || 0;
            const qtyStr = formatQuantity(ing.baseAmount);
            return (
              <li key={idx} style={{ fontSize: '0.95rem', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem', color: 'var(--text-primary)', minHeight: '24px' }}>
                <span style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', flex: 1, minWidth: 0 }}>
                  <span style={{ color: 'var(--accent-danger)', marginTop: '3px', flexShrink: 0 }}>•</span>
                  <span style={{ wordBreak: 'break-word', lineHeight: '1.3' }}>
                    <span style={{ fontWeight: '700', color: 'var(--accent-coral)' }}>{qtyStr} {ing.unit}</span> {ing.name}
                  </span>
                </span>
                {prot > 0 && (
                  <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-secondary)', background: 'rgba(255, 255, 255, 0.05)', padding: '0.15rem 0.35rem', borderRadius: '4px', whiteSpace: 'nowrap', flexShrink: 0, marginTop: '2px' }}>
                    {prot}g P
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Footer Details */}
      <div>
        {/* Calorie Label */}
        <div 
          style={{ 
            borderTop: '1px solid var(--glass-border)', 
            paddingTop: '1rem', 
            marginBottom: '1rem', 
            fontSize: '1rem', 
            fontWeight: '800', 
            color: 'var(--text-secondary)' 
          }}
        >
          {Math.round(targetCalories)} KCAL
        </div>

        {/* Actions Row */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            type="button"
            className="btn btn-secondary"
            style={{ flex: 1, minHeight: '38px', padding: '0.4rem 0.8rem', fontSize: '0.85rem', cursor: 'pointer' }}
            onClick={onViewDetails}
            id={`details-btn-${slot}`}
          >
            Recipe
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            style={{ padding: '0.4rem 0.8rem', minHeight: '38px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            onClick={onSwap}
            title="Swap Meal"
            id={`swap-btn-${slot}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="currentColor" style={{ display: 'block' }}><path d="M19 8l-4 4h3c0 3.31-2.69 6-6 6-1.01 0-1.97-.25-2.8-.7l-1.46 1.46C8.97 19.54 10.43 20 12 20c4.42 0 8-3.58 8-8h3l-4-4zM6 12c0-3.31 2.69-6 6-6 1.01 0 1.97.25 2.8.7l1.46-1.46C15.03 4.46 13.57 4 12 4c-4.42 0-8 3.58-8 8H1l4 4 4-4H6z"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
