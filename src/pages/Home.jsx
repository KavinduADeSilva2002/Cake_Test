import React from 'react';
import { ChefHat, Truck, Sparkles, Award, Star, ArrowRight, Heart } from 'lucide-react';
import { CAKES } from '../data/cakes';

export default function Home({ setCurrentPage, onSelectCake }) {
  // Get 3 best selling/highest rated cakes
  const bestSellers = CAKES.slice(0, 3);

  const testimonials = [
    {
      id: 1,
      name: 'Isabella Mercer',
      role: 'Bride',
      quote: 'The wedding cake from Sweet Symphony was an absolute dream. Not only was it visually breathtaking, but the elderflower and vanilla flavor combination left our guests asking for seconds!',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100'
    },
    {
      id: 2,
      name: 'Marcus Sterling',
      role: 'Art Director',
      quote: 'I used their interactive Cake Builder to design a custom chocolate and lavender cake for my company\'s anniversary. The visualizer was spot on, and the final cake looked exactly like the rendering!',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100'
    }
  ];

  return (
    <div className="animate-fade-in">
      
      {/* 1. HERO SECTION */}
      <section className="hero-section" style={{
        position: 'relative',
        padding: '80px 0 100px',
        background: 'radial-gradient(circle at 80% 20%, var(--primary-alpha) 0%, transparent 60%)',
        overflow: 'hidden'
      }}>
        <div className="container" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '48px',
          alignItems: 'center'
        }}>
          
          {/* Hero Content */}
          <div className="animate-slide-up" style={{ zIndex: 2 }}>
            <span className="badge" style={{ marginBottom: '16px' }}>
              <Sparkles size={14} style={{ marginRight: '6px' }} />
              Award Winning Patisserie
            </span>
            <h1 style={{
              fontSize: '4rem',
              lineHeight: 1.1,
              fontFamily: 'var(--font-serif)',
              margin: '0 0 24px',
              fontWeight: 800
            }}>
              Where Taste Meets <span style={{ color: 'var(--primary)', position: 'relative' }}>Artistry</span>
            </h1>
            <p style={{
              fontSize: '1.15rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.7,
              marginBottom: '36px',
              maxWidth: '520px'
            }}>
              Bespoke luxury cakes crafted with organic ingredients, delicate textures, and stunning custom designs. Delivered fresh to your doorstep in New York.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button 
                onClick={() => setCurrentPage('menu')}
                className="btn btn-primary"
                style={{ fontSize: '1rem', padding: '14px 32px' }}
              >
                Explore Our Menu
              </button>
              <button 
                onClick={() => setCurrentPage('builder')}
                className="btn btn-secondary"
                style={{ fontSize: '1rem', padding: '14px 32px' }}
              >
                Design Custom Cake
              </button>
            </div>
          </div>

          {/* Hero Image Showcase */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            {/* Background floating decor bubble */}
            <div style={{
              position: 'absolute',
              width: '380px',
              height: '380px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--primary-alpha) 0%, rgba(220, 162, 99, 0.1) 100%)',
              filter: 'blur(30px)',
              zIndex: 1
            }} />
            
            {/* Real Cake Image with float animation */}
            <div className="float-img" style={{ zIndex: 2, position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
              <img 
                src="https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&q=80&w=800" 
                alt="Signature Strawberry Luxury Cake" 
                style={{
                  width: '100%',
                  maxWidth: '360px',
                  height: 'auto',
                  aspectRatio: '360/420',
                  borderRadius: 'var(--radius-lg) var(--radius-lg) 200px 200px',
                  objectFit: 'cover',
                  border: '8px solid var(--bg-card)',
                  boxShadow: 'var(--shadow-lg)'
                }}
              />
              {/* Float Badge */}
              <div className="glass-panel" style={{
                position: 'absolute',
                bottom: '30px',
                right: '-20px',
                padding: '16px 20px',
                background: 'var(--bg-modal)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-md)',
                border: '1px solid var(--border-color)'
              }}>
                <div style={{
                  background: 'var(--primary)',
                  color: '#fff',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Award size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>100% Organic</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Premium ingredients only</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. CORE FEATURES / VALUES */}
      <section style={{ padding: '60px 0', background: 'var(--bg-secondary)', transition: 'background-color var(--transition-normal)' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '32px'
          }}>
            {[
              {
                icon: <ChefHat size={28} />,
                title: 'Artisan Baking',
                desc: 'Every recipe is designed by master chefs with hours of refinement for the perfect texture.'
              },
              {
                icon: <Truck size={28} />,
                title: 'Secured Logistics',
                desc: 'Specialized thermal-controlled vans deliver your cakes pristine, cool, and on schedule.'
              },
              {
                icon: <Award size={28} />,
                title: 'Strict Quality',
                desc: 'Zero artificial preservatives. We use only organic dairy, fresh fruits, and premium cocoa.'
              }
            ].map((feat, index) => (
              <div 
                key={index} 
                className="glass-panel"
                style={{
                  padding: '30px',
                  background: 'var(--bg-card)',
                  borderRadius: 'var(--radius-md)',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '16px'
                }}
              >
                <div style={{
                  background: 'var(--primary-alpha)',
                  color: 'var(--primary)',
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {feat.icon}
                </div>
                <h3 style={{ fontSize: '1.25rem', margin: 0, fontFamily: 'var(--font-sans)', fontWeight: '700' }}>{feat.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CHEF'S BEST SELLERS */}
      <section style={{ padding: '100px 0' }}>
        <div className="container">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '48px',
            flexWrap: 'wrap',
            gap: '24px'
          }}>
            <div>
              <span className="badge" style={{ marginBottom: '12px' }}>Curated Selections</span>
              <h2 style={{ fontSize: '2.5rem', margin: 0 }}>Signature Best Sellers</h2>
            </div>
            <button 
              onClick={() => setCurrentPage('menu')}
              className="btn btn-outline"
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <span>View Full Menu</span>
              <ArrowRight size={16} />
            </button>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '32px'
          }}>
            {bestSellers.map(cake => (
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
                  height: '100%'
                }}
                onClick={() => onSelectCake(cake)}
              >
                <div style={{ overflow: 'hidden', height: '240px', position: 'relative' }}>
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
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    background: 'var(--bg-modal)',
                    padding: '4px 12px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                    color: 'var(--primary)',
                    boxShadow: 'var(--shadow-sm)'
                  }}>
                    {cake.category}
                  </div>
                </div>

                <div style={{ padding: '24px', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <h3 style={{ fontSize: '1.25rem', margin: 0, fontFamily: 'var(--font-sans)', fontWeight: '700' }}>{cake.name}</h3>
                      <span style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--primary)' }}>${cake.price.toFixed(2)}</span>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '12px' }}>
                      <Star size={14} fill="#ffb300" color="#ffb300" />
                      <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>{cake.rating}</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>({cake.reviews} reviews)</span>
                    </div>

                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: '0 0 20px' }}>
                      {cake.description.substring(0, 95)}...
                    </p>
                  </div>

                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectCake(cake);
                    }}
                    className="btn btn-outline"
                    style={{ width: '100%', padding: '10px' }}
                  >
                    Customize & Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE BUILDER PROMO */}
      <section style={{ padding: '60px 0' }}>
        <div className="container">
          <div className="glass-panel" style={{
            background: 'linear-gradient(135deg, rgba(255, 107, 139, 0.1) 0%, rgba(220, 162, 99, 0.1) 100%)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            padding: 'clamp(24px, 5vw, 60px) clamp(16px, 4vw, 48px)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '40px',
            alignItems: 'center'
          }}>
            <div>
              <span className="badge" style={{ marginBottom: '16px' }}>Custom Cake Studio</span>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Can't find the perfect cake? Build one live.</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '28px', fontSize: '1rem' }}>
                Unleash your creativity. Choose how many tiers you want, select unique flavor glazes, decorate with premium toppings, and add your bespoke message in real-time using our live visualizer.
              </p>
              <button 
                onClick={() => setCurrentPage('builder')}
                className="btn btn-primary"
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <span>Launch Cake Builder</span>
                <ArrowRight size={18} />
              </button>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{
                background: 'var(--bg-modal)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '24px',
                boxShadow: 'var(--shadow-lg)',
                textAlign: 'center',
                width: '100%',
                maxWidth: '320px'
              }} className="float-img-slow">
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 'bold' }}>VISUALIZER SIMULATION</span>
                
                {/* Micro Cake illustration */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
                  <div style={{ width: '40px', height: '24px', background: '#ffb3c6', borderRadius: '4px 4px 0 0', border: '1px solid rgba(0,0,0,0.1)' }} />
                  <div style={{ width: '60px', height: '24px', background: '#5d371e', borderRadius: '4px 4px 0 0', marginTop: '-2px', border: '1px solid rgba(0,0,0,0.1)' }} />
                  <div style={{ width: '80px', height: '8px', background: '#e0e0e0', borderRadius: '2px', marginTop: '2px' }} />
                </div>
                
                <div style={{ fontSize: '0.85rem', fontWeight: 'bold', marginTop: '16px' }}>2-Tier Chocolate Strawberry</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 'bold', marginTop: '4px' }}>$55.00</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS */}
      <section style={{ padding: '80px 0', background: 'var(--bg-secondary)', transition: 'background-color var(--transition-normal)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span className="badge" style={{ marginBottom: '12px' }}>Reviews</span>
            <h2 style={{ fontSize: '2.5rem' }}>Voices of Delight</h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '32px'
          }}>
            {testimonials.map(test => (
              <div 
                key={test.id} 
                className="glass-panel"
                style={{
                  padding: '40px',
                  background: 'var(--bg-card)',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative'
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: '24px',
                  right: '30px',
                  fontSize: '5rem',
                  fontFamily: 'var(--font-serif)',
                  color: 'var(--border-color)',
                  lineHeight: 0,
                  pointerEvents: 'none'
                }}>
                  “
                </div>
                
                <div>
                  <div style={{ display: 'flex', color: '#ffb300', gap: '4px', marginBottom: '20px' }}>
                    {Array.from({ length: test.rating }).map((_, i) => (
                      <Star key={i} size={16} fill="#ffb300" color="#ffb300" />
                    ))}
                  </div>
                  <p style={{
                    fontSize: '0.95rem',
                    lineHeight: 1.6,
                    fontStyle: 'italic',
                    color: 'var(--text-secondary)',
                    marginBottom: '24px'
                  }}>
                    "{test.quote}"
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <img 
                    src={test.avatar} 
                    alt={test.name}
                    style={{
                      width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover'
                    }}
                  />
                  <div>
                    <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 'bold' }}>{test.name}</h4>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{test.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
