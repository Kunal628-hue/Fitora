import React, { useState } from 'react';
import { RECIPES_CATALOG } from '../data/recipesData';
import { generateAiRecipe } from '../utils/ai';

import ribeyeSteakBowl from '../assets/recipes/ribeye_steak_bowl.png';
import glazedSalmonDish from '../assets/recipes/glazed_salmon_dish.png';
import healthyBreakfastBowl from '../assets/recipes/healthy_breakfast_bowl.png';
import shreddedBuffaloChicken from '../assets/recipes/shredded_buffalo_chicken.png';
import chocolateProteinMousse from '../assets/recipes/chocolate_protein_mousse.png';
import pestoPerformancePasta from '../assets/recipes/pesto_performance_pasta.png';

const localImages = {
  c_ribeye_bowl: ribeyeSteakBowl,
  c_arctic_salmon: glazedSalmonDish,
  c_breakfast_bowl: healthyBreakfastBowl,
  c_buffalo_shred: shreddedBuffaloChicken,
  c_protein_mousse: chocolateProteinMousse,
  c_pesto_pasta: pestoPerformancePasta,
};

// hand-picked professional stock photography from Unsplash based on keywords
const getUnsplashUrl = (name = '', description = '') => {
  const text = (name + ' ' + description).toLowerCase();

  if (text.includes('paneer') || text.includes('cottage cheese')) {
    return 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80';
  }
  if (text.includes('tofu') || text.includes('soy') || text.includes('soya')) {
    return 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80';
  }
  if (text.includes('salmon') || text.includes('fish') || text.includes('tuna') || text.includes('shrimp')) {
    return 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80';
  }
  if (text.includes('chicken') || text.includes('poultry') || text.includes('turkey') || text.includes('tikka')) {
    return 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=600&q=80';
  }
  if (text.includes('steak') || text.includes('beef') || text.includes('ribeye') || text.includes('meat') || text.includes('sirloin')) {
    return 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=600&q=80';
  }
  if (text.includes('salad') || text.includes('greens') || text.includes('spinach') || text.includes('vegetable') || text.includes('kale')) {
    return 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80';
  }
  if (text.includes('pasta') || text.includes('penne') || text.includes('spaghetti') || text.includes('noodle')) {
    return 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80';
  }
  if (text.includes('chana') || text.includes('chickpea') || text.includes('hummus') || text.includes('garbanzo')) {
    return 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80';
  }
  if (text.includes('soup') || text.includes('lentil') || text.includes('dal') || text.includes('broth') || text.includes('khichdi') || text.includes('curry')) {
    return 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80';
  }
  if (text.includes('oats') || text.includes('oatmeal') || text.includes('porridge') || text.includes('chia') || text.includes('berries') || text.includes('breakfast') || text.includes('egg')) {
    return 'https://images.unsplash.com/photo-1517881917430-e70dfb3610aa?auto=format&fit=crop&w=600&q=80';
  }
  if (text.includes('pancake') || text.includes('mousse') || text.includes('chocolate') || text.includes('dessert') || text.includes('sweet') || text.includes('honey')) {
    return 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=600&q=80';
  }

  // Default generic premium healthy food image
  return 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=600&q=80';
};

/**
 * RecipesCatalog - Renders the catalog grid with professional images, search,
 * Veg/Non-Veg toggle filtering, and interactive AI recipe generation.
 * Guaranteed to display at least 7 recipes at once by backfilling matching diet options.
 */
