import React, { useState } from 'react';
import { WORKOUT_ROUTINES } from '../data/workoutData';
import { EXERCISE_GUIDES } from '../data/exerciseGuides';

function ExerciseVisual({ type }) {
  // Styles for the container and animations
  const keyframes = `
    @keyframes frame1Anim {
      0%, 30% { opacity: 1; }
      31%, 100% { opacity: 0; }
    }
    @keyframes frame2Anim {
      33%, 63% { opacity: 1; }
      0%, 32%, 64%, 100% { opacity: 0; }
    }
    @keyframes frame3Anim {
      66%, 96% { opacity: 1; }
      0%, 65%, 97%, 100% { opacity: 0; }
    }
    @keyframes pulseTarget {
      0%, 100% { transform: scale(1); opacity: 0.5; }
      50% { transform: scale(1.4); opacity: 0.9; }
    }
  `;

  const f1 = { animation: 'frame1Anim 3s infinite', position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' };
  const f2 = { animation: 'frame2Anim 3s infinite', position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' };
  const f3 = { animation: 'frame3Anim 3s infinite', position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' };

  return (
    <div style={{
      width: '150px',
      height: '150px',
      background: 'rgba(255, 255, 255, 0.02)',
      border: '1.5px solid rgba(255, 255, 255, 0.06)',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <style>{keyframes}</style>
      
      {/* Press Animation (Bench Press) */}
      {type === 'press' && (
        <>
          {/* Frame 1: Setup */}
          <div style={f1}>
            <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
              {/* Bench */}
              <line x1="15" y1="75" x2="85" y2="75" stroke="rgba(255,255,255,0.2)" strokeWidth="4" strokeLinecap="round" />
              <line x1="30" y1="75" x2="30" y2="90" stroke="rgba(255,255,255,0.2)" strokeWidth="3" />
              <line x1="70" y1="75" x2="70" y2="90" stroke="rgba(255,255,255,0.2)" strokeWidth="3" />
              {/* Figure */}
              <line x1="32" y1="70" x2="68" y2="70" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />
              <circle cx="24" cy="70" r="6" fill="#ffffff" />
              <path d="M 68 70 L 76 74 L 76 88" stroke="#ffffff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              {/* Arms Straight */}
              <line x1="42" y1="70" x2="42" y2="30" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" />
              {/* Barbell High */}
              <line x1="15" y1="30" x2="85" y2="30" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
              <rect x="15" y="20" width="6" height="20" rx="2" fill="var(--accent-red)" />
              <rect x="79" y="20" width="6" height="20" rx="2" fill="var(--accent-red)" />
            </svg>
          </div>
          {/* Frame 2: Mid-way lowering */}
          <div style={f2}>
            <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
              <line x1="15" y1="75" x2="85" y2="75" stroke="rgba(255,255,255,0.2)" strokeWidth="4" strokeLinecap="round" />
              <line x1="30" y1="75" x2="30" y2="90" stroke="rgba(255,255,255,0.2)" strokeWidth="3" />
              <line x1="70" y1="75" x2="70" y2="90" stroke="rgba(255,255,255,0.2)" strokeWidth="3" />
              <line x1="32" y1="70" x2="68" y2="70" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />
              <circle cx="24" cy="70" r="6" fill="#ffffff" />
              <path d="M 68 70 L 76 74 L 76 88" stroke="#ffffff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              {/* Arms Bent */}
              <path d="M 42 70 L 32 60 L 42 50" stroke="#ffffff" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              {/* Barbell Mid */}
              <line x1="15" y1="50" x2="85" y2="50" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
              <rect x="15" y="40" width="6" height="20" rx="2" fill="var(--accent-red)" />
              <rect x="79" y="40" width="6" height="20" rx="2" fill="var(--accent-red)" />
            </svg>
          </div>
          {/* Frame 3: Chest Touch */}
          <div style={f3}>
            <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
              <line x1="15" y1="75" x2="85" y2="75" stroke="rgba(255,255,255,0.2)" strokeWidth="4" strokeLinecap="round" />
              <line x1="30" y1="75" x2="30" y2="90" stroke="rgba(255,255,255,0.2)" strokeWidth="3" />
              <line x1="70" y1="75" x2="70" y2="90" stroke="rgba(255,255,255,0.2)" strokeWidth="3" />
              <line x1="32" y1="70" x2="68" y2="70" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />
              <circle cx="24" cy="70" r="6" fill="#ffffff" />
              <path d="M 68 70 L 76 74 L 76 88" stroke="#ffffff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              {/* Arms Fully Bent */}
              <path d="M 42 70 L 26 73 L 42 66" stroke="#ffffff" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              {/* Barbell Low */}
              <line x1="15" y1="66" x2="85" y2="66" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
              <rect x="15" y="56" width="6" height="20" rx="2" fill="var(--accent-red)" />
              <rect x="79" y="56" width="6" height="20" rx="2" fill="var(--accent-red)" />
            </svg>
          </div>
        </>
      )}

      {/* Pull Animation (Pullups) */}
      {type === 'pull' && (
        <>
          {/* Frame 1: Hang */}
          <div style={f1}>
            <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
              {/* Bar */}
              <line x1="15" y1="20" x2="85" y2="20" stroke="rgba(255,255,255,0.2)" strokeWidth="4" strokeLinecap="round" />
              {/* Arms Straight */}
              <line x1="42" y1="38" x2="42" y2="20" stroke="#ffffff" strokeWidth="3" />
              <line x1="58" y1="38" x2="58" y2="20" stroke="#ffffff" strokeWidth="3" />
              {/* Body */}
              <line x1="42" y1="38" x2="58" y2="38" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />
              <line x1="50" y1="38" x2="50" y2="65" stroke="#ffffff" strokeWidth="4" />
              <circle cx="50" cy="28" r="6" fill="#ffffff" />
              <path d="M 50 65 L 45 88 M 50 65 L 55 88" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>
          {/* Frame 2: Pulling */}
          <div style={f2}>
            <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
              <line x1="15" y1="20" x2="85" y2="20" stroke="rgba(255,255,255,0.2)" strokeWidth="4" strokeLinecap="round" />
              {/* Arms Bent */}
              <path d="M 42 28 L 34 30 L 42 20" stroke="#ffffff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M 58 28 L 66 30 L 58 20" stroke="#ffffff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              {/* Body Raised */}
              <line x1="42" y1="28" x2="58" y2="28" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />
              <line x1="50" y1="28" x2="50" y2="55" stroke="#ffffff" strokeWidth="4" />
              <circle cx="50" cy="18" r="6" fill="#ffffff" />
              <path d="M 50 55 L 45 78 M 50 55 L 55 78" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>
          {/* Frame 3: Chin Over Bar */}
          <div style={f3}>
            <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
              <line x1="15" y1="20" x2="85" y2="20" stroke="rgba(255,255,255,0.2)" strokeWidth="4" strokeLinecap="round" />
              {/* Arms Fully Bent */}
              <path d="M 42 22 L 32 26 L 42 20" stroke="#ffffff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M 58 22 L 68 26 L 58 20" stroke="#ffffff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              {/* Body Max Raised */}
              <line x1="42" y1="22" x2="58" y2="22" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />
              <line x1="50" y1="22" x2="50" y2="48" stroke="#ffffff" strokeWidth="4" />
              <circle cx="50" cy="12" r="6" fill="#ffffff" />
              <path d="M 50 48 L 45 70 M 50 48 L 55 70" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>
        </>
      )}

      {/* Squat Animation */}
      {type === 'squat' && (
        <>
          {/* Frame 1: Setup Stand */}
          <div style={f1}>
            <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
              {/* Floor */}
              <line x1="10" y1="90" x2="90" y2="90" stroke="rgba(255,255,255,0.2)" strokeWidth="3" strokeLinecap="round" />
              {/* Figure standing */}
              <circle cx="45" cy="20" r="6" fill="#ffffff" />
              <line x1="45" y1="26" x2="45" y2="50" stroke="#ffffff" strokeWidth="4.5" strokeLinecap="round" />
              <line x1="45" y1="50" x2="45" y2="68" stroke="#ffffff" strokeWidth="4.5" />
              <line x1="45" y1="68" x2="45" y2="87" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" />
              {/* Barbell on shoulder */}
              <line x1="15" y1="30" x2="75" y2="30" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
              <rect x="15" y="20" width="6" height="20" rx="2" fill="var(--accent-red)" />
              <rect x="69" y="20" width="6" height="20" rx="2" fill="var(--accent-red)" />
            </svg>
          </div>
          {/* Frame 2: Half Down */}
          <div style={f2}>
            <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
              <line x1="10" y1="90" x2="90" y2="90" stroke="rgba(255,255,255,0.2)" strokeWidth="3" strokeLinecap="round" />
              {/* Squatting - Hips Hinge */}
              <circle cx="38" cy="38" r="6" fill="#ffffff" />
              <line x1="38" y1="44" x2="38" y2="63" stroke="#ffffff" strokeWidth="4.5" strokeLinecap="round" />
              <line x1="38" y1="63" x2="52" y2="68" stroke="#ffffff" strokeWidth="4.5" />
              <line x1="52" y1="68" x2="45" y2="87" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" />
              {/* Barbell on shoulder */}
              <line x1="8" y1="48" x2="68" y2="48" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
              <rect x="8" y="38" width="6" height="20" rx="2" fill="var(--accent-red)" />
              <rect x="62" y="38" width="6" height="20" rx="2" fill="var(--accent-red)" />
            </svg>
          </div>
          {/* Frame 3: Parallel Squat */}
          <div style={f3}>
            <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
              <line x1="10" y1="90" x2="90" y2="90" stroke="rgba(255,255,255,0.2)" strokeWidth="3" strokeLinecap="round" />
              {/* Full Squat */}
              <circle cx="33" cy="46" r="6" fill="#ffffff" />
              <line x1="33" y1="52" x2="28" y2="68" stroke="#ffffff" strokeWidth="4.5" strokeLinecap="round" />
              <line x1="28" y1="68" x2="58" y2="68" stroke="#ffffff" strokeWidth="4.5" />
              <line x1="58" y1="68" x2="45" y2="87" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" />
              {/* Barbell on shoulder */}
              <line x1="3" y1="56" x2="63" y2="56" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
              <rect x="3" y="46" width="6" height="20" rx="2" fill="var(--accent-red)" />
              <rect x="57" y="46" width="6" height="20" rx="2" fill="var(--accent-red)" />
            </svg>
          </div>
        </>
      )}

      {/* Deadlift Animation */}
      {type === 'deadlift' && (
        <>
          {/* Frame 1: Setup/Hinge */}
          <div style={f1}>
            <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
              <line x1="10" y1="90" x2="90" y2="90" stroke="rgba(255,255,255,0.2)" strokeWidth="3" strokeLinecap="round" />
              {/* Hinged Body */}
              <circle cx="55" cy="42" r="6" fill="#ffffff" />
              <line x1="50" y1="48" x2="36" y2="62" stroke="#ffffff" strokeWidth="4.5" strokeLinecap="round" />
              <path d="M 36 62 L 44 75 L 42 87" stroke="#ffffff" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="50" y1="48" x2="55" y2="84" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
              {/* Barbell Low */}
              <line x1="25" y1="84" x2="85" y2="84" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
              <circle cx="28" cy="84" r="8" fill="var(--accent-red)" />
              <circle cx="82" cy="84" r="8" fill="var(--accent-red)" />
            </svg>
          </div>
          {/* Frame 2: Mid pull */}
          <div style={f2}>
            <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
              <line x1="10" y1="90" x2="90" y2="90" stroke="rgba(255,255,255,0.2)" strokeWidth="3" strokeLinecap="round" />
              {/* Mid Pull Body */}
              <circle cx="50" cy="26" r="6" fill="#ffffff" />
              <line x1="48" y1="34" x2="38" y2="52" stroke="#ffffff" strokeWidth="4.5" strokeLinecap="round" />
              <path d="M 38 52 L 42 75 L 42 87" stroke="#ffffff" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="48" y1="34" x2="50" y2="68" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
              {/* Barbell Knee Height */}
              <line x1="20" y1="68" x2="80" y2="68" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
              <circle cx="23" cy="68" r="8" fill="var(--accent-red)" />
              <circle cx="77" cy="68" r="8" fill="var(--accent-red)" />
            </svg>
          </div>
          {/* Frame 3: Lockout */}
          <div style={f3}>
            <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
              <line x1="10" y1="90" x2="90" y2="90" stroke="rgba(255,255,255,0.2)" strokeWidth="3" strokeLinecap="round" />
              {/* Upright Body */}
              <circle cx="45" cy="16" r="6" fill="#ffffff" />
              <line x1="45" y1="26" x2="45" y2="50" stroke="#ffffff" strokeWidth="4.5" strokeLinecap="round" />
              <path d="M 45 50 L 45 68 L 45 87" stroke="#ffffff" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="45" y1="26" x2="45" y2="58" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
              {/* Barbell High */}
              <line x1="15" y1="58" x2="75" y2="58" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
              <circle cx="18" cy="58" r="8" fill="var(--accent-red)" />
              <circle cx="72" cy="58" r="8" fill="var(--accent-red)" />
            </svg>
          </div>
        </>
      )}

      {/* Curl Animation (Bicep Curl) */}
      {type === 'curl' && (
        <>
          {/* Frame 1: Arm Straight Down */}
          <div style={f1}>
            <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
              {/* Shoulder & Body */}
              <line x1="40" y1="35" x2="40" y2="62" stroke="#ffffff" strokeWidth="4.5" strokeLinecap="round" />
              {/* Forearm straight */}
              <line x1="40" y1="62" x2="40" y2="84" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" />
              {/* Dumbbell */}
              <line x1="28" y1="84" x2="52" y2="84" stroke="#ffffff" strokeWidth="3" />
              <rect x="28" y="78" width="4" height="12" rx="1" fill="var(--accent-red)" />
              <rect x="48" y="78" width="4" height="12" rx="1" fill="var(--accent-red)" />
            </svg>
          </div>
          {/* Frame 2: Arm Bent 90 Deg */}
          <div style={f2}>
            <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
              <line x1="40" y1="35" x2="40" y2="62" stroke="#ffffff" strokeWidth="4.5" strokeLinecap="round" />
              {/* Forearm 90 deg */}
              <line x1="40" y1="62" x2="60" y2="62" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" />
              {/* Dumbbell */}
              <line x1="60" y1="50" x2="60" y2="74" stroke="#ffffff" strokeWidth="3" />
              <rect x="54" y="50" width="12" height="4" rx="1" fill="var(--accent-red)" />
              <rect x="54" y="70" width="12" height="4" rx="1" fill="var(--accent-red)" />
            </svg>
          </div>
          {/* Frame 3: Fully Curled */}
          <div style={f3}>
            <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
              <line x1="40" y1="35" x2="40" y2="62" stroke="#ffffff" strokeWidth="4.5" strokeLinecap="round" />
              {/* Forearm fully curled up */}
              <line x1="40" y1="62" x2="52" y2="45" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" />
              {/* Dumbbell */}
              <line x1="40" y1="45" x2="64" y2="45" stroke="#ffffff" strokeWidth="3" />
              <rect x="40" y="39" width="4" height="12" rx="1" fill="var(--accent-red)" />
              <rect x="60" y="39" width="4" height="12" rx="1" fill="var(--accent-red)" />
            </svg>
          </div>
        </>
      )}

      {/* Twist Animation (Russian Twists) */}
      {type === 'twist' && (
        <>
          {/* Frame 1: Twist Left */}
          <div style={f1}>
            <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
              <line x1="10" y1="85" x2="90" y2="85" stroke="rgba(255,255,255,0.15)" strokeWidth="3" />
              {/* Seated Body */}
              <circle cx="26" cy="42" r="6" fill="#ffffff" />
              <line x1="45" y1="80" x2="30" y2="52" stroke="#ffffff" strokeWidth="4.5" strokeLinecap="round" />
              <path d="M 45 80 L 62 60 L 75 68" stroke="#ffffff" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              {/* Arms Twist Left */}
              <line x1="30" y1="52" x2="22" y2="68" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
              <circle cx="22" cy="68" r="6" fill="var(--accent-red)" />
            </svg>
          </div>
          {/* Frame 2: Twist Center */}
          <div style={f2}>
            <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
              <line x1="10" y1="85" x2="90" y2="85" stroke="rgba(255,255,255,0.15)" strokeWidth="3" />
              <circle cx="26" cy="42" r="6" fill="#ffffff" />
              <line x1="45" y1="80" x2="30" y2="52" stroke="#ffffff" strokeWidth="4.5" strokeLinecap="round" />
              <path d="M 45 80 L 62 60 L 75 68" stroke="#ffffff" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              {/* Arms Twist Center */}
              <line x1="30" y1="52" x2="45" y2="58" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
              <circle cx="45" cy="58" r="6" fill="var(--accent-red)" />
            </svg>
          </div>
          {/* Frame 3: Twist Right */}
          <div style={f3}>
            <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
              <line x1="10" y1="85" x2="90" y2="85" stroke="rgba(255,255,255,0.15)" strokeWidth="3" />
              <circle cx="26" cy="42" r="6" fill="#ffffff" />
              <line x1="45" y1="80" x2="30" y2="52" stroke="#ffffff" strokeWidth="4.5" strokeLinecap="round" />
              <path d="M 45 80 L 62 60 L 75 68" stroke="#ffffff" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              {/* Arms Twist Right */}
              <line x1="30" y1="52" x2="58" y2="68" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
              <circle cx="58" cy="68" r="6" fill="var(--accent-red)" />
            </svg>
          </div>
        </>
      )}

      {/* Plank Hold Animation (Static anatomical view with focus points) */}
      {type === 'plank' && (
        <>
          {/* Frame 1: Setup */}
          <div style={f1}>
            <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
              <line x1="10" y1="85" x2="90" y2="85" stroke="rgba(255,255,255,0.15)" strokeWidth="3" />
              {/* Kneeling Figure */}
              <circle cx="30" cy="48" r="6" fill="#ffffff" />
              <line x1="38" y1="55" x2="60" y2="68" stroke="#ffffff" strokeWidth="4.5" strokeLinecap="round" />
              <line x1="38" y1="55" x2="35" y2="85" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
              <path d="M 60 68 L 65 85 L 75 85" stroke="#ffffff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          {/* Frame 2: Plank Position */}
          <div style={f2}>
            <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
              <line x1="10" y1="85" x2="90" y2="85" stroke="rgba(255,255,255,0.15)" strokeWidth="3" />
              {/* Plank Figure */}
              <circle cx="30" cy="54" r="6" fill="#ffffff" />
              <line x1="30" y1="85" x2="42" y2="85" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
              <line x1="42" y1="85" x2="40" y2="60" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
              <line x1="40" y1="60" x2="80" y2="80" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />
            </svg>
          </div>
          {/* Frame 3: Peak Tension Target */}
          <div style={f3}>
            <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
              <line x1="10" y1="85" x2="90" y2="85" stroke="rgba(255,255,255,0.15)" strokeWidth="3" />
              <circle cx="30" cy="54" r="6" fill="#ffffff" />
              <line x1="30" y1="85" x2="42" y2="85" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
              <line x1="42" y1="85" x2="40" y2="60" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
              <line x1="40" y1="60" x2="80" y2="80" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />
              {/* Glowing Target Ring on Core */}
              <g style={{ transformOrigin: '55px 70px', animation: 'pulseTarget 1.2s infinite ease-in-out' }}>
                <circle cx="55" cy="70" r="7" stroke="var(--accent-red)" strokeWidth="3.5" fill="rgba(230,0,0,0.15)" />
              </g>
            </svg>
          </div>
        </>
      )}

      {/* Cardio Animation */}
      {type === 'cardio' && (
        <>
          {/* Frame 1: Stride Left */}
          <div style={f1}>
            <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
              <line x1="15" y1="85" x2="85" y2="85" stroke="rgba(255,255,255,0.15)" strokeWidth="3" strokeLinecap="round" />
              {/* Runner Body */}
              <circle cx="52" cy="28" r="6" fill="#ffffff" />
              <line x1="50" y1="34" x2="45" y2="52" stroke="#ffffff" strokeWidth="4.5" strokeLinecap="round" />
              {/* Left leg forward, Right leg back */}
              <path d="M 45 52 L 60 64 L 68 82" stroke="#ffffff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M 45 52 L 34 60 L 28 76" stroke="#ffffff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          {/* Frame 2: Mid-Stride */}
          <div style={f2}>
            <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
              <line x1="15" y1="85" x2="85" y2="85" stroke="rgba(255,255,255,0.15)" strokeWidth="3" strokeLinecap="round" />
              <circle cx="52" cy="28" r="6" fill="#ffffff" />
              <line x1="50" y1="34" x2="45" y2="52" stroke="#ffffff" strokeWidth="4.5" strokeLinecap="round" />
              {/* Mid stride crossing feet */}
              <path d="M 45 52 L 46 68 L 46 82" stroke="#ffffff" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M 45 52 L 44 68 L 44 82" stroke="#ffffff" strokeWidth="3" fill="none" strokeLinecap="round" />
            </svg>
          </div>
          {/* Frame 3: Stride Right */}
          <div style={f3}>
            <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
              <line x1="15" y1="85" x2="85" y2="85" stroke="rgba(255,255,255,0.15)" strokeWidth="3" strokeLinecap="round" />
              <circle cx="52" cy="28" r="6" fill="#ffffff" />
              <line x1="50" y1="34" x2="45" y2="52" stroke="#ffffff" strokeWidth="4.5" strokeLinecap="round" />
              {/* Right leg forward, Left leg back */}
              <path d="M 45 52 L 34 60 L 28 76" stroke="#ffffff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M 45 52 L 60 64 L 68 82" stroke="#ffffff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </>
      )}

      {/* Stretch Animation (Foam Roller) */}
      {type === 'stretch' && (
        <>
          {/* Frame 1: Roller Left */}
          <div style={f1}>
            <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
              <line x1="10" y1="85" x2="90" y2="85" stroke="rgba(255,255,255,0.15)" strokeWidth="2" strokeLinecap="round" />
              {/* Roller */}
              <circle cx="35" cy="80" r="5" fill="var(--accent-red)" />
              {/* Lying figure */}
              <circle cx="20" cy="68" r="5" fill="#ffffff" />
              <path d="M 20 68 L 35 74 L 58 80" stroke="#ffffff" strokeWidth="4" fill="none" strokeLinecap="round" />
            </svg>
          </div>
          {/* Frame 2: Roller Center */}
          <div style={f2}>
            <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
              <line x1="10" y1="85" x2="90" y2="85" stroke="rgba(255,255,255,0.15)" strokeWidth="2" strokeLinecap="round" />
              <circle cx="48" cy="80" r="5" fill="var(--accent-red)" />
              <circle cx="33" cy="68" r="5" fill="#ffffff" />
              <path d="M 33 68 L 48 74 L 71 80" stroke="#ffffff" strokeWidth="4" fill="none" strokeLinecap="round" />
            </svg>
          </div>
          {/* Frame 3: Roller Right */}
          <div style={f3}>
            <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
              <line x1="10" y1="85" x2="90" y2="85" stroke="rgba(255,255,255,0.15)" strokeWidth="2" strokeLinecap="round" />
              <circle cx="60" cy="80" r="5" fill="var(--accent-red)" />
              <circle cx="45" cy="68" r="5" fill="#ffffff" />
              <path d="M 45 68 L 60 74 L 83 80" stroke="#ffffff" strokeWidth="4" fill="none" strokeLinecap="round" />
            </svg>
          </div>
        </>
      )}
    </div>
  );
}

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
  showConfirm,
  completedDays = []
}) {
  const routines = weeklyWorkoutPlan && weeklyWorkoutPlan.length > 0 ? weeklyWorkoutPlan : WORKOUT_ROUTINES;
  const currentRoutine = routines[selectedDayIndex] || routines[0];

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' | 'edit'
  const [editingExIdx, setEditingExIdx] = useState(null);
  const [expandedIndex, setExpandedIndex] = useState(null);

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
          const isCompleted = completedDays.includes(idx);
          return (
            <button
              key={idx}
              type="button"
              onClick={() => {
                onSelectDay(idx);
                setExpandedIndex(null);
              }}
              className={`weekday-btn ${isActive ? 'active' : ''}`}
              id={`routine-day-select-${idx}`}
              style={{ position: 'relative' }}
            >
              <span className="weekday-name">{routine.dayName}</span>
              <span className="weekday-num">{routine.dayNumber}</span>
              {isActive && <div className="weekday-indicator" />}
              {isCompleted && (
                <span 
                  style={{ 
                    position: 'absolute', 
                    top: '4px', 
                    right: '4px', 
                    color: 'var(--accent-coral)', 
                    fontSize: '0.65rem',
                    fontWeight: 'bold' 
                  }}
                  title="Workout Completed"
                >
                  ✓
                </span>
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
          {currentRoutine.exercises.map((ex, idx) => {
            const isExpanded = expandedIndex === idx;
            const guide = EXERCISE_GUIDES[ex.name.toLowerCase().trim()] || {
              animation: 'press',
              muscles: ['Target Muscle'],
              steps: [
                'Perform the exercise under controlled movement with proper form.',
                'Focus on mind-muscle connection and full range of motion.'
              ],
              breathing: 'Inhale on the eccentric phase (lowering), exhale on the concentric phase (lifting).'
            };

            return (
              <div
                key={idx}
                onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                style={{
                  background: '#090a0e',
                  border: isExpanded ? '1.5px solid var(--accent-red)' : '1px solid var(--glass-border)',
                  borderRadius: '12px',
                  padding: '1.25rem 1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s, background 0.2s',
                  boxShadow: isExpanded ? '0 10px 30px rgba(0,0,0,0.4), 0 0 15px rgba(230,0,0,0.15)' : 'none'
                }}
                onMouseEnter={e => {
                  if (!isExpanded) {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.01)';
                  }
                }}
                onMouseLeave={e => {
                  if (!isExpanded) {
                    e.currentTarget.style.borderColor = 'var(--glass-border)';
                    e.currentTarget.style.background = '#090a0e';
                  }
                }}
              >
                {/* Header Row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', flexWrap: 'wrap', gap: '1rem' }}>
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
                      <h3 style={{ fontSize: '1.3rem', fontWeight: '700', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {ex.name}
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2.5" style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </h3>
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
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenEdit(ex, idx);
                        }}
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
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteClick(idx);
                        }}
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

                {/* Expanded Details Section */}
                {isExpanded && (
                  <div 
                    style={{ 
                      marginTop: '1.25rem', 
                      paddingTop: '1.25rem', 
                      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                      display: 'flex',
                      gap: '2rem',
                      flexWrap: 'wrap',
                      width: '100%',
                      animation: 'fadeIn 0.2s ease'
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Visual Animation */}
                    <div style={{ flex: '0 0 150px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <ExerciseVisual type={guide.animation} />
                      <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', marginTop: '0.5rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Visual Guide
                      </span>
                    </div>

                    {/* Text Details */}
                    <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                      {/* Muscle Tags */}
                      <div>
                        <h4 style={{ fontSize: '0.75rem', fontWeight: '800', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', marginBottom: '0.35rem', letterSpacing: '0.05em' }}>Target Muscles</h4>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                          {guide.muscles.map((m, mIdx) => (
                            <span key={mIdx} style={{ fontSize: '0.7rem', fontWeight: '600', background: 'rgba(255, 255, 255, 0.05)', color: '#ffffff', padding: '0.2rem 0.6rem', borderRadius: '4px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                              {m}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Steps */}
                      <div>
                        <h4 style={{ fontSize: '0.75rem', fontWeight: '800', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', marginBottom: '0.35rem', letterSpacing: '0.05em' }}>How to Perform</h4>
                        <ol style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)', paddingLeft: '1.2rem', lineHeight: '1.45', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                          {guide.steps.map((step, sIdx) => (
                            <li key={sIdx}>{step}</li>
                          ))}
                        </ol>
                      </div>

                      {/* Breathing */}
                      {guide.breathing && (
                        <div style={{ background: 'rgba(230, 0, 0, 0.05)', borderLeft: '3px solid var(--accent-red)', padding: '0.6rem 0.85rem', borderRadius: '4px' }}>
                          <span style={{ fontSize: '0.72rem', fontWeight: '800', color: 'var(--accent-red)', textTransform: 'uppercase', display: 'block', marginBottom: '0.15rem', letterSpacing: '0.05em' }}>Breathing Tip</span>
                          <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.85)', margin: 0, lineHeight: '1.4' }}>{guide.breathing}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
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
