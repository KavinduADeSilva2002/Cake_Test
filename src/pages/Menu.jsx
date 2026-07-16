import React, { useState } from 'react';
import { Search, Star, Cake, Sparkles } from 'lucide-react';
import { CAKES, CATEGORIES } from '../data/cakes';

export default function Menu({ onSelectCake }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter items based on category and search query
  const filteredCakes = CAKES.filter(cake => {
    const matchesCategory = selectedCategory === 'All' || cake.category === selectedCategory;
    const matchesSearch = cake.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          cake.ingredients.some(ing => ing.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container animate-fade-in" style={{ padding: '60px 24px' }}>
      
      {/* Page Title & Intro */}
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <span className="badge" style={{ marginBottom: '12px' }}>
          <Sparkles size={12} style={{ marginRight: '6px' }} />
          Freshly Baked Daily
        </span>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Our Curated Collection</h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: '1.05rem', lineHeight: '1.6' }}>
          Browse our luxury pastries, artisan birthday cakes, signature desserts, and wedding creations. Select any item to customize its size and personalized messages.
        </p>
      </div>

      {/* Search and Filter Section */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '24px',
        marginBottom: '40px'
      }}>
        
        {/* Category Pill Filters */}
        <div style={{
          display: 'flex',
          gap: '8px',
          flexWrap: 'wrap'
        }}>
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              style={{
                padding: '10px 20px',
                borderRadius: 'var(--radius-full)',
                border: '1.5px solid var(--border-color)',
                background: selectedCategory === category ? 'var(--primary)' : 'var(--bg-card)',
                color: selectedCategory === category ? 'var(--text-inverse)' : 'var(--text-secondary)',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
                fontSize: '0.9rem',
                boxShadow: selectedCategory === category ? '0 4px 10px var(--primary-alpha)' : 'none'
              }}
              onMouseEnter={e => {
                if (selectedCategory !== category) {
                  e.currentTarget.style.borderColor = 'var(--primary)';
                  e.currentTarget.style.color = 'var(--primary)';
                }
              }}
              onMouseLeave={e => {
                if (selectedCategory !== category) {
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div style={{
          position: 'relative',
          width: '100%',
          maxWidth: '320px'
        }}>
          <input 
            type="text"
            placeholder="Search cakes or ingredients..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{
              padding: '12px 16px 12px 42px',
              borderRadius: 'var(--radius-full)',
              border: '1.5px solid var(--border-color)',
              background: 'var(--bg-card)',
              color: 'var(--text-primary)',
              width: '100%',
              fontSize: '0.9rem',
              transition: 'all var(--transition-fast)'
            }}
            onFocus={e => {
              e.target.style.borderColor = 'var(--primary)';
              e.target.style.boxShadow = '0 0 0 3px var(--primary-alpha)';
            }}
            onBlur={e => {
              e.target.style.borderColor = 'var(--border-color)';
              e.target.style.boxShadow = 'none';
            }}
          />
          <Search size={18} style={{
            position: 'absolute',
            left: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-secondary)'
          }} />
        </div>

      </div>

      {/* Cakes Menu Grid */}
      {filteredCakes.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '80px 20px',
          background: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-md)',
          border: '1px dashed var(--border-color)'
        }}>
          <Cake size={48} style={{ color: 'var(--text-secondary)', marginBottom: '16px' }} />
          <h3 style={{ margin: '0 0 8px' }}>No delicacies found</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0 }}>
            We couldn't find any cakes matching your current filters. Try searching for different ingredients or reset filters.
          </p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '30px'
        }}>
          {filteredCakes.map(cake => (
            <div 
              key={cake.id}
              className="glass-panel"
              style={{
                background: 'var(--bg-card)',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                position: 'relative'
              }}
              onClick={() => onSelectCake(cake)}
            >
              
              {/* Category tag */}
              <div style={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                zIndex: 5,
                background: 'var(--bg-modal)',
                color: 'var(--primary)',
                fontWeight: '700',
                fontSize: '0.75rem',
                padding: '4px 12px',
                borderRadius: 'var(--radius-full)',
                boxShadow: 'var(--shadow-sm)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                {cake.category}
              </div>

              {/* Card Image */}
              <div style={{ overflow: 'hidden', height: '220px' }}>
                <img 
                  src={cake.image} 
                  alt={cake.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform var(--transition-slow)'
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                />
              </div>

              {/* Card Content */}
              <div style={{ padding: '24px', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px', gap: '8px' }}>
                    <h3 style={{ fontSize: '1.2rem', margin: 0, fontFamily: 'var(--font-sans)', fontWeight: '700', lineHeight: 1.3 }}>
                      {cake.name}
                    </h3>
                    <span style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--primary)', flexShrink: 0 }}>
                      ${cake.price.toFixed(2)}
                    </span>
                  </div>

                  {/* Rating */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '12px' }}>
                    <Star size={14} fill="#ffb300" color="#ffb300" />
                    <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>{cake.rating}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>({cake.reviews})</span>
                  </div>

                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: '0 0 20px' }}>
                    {cake.description.substring(0, 100)}...
                  </p>
                </div>

                {/* Call to Action */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectCake(cake);
                  }}
                  className="btn btn-outline"
                  style={{ width: '100%', padding: '10px' }}
                >
                  Configure & Order
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}
