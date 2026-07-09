import React from 'react';

/**
 * DynamicChart - Donut Chart representing target Macro Ratios matching Design 2.
 */
export default function DynamicChart({ proteinPct, fatPct, carbPct }) {
  // SVG Geometry
  const radius = 50;
  const strokeWidth = 10;
  const center = 60;
  const circumference = 2 * Math.PI * radius; // ~314.16

  // Calculate segment lengths based on percentage
  const proteinLength = (proteinPct / 100) * circumference;
  const fatLength = (fatPct / 100) * circumference;
  const carbLength = (carbPct / 100) * circumference;

  // Calculate offsets (starting from top, which is -90deg rotation in CSS)
  const proteinOffset = 0;
  const fatOffset = -proteinLength;
  const carbOffset = -(proteinLength + fatLength);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', width: '100%' }}>
      <div style={{ position: 'relative', width: '160px', height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="160" height="160" viewBox="0 0 120 120" style={{ transform: 'rotate(-90deg)' }}>
          {/* Background circle track */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="transparent"
            stroke="rgba(255, 255, 255, 0.03)"
            strokeWidth={strokeWidth}
          />

          {/* Carbs Segment (White-Gray in Design 2) */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="transparent"
            stroke="var(--color-carbs)"
            strokeWidth={strokeWidth}
            strokeDasharray={`${carbLength} ${circumference}`}
            strokeDashoffset={carbOffset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dasharray 0.5s ease-out, stroke-dashoffset 0.5s ease-out' }}
          />

          {/* Fats Segment (Brownish Tan in Design 2) */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="transparent"
            stroke="var(--color-fat)"
            strokeWidth={strokeWidth}
            strokeDasharray={`${fatLength} ${circumference}`}
            strokeDashoffset={fatOffset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dasharray 0.5s ease-out, stroke-dashoffset 0.5s ease-out' }}
          />

          {/* Protein Segment (Coral Pink in Design 2) */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="transparent"
            stroke="var(--color-protein)"
            strokeWidth={strokeWidth}
            strokeDasharray={`${proteinLength} ${circumference}`}
            strokeDashoffset={proteinOffset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dasharray 0.5s ease-out, stroke-dashoffset 0.5s ease-out' }}
          />
        </svg>

        {/* Center label from Design 2 */}
        <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total</span>
          <span style={{ fontSize: '1.6rem', fontWeight: '800' }}>100%</span>
        </div>
      </div>

      {/* Legend list matching Design 2 */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-protein)', display: 'inline-block' }} />
            <span style={{ color: 'var(--text-secondary)', textTransform: 'uppercase', fontSize: '0.8rem', fontWeight: '600' }}>Protein</span>
          </div>
          <span style={{ fontWeight: '700' }}>{proteinPct}%</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-carbs)', display: 'inline-block' }} />
            <span style={{ color: 'var(--text-secondary)', textTransform: 'uppercase', fontSize: '0.8rem', fontWeight: '600' }}>Carbs</span>
          </div>
          <span style={{ fontWeight: '700' }}>{carbPct}%</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-fat)', display: 'inline-block' }} />
            <span style={{ color: 'var(--text-secondary)', textTransform: 'uppercase', fontSize: '0.8rem', fontWeight: '600' }}>Fats</span>
          </div>
          <span style={{ fontWeight: '700' }}>{fatPct}%</span>
        </div>
      </div>
    </div>
  );
}
