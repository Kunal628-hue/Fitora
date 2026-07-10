import React from 'react';
import { WORKOUT_ROUTINES } from '../data/workoutData';

/**
 * RoutineBrowser - Weekly routine schedule browser matching Design 2.
 */
export default function RoutineBrowser({ weeklyWorkoutPlan, selectedDayIndex, onSelectDay, onStartWorkout }) {
  const routines = weeklyWorkoutPlan && weeklyWorkoutPlan.length > 0 ? weeklyWorkoutPlan : WORKOUT_ROUTINES;
  const currentRoutine = routines[selectedDayIndex] || routines[0];

  return (
    <div className="step-container" style={{ margin: '1rem 0' }}>
      {/* Title Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: '900', textTransform: 'uppercase', lineHeight: '1.1' }}>
          My Routine
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: '600', letterSpacing: '0.05em', textTransform: 'uppercase', marginTop: '0.25rem' }}>
          Peak intensity is the only standard. Stay disciplined.
        </p>
      </div>

      {/* Weekday Selector Row */}
      <div 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(7, 1fr)', 
          gap: '1rem', 
          marginBottom: '2.5rem' 
        }}
      >
        {routines.map((routine, idx) => {
          const isActive = selectedDayIndex === idx;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => onSelectDay(idx)}
              style={{
                background: '#11131a',
                border: '1px solid var(--glass-border)',
                borderRadius: '6px',
                padding: '1.25rem 0.5rem',
                cursor: 'pointer',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.25rem',
                transition: 'all var(--transition-normal)',
                position: 'relative',
                outline: 'none'
              }}
              id={`day-select-${idx}`}
            >
              <span style={{ fontSize: '0.75rem', fontWeight: '800', color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)', letterSpacing: '0.05em' }}>
                {routine.dayName}
              </span>
              <span style={{ fontSize: '1.6rem', fontWeight: '900', color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                {routine.dayNumber}
              </span>
              {/* Highlight red underline */}
              {isActive && (
                <div 
                  style={{ 
                    position: 'absolute', 
                    bottom: 0, 
                    left: 0, 
                    right: 0, 
                    height: '3px', 
                    background: 'var(--accent-red)' 
                  }} 
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Routine Detail Box */}
      <div className="glass-panel" style={{ background: '#11131a', padding: '2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '2.2rem', fontWeight: '900', textTransform: 'uppercase', fontStyle: 'italic', letterSpacing: '-0.02em', color: '#ffffff' }}>
              {currentRoutine.routineName}
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: '800', letterSpacing: '0.05em', marginTop: '0.25rem' }}>
              FOCUS: {currentRoutine.focus}
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <span style={{ fontSize: '3rem', fontWeight: '900', color: 'rgba(255,255,255,0.05)', lineHeight: 1 }}>
              {currentRoutine.dayNumber}
            </span>
            <button
              type="button"
              className="btn btn-primary"
              style={{ background: 'var(--accent-red)', minHeight: '44px' }}
              onClick={onStartWorkout}
              id="start-workout-btn"
            >
              Start Workout
            </button>
          </div>
        </div>

        {/* Exercises List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {currentRoutine.exercises.map((ex, idx) => (
            <div
              key={idx}
              style={{
                background: '#090a0e',
                border: '1px solid var(--glass-border)',
                borderRadius: '8px',
                padding: '1.25rem 1.5rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                {/* Dumbbell Icon Badge */}
                <div 
                  style={{ 
                    width: '42px', 
                    height: '42px', 
                    background: '#11131a', 
                    borderRadius: '8px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    border: '1px solid var(--glass-border)'
                  }}
                >
                   <span style={{ transform: 'rotate(-45deg)', display: 'inline-flex', alignItems: 'center' }}>
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor" style={{ color: 'var(--accent-red)' }}><path d="M20.5 11H19V7h-2v4H7V7H5v4H3.5C2.67 11 2 11.67 2 12.5S2.67 14 3.5 14H5v4h2v-4h10v4h2v-4h1.5c.83 0 1.5-.67 1.5-1.5S21.33 11 20.5 11z"/></svg>
                   </span>
                </div>
                <div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: '700', color: '#ffffff' }}>{ex.name}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '0.1rem' }}>
                    {ex.sets} SETS X {ex.reps} REPS
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <span>Rest: {ex.rest}</span>
                <span style={{ color: 'var(--accent-coral)' }}>RPE {ex.rpe}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
