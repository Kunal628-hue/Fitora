import React from 'react';

/**
 * RecipeModal - Renders a premium modal showing ingredients and instructions.
 */
export default function RecipeModal({ isOpen, onClose, meal, targetCalories, isLogged, onLog, t = k => k, translateContent = k => k }) {
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

  const unitTrans = (unit) => {
    if (unit === 'g') return t('g') || 'g';
    if (unit === 'pieces') return t('pieces') || 'pieces';
    return unit;
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

        <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{translateContent(meal.name)}</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>{translateContent(meal.description)}</p>

        {/* Nutrition Bar */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          <span className="meal-meta-badge calories">{Math.round(targetCalories)} {t('kcal') || 'kcal'}</span>
          <span className="meal-meta-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="12" height="12" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
            {meal.prepTime ? meal.prepTime.replace('mins', t('mins') || 'mins').replace('min', t('mins') || 'min') : ''}
          </span>
          <span className="meal-meta-badge" style={{ borderLeft: '3px solid var(--color-protein)' }}>
            {t('protein')}: {scaledProtein}g
          </span>
          <span className="meal-meta-badge" style={{ borderLeft: '3px solid var(--color-fat)' }}>
            {t('fats')}: {scaledFat}g
          </span>
          <span className="meal-meta-badge" style={{ borderLeft: '3px solid var(--color-carbs)' }}>
            {t('carbs')}: {scaledCarbs}g
          </span>
        </div>

        {/* Ingredients */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.25rem' }}>
            {t('ingredients')}
          </h3>
          <ul className="ingredients-list" style={{ gridTemplateColumns: '1fr' }}>
            {meal.ingredients.map((ing, idx) => (
              <li key={idx} className="ingredient-item" style={{ padding: '0.25rem 0' }}>
                <span>{translateContent(ing.name)}</span>
                <span className="qty">{formatQuantity(ing.baseAmount)} {unitTrans(ing.unit)}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Instructions */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.25rem' }}>
            {t('instructions')}
          </h3>
          <ol className="instructions-list">
            {meal.instructions.map((step, idx) => (
              <li key={idx}>{translateContent(step)}</li>
            ))}
          </ol>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
          <button 
            type="button" 
            className="btn btn-secondary" 
            style={{ flex: 1, minHeight: '44px' }} 
            onClick={onClose}
          >
            {t('closeBtn')}
          </button>
          <button
            type="button"
            className="btn btn-primary"
            disabled={isLogged}
            style={{ 
              flex: 1, 
              minHeight: '44px',
              background: isLogged ? 'rgba(255, 255, 255, 0.1)' : 'var(--accent-red)',
              color: isLogged ? 'var(--text-muted)' : '#ffffff',
              border: 'none',
              cursor: isLogged ? 'not-allowed' : 'pointer'
            }}
            onClick={() => {
              onLog();
              onClose();
            }}
          >
            {isLogged ? `${t('loggedBadge')} ✓` : t('logMealBtn')}
          </button>
        </div>
      </div>
    </div>
  );
}
