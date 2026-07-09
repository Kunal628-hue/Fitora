import React from 'react';

/**
 * RecipeModal - Renders a premium modal showing ingredients and instructions.
 */
export default function RecipeModal({ isOpen, onClose, meal, targetCalories, isLogged, onLog }) {
  if (!isOpen || !meal) return null;

  const scaleFactor = targetCalories / meal.baseCalories;

  const scaledProtein = Math.round(meal.macros.protein * scaleFactor);
  const scaledFat = Math.round(meal.macros.fat * scaleFactor);
  const scaledCarbs = Math.round(meal.macros.carbs * scaleFactor);

  const formatQuantity = (amount) => {
    if (amount === null || amount === undefined) return '';
    const scaled = amount * scaleFactor;
    if (scaled % 1 === 0) return scaled.toString();
    if (Math.abs(scaled - Math.round(scaled)) < 0.05) {
      return Math.round(scaled).toString();
    }
    return scaled.toFixed(1);
  };

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
      onClick={onClose}
    >
      <div 
        className="glass-panel" 
        style={{
          maxWidth: '550px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          position: 'relative',
          padding: '2.5rem',
          border: '1px solid rgba(255, 255, 255, 0.15)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'transparent',
            border: 'none',
            color: 'var(--text-secondary)',
            fontSize: '1.5rem',
            cursor: 'pointer',
            padding: '0.25rem 0.5rem',
          }}
          aria-label="Close details"
        >
          ×
        </button>

        <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{meal.name}</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>{meal.description}</p>

        {/* Nutrition Bar */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          <span className="meal-meta-badge calories">{Math.round(targetCalories)} kcal</span>
          <span className="meal-meta-badge">⏱️ {meal.prepTime}</span>
          <span className="meal-meta-badge" style={{ borderLeft: '3px solid var(--color-protein)' }}>
            P: {scaledProtein}g
          </span>
          <span className="meal-meta-badge" style={{ borderLeft: '3px solid var(--color-fat)' }}>
            F: {scaledFat}g
          </span>
          <span className="meal-meta-badge" style={{ borderLeft: '3px solid var(--color-carbs)' }}>
            C: {scaledCarbs}g
          </span>
        </div>

        {/* Ingredients */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.25rem' }}>
            Ingredients
          </h3>
          <ul className="ingredients-list" style={{ gridTemplateColumns: '1fr' }}>
            {meal.ingredients.map((ing, idx) => (
              <li key={idx} className="ingredient-item" style={{ padding: '0.25rem 0' }}>
                <span>{ing.name}</span>
                <span className="qty">{formatQuantity(ing.baseAmount)} {ing.unit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Instructions */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.25rem' }}>
            Instructions
          </h3>
          <ol className="instructions-list">
            {meal.instructions.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button 
            type="button" 
            className="btn btn-secondary" 
            style={{ flex: 1 }} 
            onClick={onClose}
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary"
            style={{ flex: 1 }}
            disabled={isLogged}
            onClick={() => {
              onLog();
              onClose();
            }}
          >
            {isLogged ? '✓ Logged' : 'Log Meal'}
          </button>
        </div>
      </div>
    </div>
  );
}
