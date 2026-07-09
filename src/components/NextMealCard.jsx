import React from 'react';

/**
 * NextMealCard - Renders the featured 'Next Meal' card matching Design 1.
 * Dynamically picks the relevant meal based on current local hour.
 */
export default function NextMealCard({ mealsConfig, loggedMeals, onLogMeal, onViewDetails }) {
  // Determine the next meal slot based on current hour
  const getNextMealSlot = () => {
    const hour = new Date().getHours();
    
    // Default mapping by time
    let slot = 'breakfast';
    let timeLabel = '8:30 AM';
    
    if (hour >= 11 && hour < 16) {
      slot = 'lunch';
      timeLabel = '1:30 PM';
    } else if (hour >= 16 && hour < 19) {
      slot = 'snack';
      timeLabel = '5:00 PM';
    } else if (hour >= 19 || hour < 6) {
      slot = 'dinner';
      timeLabel = '8:30 PM';
    }

    // If the time-based slot is already logged, find the first unlogged slot
    const slotsOrder = ['breakfast', 'lunch', 'snack', 'dinner'];
    const timeLabels = {
      breakfast: '8:30 AM',
      lunch: '1:30 PM',
      snack: '5:00 PM',
      dinner: '8:30 PM'
    };

    if (loggedMeals.includes(slot)) {
      const unlogged = slotsOrder.find(s => !loggedMeals.includes(s));
      if (unlogged) {
        slot = unlogged;
        timeLabel = timeLabels[unlogged];
      }
    }

    return { slot, timeLabel };
  };

  const { slot, timeLabel } = getNextMealSlot();
  const config = mealsConfig.find((c) => c.slot === slot);

  if (!config) {
    return (
      <div className="glass-panel text-center">
        <p style={{ color: 'var(--text-secondary)' }}>No meals generated yet. Fill in your profile above.</p>
      </div>
    );
  }

  const { meal, targetCalories } = config;
  const isLogged = loggedMeals.includes(slot);

  return (
    <div 
      className="glass-panel" 
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 2fr',
        gap: '2.5rem',
        padding: '0.2rem',
        background: 'rgba(20, 22, 30, 0.7)',
        borderRadius: '20px',
        overflow: 'hidden',
        border: '1px solid var(--glass-border)',
        alignItems: 'stretch'
      }}
      id="next-meal-card"
    >
      {/* Left Column: Stylized Plate Graphic */}
      <div 
        style={{
          background: 'linear-gradient(135deg, #181b24 0%, #0d0f14 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          minHeight: '220px',
          borderRight: '1px solid var(--glass-border)'
        }}
      >
        {/* Stylized CSS Plate Illustration */}
        <div 
          style={{
            width: '130px',
            height: '130px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, #2d3345 30%, #1e2230 70%)',
            boxShadow: '0 8px 30px rgba(0,0,0,0.6), inset 0 2px 10px rgba(255,255,255,0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}
        >
          {/* Inner ring */}
          <div style={{ width: '90px', height: '90px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.02)', position: 'relative' }}>
            {/* Asparagus/veggies shapes (Green lines) */}
            <div style={{ position: 'absolute', width: '8px', height: '70px', background: '#2e7d32', transform: 'rotate(35deg)', left: '35px', top: '10px', borderRadius: '4px', opacity: 0.8 }} />
            <div style={{ position: 'absolute', width: '8px', height: '65px', background: '#388e3c', transform: 'rotate(25deg)', left: '45px', top: '15px', borderRadius: '4px', opacity: 0.8 }} />
            <div style={{ position: 'absolute', width: '8px', height: '60px', background: '#4caf50', transform: 'rotate(45deg)', left: '25px', top: '20px', borderRadius: '4px', opacity: 0.8 }} />

            {/* Protein/Chicken shape (Golden-brown polygon) */}
            <div 
              style={{
                position: 'absolute',
                width: '60px',
                height: '45px',
                background: 'linear-gradient(135deg, #d87040 0%, #8b4513 100%)',
                left: '20px',
                top: '25px',
                borderRadius: '50% 15px 50% 15px',
                transform: 'rotate(-10deg)',
                boxShadow: '0 4px 10px rgba(0,0,0,0.4)',
                border: '1px solid rgba(255,255,255,0.1)'
              }}
            >
              {/* Sear marks */}
              <div style={{ position: 'absolute', width: '30px', height: '2px', background: 'rgba(0,0,0,0.4)', top: '12px', left: '15px', transform: 'rotate(15deg)' }} />
              <div style={{ position: 'absolute', width: '30px', height: '2px', background: 'rgba(0,0,0,0.4)', top: '22px', left: '15px', transform: 'rotate(15deg)' }} />
              <div style={{ position: 'absolute', width: '30px', height: '2px', background: 'rgba(0,0,0,0.4)', top: '32px', left: '15px', transform: 'rotate(15deg)' }} />
            </div>

            {/* Grains/quinoa grains dots */}
            <div style={{ position: 'absolute', width: '6px', height: '6px', borderRadius: '50%', background: '#bcaaa4', left: '65px', top: '40px' }} />
            <div style={{ position: 'absolute', width: '5px', height: '5px', borderRadius: '50%', background: '#d7ccc8', left: '72px', top: '45px' }} />
            <div style={{ position: 'absolute', width: '6px', height: '6px', borderRadius: '50%', background: '#bcaaa4', left: '60px', top: '52px' }} />
          </div>
        </div>
      </div>

      {/* Right Column: Details & CTA */}
      <div style={{ padding: '2rem 2.5rem 2rem 0', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
          <div>
            <span style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--accent-danger)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              NEXT MEAL • {timeLabel}
            </span>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '800', marginTop: '0.25rem', letterSpacing: '-0.02em' }}>
              {meal.name.toUpperCase()}
            </h2>
          </div>
          <span 
            className="meal-meta-badge" 
            style={{ 
              background: 'rgba(255, 255, 255, 0.05)', 
              color: 'var(--text-secondary)', 
              fontWeight: '700',
              padding: '0.4rem 0.8rem',
              borderRadius: '6px',
              border: '1px solid var(--glass-border)'
            }}
          >
            {Math.round(targetCalories)} KCAL
          </span>
        </div>

        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.5', marginBottom: '1.5rem' }}>
          {meal.description}
        </p>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            type="button"
            className="btn btn-secondary"
            style={{ minHeight: '44px', border: '1px solid var(--glass-border)', background: 'transparent' }}
            onClick={onViewDetails}
            id="next-meal-details-btn"
          >
            VIEW DETAILS
          </button>
          <button
            type="button"
            className={`btn ${isLogged ? 'btn-secondary' : 'btn-primary'}`}
            style={{ 
              minHeight: '44px', 
              background: isLogged ? 'rgba(255, 255, 255, 0.05)' : 'var(--accent-danger)', // Design 1 Red style
              color: isLogged ? 'var(--text-muted)' : 'white'
            }}
            disabled={isLogged}
            onClick={onLogMeal}
            id="next-meal-log-btn"
          >
            {isLogged ? '✓ LOGGED' : 'LOG MEAL'}
          </button>
        </div>
      </div>
    </div>
  );
}
