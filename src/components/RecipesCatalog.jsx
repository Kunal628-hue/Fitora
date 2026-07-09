import React from 'react';
import { RECIPES_CATALOG } from '../data/recipesData';

/**
 * RecipesCatalog - Renders the catalog grid matching the "FUEL YOUR ENGINE" design.
 */
export default function RecipesCatalog({ onViewDetails }) {
  // Simple CSS food visual representations
  const renderMockupImage = (id) => {
    const mockups = {
      c_ribeye_bowl: { bg: 'linear-gradient(135deg, #1f1110 0%, #0c0606 100%)', foodColor: '#8a4f3e', extraColor: '#2e7d32', icon: '🥩' },
      c_arctic_salmon: { bg: 'linear-gradient(135deg, #1c1510 0%, #0d0a08 100%)', foodColor: '#e07a5f', extraColor: '#388e3c', icon: '🐟' },
      c_breakfast_bowl: { bg: 'linear-gradient(135deg, #1a1b15 0%, #0a0b08 100%)', foodColor: '#f4a261', extraColor: '#e76f51', icon: '🥑' },
      c_buffalo_shred: { bg: 'linear-gradient(135deg, #22120e 0%, #0d0605 100%)', foodColor: '#e76f51', extraColor: '#f4a261', icon: '🍗' },
      c_protein_mousse: { bg: 'linear-gradient(135deg, #100b0f 0%, #060406 100%)', foodColor: '#4a2c2a', extraColor: '#c2185b', icon: '🍫' },
      c_pesto_pasta: { bg: 'linear-gradient(135deg, #111b15 0%, #060b08 100%)', foodColor: '#606c38', extraColor: '#dda15e', icon: '🍝' },
    };

    const config = mockups[id] || mockups.c_ribeye_bowl;

    return (
      <div 
        style={{
          background: config.bg,
          height: '200px',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
        }}
      >
        {/* Glow behind icon */}
        <div 
          style={{
            position: 'absolute',
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: config.foodColor,
            opacity: 0.15,
            filter: 'blur(25px)',
            pointerEvents: 'none'
          }}
        />

        {/* Large food emoji / stylized element */}
        <div 
          style={{
            fontSize: '4.5rem',
            filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.6))',
            transform: 'scale(1)',
            transition: 'transform 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          className="recipe-card-icon"
        >
          {config.icon}
        </div>
      </div>
    );
  };

  return (
    <div className="step-container" style={{ margin: '1rem 0' }}>
      {/* Title Header */}
      <div style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: '900', textTransform: 'uppercase', lineHeight: '1' }}>
          Fuel Your <span style={{ color: 'var(--accent-coral)', textShadow: '0 0 15px rgba(255, 125, 112, 0.2)' }}>Engine</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', marginTop: '0.75rem', maxWidth: '700px' }}>
          Precision nutrition for high-intensity training. Every macro accounted for. Every calorie optimized for performance.
        </p>
      </div>

      {/* Recipes Cards Grid */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '2rem',
          marginBottom: '3rem'
        }}
        className="recipes-catalog-grid"
      >
        {RECIPES_CATALOG.map((recipe) => (
          <div 
            key={recipe.id}
            className="glass-panel glass-panel-hover"
            style={{
              padding: 0,
              borderRadius: '16px',
              overflow: 'hidden',
              background: '#11131a',
              border: '1px solid var(--glass-border)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              {/* Graphic Mockup */}
              {renderMockupImage(recipe.id)}

              {/* Card content details */}
              <div style={{ padding: '1.75rem' }}>
                <span 
                  style={{ 
                    fontSize: '0.75rem', 
                    fontWeight: '800', 
                    color: 'var(--accent-coral)', 
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: '0.5rem' 
                  }}
                >
                  {recipe.tag}
                </span>
                <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#ffffff', marginBottom: '1.25rem', lineHeight: '1.2' }}>
                  {recipe.name}
                </h3>

                {/* Macros Row matching screenshot */}
                <div 
                  style={{ 
                    display: 'flex', 
                    borderTop: '1px solid rgba(255, 255, 255, 0.05)', 
                    paddingTop: '1.25rem', 
                    gap: '1.5rem' 
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>
                    <span style={{ fontSize: '0.65rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Prot</span>
                    <span style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--color-protein)' }}>{recipe.macros.protein}g</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>
                    <span style={{ fontSize: '0.65rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Carb</span>
                    <span style={{ fontSize: '1.1rem', fontWeight: '800', color: '#ffffff' }}>{recipe.macros.carbs}g</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>
                    <span style={{ fontSize: '0.65rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Fat</span>
                    <span style={{ fontSize: '1.1rem', fontWeight: '800', color: '#ffffff' }}>{recipe.macros.fat}g</span>
                  </div>
                </div>
              </div>
            </div>

            {/* View Recipe Button */}
            <div style={{ padding: '0 1.75rem 1.75rem 1.75rem' }}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => onViewDetails(recipe)}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  color: 'var(--accent-coral)'
                }}
                id={`recipe-view-btn-${recipe.id}`}
              >
                View Recipe <span style={{ transition: 'transform 0.2s ease' }} className="arrow">→</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