export default function RecipesCatalog({ onViewDetails, apiKey, provider, model }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [dietType, setDietType] = useState('non'); // 'veg' | 'non'
  const [aiSearchResults, setAiSearchResults] = useState(null); // Array of 7 custom recipes or null
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Helper to determine if a recipe is vegetarian
  const isVegRecipe = (recipe) => {
    if (recipe.id.startsWith('c_custom_')) {
      return recipe.diets?.includes('veg') || recipe.tag.toLowerCase().includes('veg');
    }
    // Catalog defaults classification
    const vegIds = ['c_protein_mousse', 'c_paneer_tikka', 'c_tofu_stir_fry', 'c_chana_masala', 'c_lentil_pasta', 'c_soya_curry', 'c_moong_dal'];
    return vegIds.includes(recipe.id);
  };

  // Helper to identify if a recipe matches the current search query
  const isDirectSearchMatch = (recipe) => {
    if (searchQuery.trim() === '') return false;
    const q = searchQuery.toLowerCase();
    const nameMatch = recipe.name.toLowerCase().includes(q);
    const descMatch = recipe.description.toLowerCase().includes(q);
    const tagMatch = recipe.tag.toLowerCase().includes(q);
    const ingredientMatch = recipe.ingredients?.some(ing => ing.name.toLowerCase().includes(q));
    return nameMatch || descMatch || tagMatch || ingredientMatch;
  };

  // Get default recipes matching chosen diet preference (Veg/Non)
  const defaultDietRecipes = RECIPES_CATALOG.filter(r => {
    const isVeg = isVegRecipe(r);
    return dietType === 'veg' ? isVeg : !isVeg;
  });

  // Calculate final displayed recipes list
  let displayedRecipes = [];
  if (aiSearchResults && searchQuery.trim() !== '') {
    // Show strictly the 7 generated AI search results
    displayedRecipes = aiSearchResults;
  } else if (searchQuery.trim() !== '') {
    // If they typed a filter query but didn't run Ask AI yet, show matches from default diet recipes
    displayedRecipes = defaultDietRecipes.filter(recipe => isDirectSearchMatch(recipe));
  } else {
    // If search is empty, show all default recipes for chosen diet type (exactly 7 recipes visible)
    displayedRecipes = defaultDietRecipes;
  }

  const handleAiSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setErrorMsg('');
    setAiSearchResults(null);

    try {
      if (!apiKey) {
        throw new Error("AI API Key is missing. Please set VITE_GROQ_API_KEY in your .env configuration file.");
      }

      const generatedList = await generateAiRecipe({
        query: searchQuery,
        diet: dietType,
        apiKey,
        provider,
        model
      });

      if (Array.isArray(generatedList) && generatedList.length > 0) {
        // Process and tag the 7 generated recipes
        const processed = generatedList.map((recipe, index) => ({
          ...recipe,
          id: recipe.id || `c_custom_${Date.now()}_${index}`,
          diets: [dietType],
          tag: dietType === 'veg' ? 'AI VEG RECIPE' : 'AI NON-VEG RECIPE'
        }));
        setAiSearchResults(processed);
      } else {
        throw new Error("AI did not return a valid list of recipes. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || "Failed to generate AI recipes. Please check your network and API settings.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderRecipeImage = (recipe) => {
    const imgSrc = localImages[recipe.id];
    if (imgSrc) {
      return (
        <img 
          src={imgSrc} 
          alt={recipe.name}
          style={{ 
            width: '100%', 
            height: '220px', 
            objectFit: 'cover',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
          }} 
        />
      );
    }

    // Dynamic high-resolution photography match based on keywords
    const url = getUnsplashUrl(recipe.name, recipe.description);
    return (
      <img 
        src={url} 
        alt={recipe.name}
        style={{ 
          width: '100%', 
          height: '220px', 
          objectFit: 'cover',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
        }} 
      />
    );
  };

  return (
    <div className="step-container" style={{ margin: '1rem 0' }}>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      {/* Title Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: '900', textTransform: 'uppercase', lineHeight: '1' }}>
          Fuel Your <span style={{ color: 'var(--accent-coral)', textShadow: '0 0 15px rgba(255, 125, 112, 0.2)' }}>Engine</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', marginTop: '0.75rem', maxWidth: '700px' }}>
          Precision nutrition for high-intensity training. Every macro accounted for. Every calorie optimized for performance.
        </p>
      </div>

      {/* Search and AI Generator Bar */}
      <form 
        onSubmit={handleAiSearch}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '1rem',
          padding: '1.25rem',
          borderRadius: '16px',
          background: 'rgba(20, 22, 30, 0.6)',
          border: '1px solid var(--glass-border)',
          marginBottom: '2rem',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)'
        }}
      >
        <div style={{ flex: 1, minWidth: '280px' }}>
          <input
            type="text"
            placeholder="Search local or ask AI to generate recipes (e.g. 'high protein chickpea bowl')..."
            value={searchQuery}
            onChange={(e) => {
              const val = e.target.value;
              setSearchQuery(val);
              if (val.trim() === '') {
                setAiSearchResults(null);
              }
            }}
            style={{
              width: '100%',
              padding: '0.75rem 1.25rem',
              borderRadius: '30px',
              border: '1px solid var(--glass-border)',
              background: 'rgba(255, 255, 255, 0.03)',
              color: '#ffffff',
              fontSize: '0.95rem',
              outline: 'none',
              transition: 'border-color 0.2s ease'
            }}
          />
        </div>

        {/* Diet Selector Toggle Switch */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Diet:</span>
          <div style={{ display: 'flex', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '30px', padding: '0.2rem', border: '1px solid var(--glass-border)' }}>
            <button
              type="button"
              onClick={() => {
                setDietType('veg');
                setSearchQuery('');
                setAiSearchResults(null);
              }}
              style={{
                padding: '0.45rem 1.25rem',
                borderRadius: '20px',
                border: 'none',
                fontSize: '0.8rem',
                fontWeight: '700',
                cursor: 'pointer',
                background: dietType === 'veg' ? 'var(--accent-coral)' : 'transparent',
                color: dietType === 'veg' ? '#000000' : 'var(--text-secondary)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              Veg
            </button>
            <button
              type="button"
              onClick={() => {
                setDietType('non');
                setSearchQuery('');
                setAiSearchResults(null);
              }}
              style={{
                padding: '0.45rem 1.25rem',
                borderRadius: '20px',
                border: 'none',
                fontSize: '0.8rem',
                fontWeight: '700',
                cursor: 'pointer',
                background: dietType === 'non' ? 'var(--accent-coral)' : 'transparent',
                color: dietType === 'non' ? '#000000' : 'var(--text-secondary)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              Non-Veg
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={isLoading || !searchQuery.trim()}
          style={{
            borderRadius: '30px',
            padding: '0.75rem 2rem',
            background: 'var(--accent-coral)',
            color: '#000000',
            fontWeight: '700',
            border: 'none',
            cursor: searchQuery.trim() ? 'pointer' : 'not-allowed',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'opacity 0.2s ease',
            opacity: searchQuery.trim() ? 1 : 0.5
          }}
        >
          {isLoading ? (
            <>
              <span className="spinner" style={{ display: 'inline-block', width: '12px', height: '12px', border: '2px solid #000', borderTop: '2px solid transparent', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }} />
              Generating...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-1.3l-.85-.6C8.74 13.16 8 11.14 8 9c0-2.21 1.79-4 4-4s4 1.79 4 4c0 2.14-.74 4.16-2.15 5.1z"/></svg>
              Ask AI
            </>
          )}
        </button>
      </form>

      {/* Error Alert Display */}
      {errorMsg && (
        <div 
          style={{ 
            padding: '1rem', 
            borderRadius: '8px', 
            background: 'rgba(235, 87, 87, 0.08)', 
            border: '1px solid #eb5757', 
            color: '#eb5757', 
            fontSize: '0.9rem', 
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
          <span style={{ fontWeight: '600' }}>{errorMsg}</span>
        </div>
      )}

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
        {/* Loading Skeleton Card */}
        {isLoading && (
          <div 
            className="glass-panel"
            style={{
              padding: 0,
              borderRadius: '16px',
              overflow: 'hidden',
              background: '#11131a',
              border: '1px dashed rgba(255, 255, 255, 0.15)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '430px'
            }}
          >
            <div style={{ flex: 1 }}>
              <div 
                style={{ 
                  height: '220px', 
                  background: 'linear-gradient(90deg, #161822 25%, #222533 50%, #161822 75%)', 
                  backgroundSize: '200% 100%',
                  animation: 'shimmer 1.5s infinite linear' 
                }} 
              />
              <div style={{ padding: '1.75rem' }}>
                <div style={{ height: '12px', width: '80px', borderRadius: '4px', background: '#1c1e2d', marginBottom: '0.75rem', animation: 'pulse 1.2s infinite ease-in-out' }} />
                <div style={{ height: '24px', width: '180px', borderRadius: '4px', background: '#1c1e2d', marginBottom: '1.25rem', animation: 'pulse 1.2s infinite ease-in-out' }} />
                <div style={{ display: 'flex', gap: '1.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '1.25rem' }}>
                  <div style={{ height: '20px', width: '40px', borderRadius: '4px', background: '#1c1e2d', animation: 'pulse 1.2s infinite ease-in-out' }} />
                  <div style={{ height: '20px', width: '40px', borderRadius: '4px', background: '#1c1e2d', animation: 'pulse 1.2s infinite ease-in-out' }} />
                  <div style={{ height: '20px', width: '40px', borderRadius: '4px', background: '#1c1e2d', animation: 'pulse 1.2s infinite ease-in-out' }} />
                </div>
              </div>
            </div>
            <div style={{ padding: '0 1.75rem 1.75rem 1.75rem' }}>
              <div style={{ height: '36px', borderRadius: '4px', background: '#1c1e2d', animation: 'pulse 1.2s infinite ease-in-out' }} />
            </div>
          </div>
        )}

        {displayedRecipes.map((recipe) => {
          const isDirectMatch = isDirectSearchMatch(recipe);
          return (
            <div 
              key={recipe.id}
              className="glass-panel glass-panel-hover"
              style={{
                padding: 0,
                borderRadius: '16px',
                overflow: 'hidden',
                background: '#11131a',
                border: isDirectMatch ? '1px solid var(--accent-coral)' : '1px solid var(--glass-border)',
                boxShadow: isDirectMatch ? '0 0 15px rgba(255, 125, 112, 0.15)' : 'none',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.3s ease'
              }}
            >
              <div>
                {/* Graphic Food Image */}
                <div style={{ position: 'relative' }}>
                  {renderRecipeImage(recipe)}
                  {isDirectMatch && (
                    <span 
                      style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        background: 'var(--accent-coral)',
                        color: '#000000',
                        fontSize: '0.65rem',
                        fontWeight: '900',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '4px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
                      }}
                    >
                      Search Match
                    </span>
                  )}
                </div>

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

                  {/* Macros Row */}
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
                    color: 'var(--accent-coral)',
                    cursor: 'pointer'
                  }}
                  id={`recipe-view-btn-${recipe.id}`}
                >
                  View Recipe <span style={{ transition: 'transform 0.2s ease' }} className="arrow">→</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
