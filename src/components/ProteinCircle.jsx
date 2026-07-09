import React from 'react';

/**
 * ProteinCircle - Renders the circular protein progress indicator matching Design 1.
 */
export default function ProteinCircle({ logged, target }) {
  const radius = 50;
  const strokeWidth = 10;
  const center = 60;
  const circumference = 2 * Math.PI * radius; // ~314.16

  const percent = Math.min(100, Math.max(0, (logged / target) * 100)) || 0;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  const remaining = Math.max(0, target - logged);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', width: '100%' }}>
      <div style={{ position: 'relative', width: '150px', height: '150px', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center' }}>
        <svg width="150" height="150" viewBox="0 0 120 120" style={{ transform: 'rotate(-90deg)' }}>
          {/* Background circle */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="transparent"
            stroke="rgba(255, 255, 255, 0.05)"
            strokeWidth={strokeWidth}
          />
          {/* Active progress circle */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="transparent"
            stroke="var(--accent-danger)" // Red outline as in Design 1
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.5s ease-out-in' }}
          />
        </svg>
        <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <span style={{ fontSize: '1.6rem', fontWeight: '800' }}>{logged}g</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            of {target}g
          </span>
        </div>
      </div>
      <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
        {remaining > 0 ? `Target: ${remaining}g remaining` : 'Protein Goal Achieved! 🎉'}
      </div>
    </div>
  );
}
