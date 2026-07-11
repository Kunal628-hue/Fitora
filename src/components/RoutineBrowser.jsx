import React, { useState } from 'react';
import { WORKOUT_ROUTINES } from '../data/workoutData';

/**
 * RoutineBrowser - Weekly routine schedule browser with Custom Workout (Add, Edit, Delete) features.
 */
export default function RoutineBrowser({
  weeklyWorkoutPlan,
  selectedDayIndex,
  onSelectDay,
  onAddExercise,
  onEditExercise,
  onDeleteExercise,
  showConfirm
}) {
  const routines = weeklyWorkoutPlan && weeklyWorkoutPlan.length > 0 ? weeklyWorkoutPlan : WORKOUT_ROUTINES;
  const currentRoutine = routines[selectedDayIndex] || routines[0];

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' | 'edit'
  const [editingExIdx, setEditingExIdx] = useState(null);

  // Form Fields State
  const [exName, setExName] = useState('');
  const [exSets, setExSets] = useState('3');
  const [exReps, setExReps] = useState('10');
  const [exRest, setExRest] = useState('90s');
  const [exRpe, setExRpe] = useState('8');

  const handleOpenAdd = () => {
    setModalMode('add');
    setEditingExIdx(null);
    setExName('');
    setExSets('3');
    setExReps('10');
    setExRest('90s');
    setExRpe('8');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (ex, idx) => {
    setModalMode('edit');
    setEditingExIdx(idx);
    setExName(ex.name);
    setExSets(ex.sets.toString());
    setExReps(ex.reps.toString());
    setExRest(ex.rest);
    setExRpe(ex.rpe.toString());
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!exName.trim()) return;

    const exerciseData = {
      name: exName.trim(),
      sets: parseInt(exSets, 10) || 3,
      reps: exReps.trim(),
      rest: exRest.trim(),
      rpe: parseInt(exRpe, 10) || 8
    };

    if (modalMode === 'add') {
      onAddExercise(selectedDayIndex, exerciseData);
    } else {
      onEditExercise(selectedDayIndex, editingExIdx, exerciseData);
    }
    setIsModalOpen(false);
  };

  const handleDeleteClick = async (exIdx) => {
    const confirmed = showConfirm
      ? await showConfirm('Are you sure you want to delete this exercise?', 'Delete Exercise')
      : window.confirm('Are you sure you want to delete this exercise?');

    if (confirmed) {
      onDeleteExercise(selectedDayIndex, exIdx);
    }
  };

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
      <div className="weekday-grid">
        {routines.map((routine, idx) => {
          const isActive = selectedDayIndex === idx;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => onSelectDay(idx)}
              className={`weekday-btn ${isActive ? 'active' : ''}`}
              id={`day-select-${idx}`}
            >
              <span className="weekday-name">{routine.dayName}</span>
              <span className="weekday-num">{routine.dayNumber}</span>
              {isActive && <div className="weekday-indicator" />}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '3rem', fontWeight: '900', color: 'rgba(255,255,255,0.02)', lineHeight: 1, marginRight: '1rem' }}>
              {currentRoutine.dayNumber}
            </span>
            <button
              type="button"
              className="btn btn-secondary"
              style={{
                border: '1.5px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.03)',
                color: '#ffffff',
                minHeight: '44px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                borderRadius: '8px',
                fontSize: '0.82rem',
                fontWeight: '700',
                padding: '0 1.2rem',
                cursor: 'pointer',
                transition: 'background 0.2s, border-color 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
              }}
              onClick={handleOpenAdd}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Add Exercise
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  <span>Rest: {ex.rest}</span>
                  <span style={{ color: 'var(--accent-coral)' }}>RPE {ex.rpe}</span>
                </div>

                {/* Edit & Delete Exercise Buttons */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: '0.5rem' }}>
                  <button
                    type="button"
                    title="Edit Exercise"
                    onClick={() => handleOpenEdit(ex, idx)}
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '6px',
                      padding: '0.45rem',
                      cursor: 'pointer',
                      color: 'var(--text-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      transition: 'background 0.2s, color 0.2s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                      e.currentTarget.style.color = '#ffffff';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                      e.currentTarget.style.color = 'var(--text-secondary)';
                    }}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                  </button>
                  <button
                    type="button"
                    title="Delete Exercise"
                    onClick={() => handleDeleteClick(idx)}
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '6px',
                      padding: '0.45rem',
                      cursor: 'pointer',
                      color: 'var(--accent-red)',
                      display: 'flex',
                      alignItems: 'center',
                      transition: 'background 0.2s, border-color 0.2s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'rgba(230,0,0,0.15)';
                      e.currentTarget.style.borderColor = 'var(--accent-red)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                    }}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add/Edit Exercise Modal Dialog */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(5, 5, 8, 0.85)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 9999,
          padding: '1.5rem',
          animation: 'fadeIn 0.2s ease',
        }}>
          <div style={{
            background: '#0c0d12',
            border: '2px solid var(--accent-red)',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '420px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6), 0 0 25px rgba(230, 0, 0, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            animation: 'welcomeCardSlideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          }}>
            {/* Header */}
            <div style={{
              padding: '1.25rem 1.5rem 0.75rem',
              display: 'flex',
              alignItems: 'center',
              borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
            }}>
              <h3 style={{
                margin: 0,
                fontSize: '1.1rem',
                fontWeight: 800,
                color: '#ffffff',
                letterSpacing: '0.5px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-coral)" strokeWidth="2.5">
                  <path d="M20.5 11H19V7h-2v4H7V7H5v4H3.5C2.67 11 2 11.67 2 12.5S2.67 14 3.5 14H5v4h2v-4h10v4h2v-4h1.5c.83 0 1.5-.67 1.5-1.5S21.33 11 20.5 11z"/>
                </svg>
                {modalMode === 'add' ? 'Add Custom Exercise' : 'Edit Exercise'}
              </h3>
            </div>

            {/* Form Body */}
            <form onSubmit={handleSubmit}>
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                
                {/* Exercise Name */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Exercise Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Incline Dumbbell Press"
                    value={exName}
                    onChange={(e) => setExName(e.target.value)}
                    style={{
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1.5px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '8px',
                      padding: '0.6rem 0.8rem',
                      color: '#ffffff',
                      fontSize: '0.9rem',
                      outline: 'none',
                      transition: 'border-color 0.2s',
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--accent-red)'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)'}
                  />
                </div>

                {/* Grid for Sets & Reps */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Sets
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      max="10"
                      value={exSets}
                      onChange={(e) => setExSets(e.target.value)}
                      style={{
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1.5px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '8px',
                        padding: '0.6rem 0.8rem',
                        color: '#ffffff',
                        fontSize: '0.9rem',
                        outline: 'none',
                      }}
                      onFocus={(e) => e.target.style.borderColor = 'var(--accent-red)'}
                      onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)'}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Reps
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 8-10 or 12"
                      value={exReps}
                      onChange={(e) => setExReps(e.target.value)}
                      style={{
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1.5px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '8px',
                        padding: '0.6rem 0.8rem',
                        color: '#ffffff',
                        fontSize: '0.9rem',
                        outline: 'none',
                      }}
                      onFocus={(e) => e.target.style.borderColor = 'var(--accent-red)'}
                      onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)'}
                    />
                  </div>
                </div>

                {/* Grid for Rest & RPE */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Rest Time
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 90s or 2 min"
                      value={exRest}
                      onChange={(e) => setExRest(e.target.value)}
                      style={{
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1.5px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '8px',
                        padding: '0.6rem 0.8rem',
                        color: '#ffffff',
                        fontSize: '0.9rem',
                        outline: 'none',
                      }}
                      onFocus={(e) => e.target.style.borderColor = 'var(--accent-red)'}
                      onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)'}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Target RPE (1-10)
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      max="10"
                      value={exRpe}
                      onChange={(e) => setExRpe(e.target.value)}
                      style={{
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1.5px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '8px',
                        padding: '0.6rem 0.8rem',
                        color: '#ffffff',
                        fontSize: '0.9rem',
                        outline: 'none',
                      }}
                      onFocus={(e) => e.target.style.borderColor = 'var(--accent-red)'}
                      onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)'}
                    />
                  </div>
                </div>

              </div>

              {/* Footer */}
              <div style={{
                padding: '0.75rem 1.5rem 1.25rem',
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '0.75rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.05)',
              }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{
                    background: 'transparent',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: 'var(--text-secondary)',
                    borderRadius: '8px',
                    padding: '0.55rem 1.2rem',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'background 0.2s, color 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = 'var(--text-secondary)';
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    background: 'var(--accent-red)',
                    border: 'none',
                    color: '#ffffff',
                    borderRadius: '8px',
                    padding: '0.55rem 1.2rem',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(230, 0, 0, 0.2)',
                    transition: 'background 0.2s, transform 0.1s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = '#ff1a1a';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'var(--accent-red)';
                  }}
                  onMouseDown={e => e.currentTarget.style.transform = 'scale(0.97)'}
                  onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
