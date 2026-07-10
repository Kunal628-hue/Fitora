import React, { useState, useEffect } from 'react';

/**
 * ActiveWorkout - active workout tracking session matching Design 1.
 * Features checkable exercises, live 45-min countdown timer, focus tip, and real-time progress.
 */
export default function ActiveWorkout({ routine, onFinishWorkout }) {
  // Live Timer state (45 minutes = 2700 seconds)
  const [secondsRemaining, setSecondsRemaining] = useState(2700);
  
  // Exercise check-off state (object of checked indices)
  const [checkedExercises, setCheckedExercises] = useState({});

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format seconds to MM:SS
  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    const formattedMins = mins < 10 ? `0${mins}` : mins;
    const formattedSecs = remainingSecs < 10 ? `0${remainingSecs}` : remainingSecs;
    return `${formattedMins}:${formattedSecs}`;
  };

  const handleToggleExercise = (idx) => {
    setCheckedExercises((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const totalExercises = routine.exercises.length;
  const completedExercises = Object.values(checkedExercises).filter(Boolean).length;
  const progressPercent = Math.round((completedExercises / totalExercises) * 100) || 0;

  return (
    <div className="step-container" style={{ margin: '1rem 0' }}>
      {/* Title & Live Timer Header Row */}
      <div 
        style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'baseline', 
          marginBottom: '2.5rem',
          flexWrap: 'wrap',
          gap: '1.5rem' 
        }}
      >
        <div>
          <span style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--accent-red)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            {routine.routineName.toUpperCase()} DAY
          </span>
          <h1 style={{ fontSize: '3.2rem', fontWeight: '900', textTransform: 'uppercase', lineHeight: '1' }}>
            Today's Workout
          </h1>
        </div>

        {/* Timer Box */}
        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block' }}>
            Time Remaining
          </span>
          <span style={{ fontSize: '2.8rem', fontWeight: '800', lineHeight: 1, letterSpacing: '-0.02em' }}>
            {formatTime(secondsRemaining)}
          </span>
        </div>
      </div>

      {/* Main Workspace Layout: Exercises vs Sidebar */}
      <div 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: '2fr 1fr', 
          gap: '2rem',
          alignItems: 'start'
        }}
      >
        {/* Left Column: Exercises checklist */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {routine.exercises.map((ex, idx) => {
            const isChecked = !!checkedExercises[idx];
            return (
              <div
                key={idx}
                onClick={() => handleToggleExercise(idx)}
                style={{
                  background: '#11131a',
                  border: '1px solid var(--glass-border)',
                  borderRadius: '12px',
                  padding: '1.5rem 2rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  transition: 'all var(--transition-normal)',
                  boxShadow: isChecked ? 'inset 0 0 10px rgba(0,0,0,0.5)' : 'none',
                  opacity: isChecked ? 0.6 : 1
                }}
                id={`exercise-item-${idx}`}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  {/* Badge */}
                  <div 
                    style={{ 
                      width: '42px', 
                      height: '42px', 
                      background: '#090a0f', 
                      borderRadius: '8px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      border: '1px solid var(--glass-border)'
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', color: isChecked ? 'var(--text-muted)' : 'var(--accent-red)' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M20.5 11H19V7h-2v4H7V7H5v4H3.5C2.67 11 2 11.67 2 12.5S2.67 14 3.5 14H5v4h2v-4h10v4h2v-4h1.5c.83 0 1.5-.67 1.5-1.5S21.33 11 20.5 11z"/></svg>
                    </span>
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: isChecked ? 'var(--text-secondary)' : '#ffffff' }}>
                      {ex.name}
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '0.15rem' }}>
                      {ex.sets} SETS &bull; {ex.reps} REPS
                    </p>
                  </div>
                </div>

                {/* Checkbox circle matching Design 1 */}
                <div 
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    border: isChecked ? '2px solid var(--accent-red)' : '2px solid var(--text-muted)',
                    background: isChecked ? 'var(--accent-red)' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all var(--transition-normal)'
                  }}
                >
                  {isChecked && <span style={{ color: 'white', fontWeight: 'bold', fontSize: '0.85rem' }}>✓</span>}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Sidebar (Focus Point, Zero Excuses, Progress) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Card 1: Focus Point Card with watermark lightbulb */}
          <div 
            className="tracker-card" 
            style={{ 
              position: 'relative', 
              overflow: 'hidden', 
              padding: '2rem 1.5rem',
              minHeight: '160px'
            }}
          >
            {/* Watermark Lightbulb SVG */}
            <svg 
              width="100" 
              height="100" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="rgba(255, 255, 255, 0.04)" 
              strokeWidth="1.5"
              style={{
                position: 'absolute',
                right: '-10px',
                bottom: '-10px',
                pointerEvents: 'none'
              }}
            >
              <path d="M9 18h6M10 21h4M12 2v1M5.22 5.22l.71.71M19.78 5.22l-.71.71M12 6a6 6 0 00-6 6c0 2.22 1.21 4.15 3 5.19V18h6v-.81c1.79-1.04 3-2.97 3-5.19a6 6 0 00-6-6z" />
            </svg>

            <span style={{ fontSize: '0.75rem', fontWeight: '900', color: 'var(--accent-red)', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: '0.75rem' }}>
              Focus Point
            </span>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.5', position: 'relative', zIndex: 1 }}>
              {routine.focusTip}
            </p>
          </div>

          {/* Card 2: Zero Excuses Card with Gym illustration */}
          <div 
            className="tracker-card" 
            style={{ 
              background: 'linear-gradient(135deg, #181b24 0%, #0d0f14 100%)',
              height: '180px',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              borderRadius: '12px',
              overflow: 'hidden',
              border: '1px solid var(--glass-border)',
              padding: 0
            }}
          >
            {/* Grid overlay for texture */}
            <div 
              style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                backgroundImage: 'radial-gradient(circle, rgba(255, 0, 0, 0.1) 0%, transparent 70%), linear-gradient(rgba(255,255,255,0.01) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.01) 1px, transparent 1px)',
                backgroundSize: '100% 100%, 15px 15px, 15px 15px',
                pointerEvents: 'none'
              }}
            />
            {/* Lightning bolt symbol */}
            <span style={{ filter: 'drop-shadow(0 0 10px rgba(255, 0, 0, 0.6))', display: 'block', marginBottom: '0.5rem', color: 'var(--accent-red)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><path d="M7 2v11h3v9l7-12h-4l4-8z"/></svg>
            </span>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '900', textTransform: 'uppercase', fontStyle: 'italic', letterSpacing: '0.05em' }}>
              Zero Excuses
            </h2>
          </div>

          {/* Card 3: Current Progress Tracker with horizontal bar */}
          <div className="tracker-card" style={{ padding: '2rem 1.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '900', color: 'var(--text-secondary)', letterSpacing: '0.05em', textTransform: 'uppercase', display: 'block' }}>
              Current Progress
            </span>
            
            <div style={{ margin: '1rem 0' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-secondary)' }}>
                EXERCISES DONE: <span style={{ color: 'var(--text-primary)', fontSize: '1rem' }}>{completedExercises} / {totalExercises}</span>
              </div>
              <div className="horizontal-progress-bar-container" style={{ margin: '0.75rem 0 0 0', height: '10px' }}>
                <div className="horizontal-progress-bar-fill" style={{ width: `${progressPercent}%` }}></div>
              </div>
            </div>

            <button
              type="button"
              className="btn btn-primary"
              style={{ width: '100%', minHeight: '44px', background: 'var(--accent-red)', marginTop: '0.5rem' }}
              onClick={() => onFinishWorkout(completedExercises)}
              id="finish-workout-btn"
            >
              Finish Workout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
