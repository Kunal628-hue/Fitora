import React from 'react';

/**
 * MealColumn - Renders the vertical meal slot columns matching Design 2.
 */
export default function MealColumn({ slot, meal, targetCalories, isLogged, onLog, onSwap, onViewDetails }) {
  if (!meal) return null;

  const icons = {
    breakfast: '☀️',
    lunch: '🍴',
    snack: '☕',
    dinner: '🌙',
  };

  const displaySlotName = slot.toUpperCase();

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
          <span style={{ fontSize: '1.2rem' }}>{icons[slot] || '🍲'}</span>
        </div>

        {/* Bullet Foods */}
        <ul style={{ listStyle: 'none', paddingLeft: 0, marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {meal.bullets && meal.bullets.map((bullet, idx) => (
            <li key={idx} style={{ fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
              <span style={{ color: 'var(--accent-danger)' }}>•</span> {bullet}
            </li>
          ))}
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
        <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              type="button"
              className="btn btn-secondary"
              style={{ flex: 1, minHeight: '38px', padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
              onClick={onViewDetails}
              id={`details-btn-${slot}`}
            >
              Recipe
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              style={{ padding: '0.4rem 0.8rem', minHeight: '38px', fontSize: '0.85rem' }}
              onClick={onSwap}
              title="Swap Meal"
              id={`swap-btn-${slot}`}
            >
              🔄
            </button>
          </div>
          <button
            type="button"
            className={`btn ${isLogged ? 'btn-secondary' : 'btn-primary'}`}
            style={{ 
              width: '100%', 
              minHeight: '38px', 
              fontSize: '0.85rem', 
              background: isLogged ? 'rgba(255, 255, 255, 0.05)' : 'var(--accent-danger)', // Design 1 Red style
              color: isLogged ? 'var(--text-muted)' : 'white'
            }}
            disabled={isLogged}
            onClick={onLog}
            id={`log-btn-${slot}`}
          >
            {isLogged ? '✓ LOGGED' : 'LOG MEAL'}
          </button>
        </div>
      </div>
    </div>
  );
}
