import React, { useState, useEffect } from 'react';

/**
 * ShoppingList - Compiles and consolidates ingredients from all active scaled meals.
 * Includes copy-to-clipboard functionality and local purchase checking.
 */
export default function ShoppingList({ mealsConfig }) {
  const [checkedItems, setCheckedItems] = useState({});
  const [copied, setCopied] = useState(false);

  // Group and scale all ingredients
  const getAggregatedIngredients = () => {
    const agg = {};

    mealsConfig.forEach(({ meal, targetCalories }) => {
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
      <div className="shopping-list-actions">
        <div>
          <h2 style={{ fontSize: '1.6rem' }}>Consolidated Shopping List</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>All ingredients scaled for your daily targets.</p>
        </div>
        <button 
          type="button" 
          className="btn btn-outline" 
          onClick={copyToClipboard}
          id="btn-copy-shopping"
        >
          {copied ? '✓ Copied!' : '📋 Copy List'}
        </button>
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
              <div className="shopping-item-left">
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
