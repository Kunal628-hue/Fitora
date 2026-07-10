import React, { useState } from 'react';

/**
 * ShoppingList - Compiles and consolidates ingredients from all active scaled meals.
 * Includes copy-to-clipboard functionality and local purchase checking.
 */
export default function ShoppingList({ weeklyDietPlan, selectedDayIndex }) {
  const [viewMode, setViewMode] = useState('week'); // 'day' or 'week'
  const [checkedItems, setCheckedItems] = useState({});
  const [copied, setCopied] = useState(false);

  // Group and scale all ingredients
  const getAggregatedIngredients = () => {
    const agg = {};

    let activeMealsConfigs = [];
    if (viewMode === 'day') {
      const currentDay = weeklyDietPlan && weeklyDietPlan[selectedDayIndex];
      if (currentDay && currentDay.meals) {
        activeMealsConfigs = currentDay.meals;
      }
    } else {
      // Entire week
      if (weeklyDietPlan && weeklyDietPlan.length > 0) {
        weeklyDietPlan.forEach(day => {
          if (day && day.meals) {
            activeMealsConfigs.push(...day.meals);
          }
        });
      }
    }

    activeMealsConfigs.forEach(({ meal, targetCalories }) => {
      if (!meal) return;
      const scaleFactor = targetCalories / meal.baseCalories;

      meal.ingredients.forEach((ing) => {
        // Create a unique key combining name and unit
        const key = `${ing.name.toLowerCase()}_${ing.unit.toLowerCase()}`;
        const scaledQty = ing.baseAmount * scaleFactor;

        if (agg[key]) {
          agg[key].amount += scaledQty;
        } else {
          agg[key] = {
            name: ing.name,
            amount: scaledQty,
            unit: ing.unit,
          };
        }
      });
    });

    return Object.values(agg);
  };

  const ingredients = getAggregatedIngredients();

  const handleToggleCheck = (key) => {
    setCheckedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const formatQuantity = (amount) => {
    if (amount % 1 === 0) return amount.toString();
    if (Math.abs(amount - Math.round(amount)) < 0.05) {
      return Math.round(amount).toString();
    }
    return amount.toFixed(1);
  };

  const copyToClipboard = () => {
    const listText = ingredients
      .map((ing) => `- ${ing.name}: ${formatQuantity(ing.amount)} ${ing.unit}`)
      .join('\n');
    
    navigator.clipboard.writeText(`Fitora Shopping List:\n\n${listText}`)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
      });
  };

  if (ingredients.length === 0) {
    return (
      <div className="glass-panel text-center">
        <p style={{ color: 'var(--text-secondary)' }}>No meals generated yet. Complete the profile questionnaire to see your shopping list.</p>
      </div>
    );
  }

  return (
    <div className="step-container">
      <div 
        style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '2rem', 
          flexWrap: 'wrap', 
          gap: '1.5rem' 
        }}
      >
        <div>
          <h2 style={{ fontSize: '1.6rem' }}>Consolidated Shopping List</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            {viewMode === 'day' ? "Ingredients scaled for today's targets." : "Ingredients scaled for the entire week's targets."}
          </p>
        </div>
        
        {/* Toggle & Copy buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div className="toggle-group-row" style={{ height: '38px', minHeight: '38px' }}>
            <button
              type="button"
              className={`toggle-btn ${viewMode === 'day' ? 'active' : ''}`}
              onClick={() => setViewMode('day')}
              style={{ padding: '0 1rem', border: 'none', background: 'transparent' }}
            >
              Today
            </button>
            <button
              type="button"
              className={`toggle-btn ${viewMode === 'week' ? 'active' : ''}`}
              onClick={() => setViewMode('week')}
              style={{ padding: '0 1rem', border: 'none', background: 'transparent' }}
            >
              This Week
            </button>
          </div>

          <button 
            type="button" 
            className="btn btn-secondary" 
            style={{ minHeight: '38px', height: '38px', padding: '0.5rem 1rem', fontSize: '0.85rem' }}
            onClick={copyToClipboard}
            id="btn-copy-shopping"
          >
            {copied ? (
              <span>✓ Copied!</span>
            ) : (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>
                Copy List
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="shopping-list-grid">
        {ingredients.map((ing, idx) => {
          const itemKey = `${ing.name}_${ing.unit}`;
          const isChecked = !!checkedItems[itemKey];

          return (
            <div 
              key={idx} 
              className={`shopping-item-card ${isChecked ? 'checked' : ''}`}
              onClick={() => handleToggleCheck(itemKey)}
              id={`shopping-item-${idx}`}
            >
              <div className="shopping-item-left" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div className="shopping-checkbox">
                  {isChecked && <span style={{ color: 'white', fontSize: '0.8rem', fontWeight: 'bold' }}>✓</span>}
                </div>
                <span className="shopping-item-name">{ing.name}</span>
              </div>
              <span className="shopping-item-qty">
                {formatQuantity(ing.amount)} {ing.unit}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
