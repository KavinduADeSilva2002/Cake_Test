import React, { useState, useEffect } from 'react';
import { Plus, Minus, Cake, Sparkles, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

const FLAVORS = [
  { id: 'pink', name: 'Strawberry Blush', color: '#ffb3c6', textLight: false },
  { id: 'vanilla', name: 'Vanilla Cream', color: '#fbf7eb', textLight: false },
  { id: 'chocolate', name: 'Belgian Chocolate', color: '#5d371e', textLight: true },
  { id: 'lavender', name: 'Lavender Haze', color: '#d6bbf5', textLight: false },
  { id: 'mint', name: 'Sweet Mint', color: '#bbf5db', textLight: false }
];

const TOPPINGS = [
  { id: 'sprinkles', name: 'Rainbow Sprinkles', price: 3.00 },
  { id: 'cherries', name: 'Glazed Cherries', price: 4.00 },
  { id: 'flowers', name: 'Sugar Flowers', price: 6.00 },
  { id: 'drips', name: 'Chocolate Drips', price: 5.00 },
  { id: 'gold', name: 'Edible Gold Leaf', price: 8.00 }
];

export default function CakeBuilder({ onAddToCart }) {
  const [tiers, setTiers] = useState(2);
  const [tierFlavors, setTierFlavors] = useState({
    1: 'vanilla',   // Top tier
    2: 'pink',      // Middle tier
    3: 'chocolate'  // Bottom tier
  });
  const [selectedToppings, setSelectedToppings] = useState(['sprinkles']);
  const [cakeText, setCakeText] = useState('');
  const [activeTab, setActiveTab] = useState(1); // 1: Tiers & Flavors, 2: Toppings, 3: Message
  const [calculatedPrice, setCalculatedPrice] = useState(55.00);

  // Recalculate price whenever selections change
  useEffect(() => {
    let price = 0;
    // Base price per tier count
    if (tiers === 1) price = 35.00;
    else if (tiers === 2) price = 55.00;
    else if (tiers === 3) price = 75.00;

    // Toppings cost
    const toppingsCost = selectedToppings.reduce((total, id) => {
      const top = TOPPINGS.find(t => t.id === id);
      return total + (top ? top.price : 0);
    }, 0);
    price += toppingsCost;

    // Custom writing fee
    if (cakeText.trim().length > 0) {
      price += 5.00;
    }

    setCalculatedPrice(price);
  }, [tiers, tierFlavors, selectedToppings, cakeText]);

  const handleFlavorChange = (tierNum, flavorId) => {
    setTierFlavors(prev => ({
      ...prev,
      [tierNum]: flavorId
    }));
  };

  const handleToppingToggle = (toppingId) => {
    setSelectedToppings(prev => 
      prev.includes(toppingId) 
        ? prev.filter(id => id !== toppingId) 
        : [...prev, toppingId]
    );
  };

  const handleAddCustomCake = () => {
    // Run confetti animation for premium feel
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    const description = `${tiers}-Tier Custom Cake. Layers: ${
      Array.from({ length: tiers }, (_, i) => {
        const tNum = i + (4 - tiers); // Adjust tier numbering
        const flavor = FLAVORS.find(f => f.id === tierFlavors[tNum]);
        return flavor ? flavor.name : '';
      }).join(' & ')
    }. Toppings: ${
      selectedToppings.length > 0 
        ? selectedToppings.map(id => TOPPINGS.find(t => t.id === id)?.name).join(', ') 
        : 'None'
    }. ${cakeText ? `Writing: "${cakeText}"` : ''}`;

    const customCake = {
      id: `custom-${Date.now()}`,
      name: 'My Custom Cake Design',
      category: 'Custom',
      price: calculatedPrice,
      description: description,
      image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13636?auto=format&fit=crop&q=80&w=400',
      quantity: 1,
      selectedSize: `${tiers}-Tier Design`,
      customText: cakeText
    };

    onAddToCart(customCake);
  };

  return (
    <section className="animate-slide-up" style={{ padding: '40px 0' }}>
      <div className="container">
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="badge" style={{ marginBottom: '12px' }}>Interactive Designer</span>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Design Your Dream Cake</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: '1.05rem', lineHeight: '1.6' }}>
            Choose your size, flavor combinations, premium toppings, and add a personalized message. Watch your cake take shape in real-time.
          </p>
        </div>

        {/* Builder Container */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '40px',
          alignItems: 'start'
        }}>
          
          {/* Left Column: Visualizer */}
          <div className="glass-panel" style={{
            padding: '30px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: 'var(--bg-card)'
          }}>
            <h3 style={{ fontSize: '1.35rem', marginBottom: '24px', fontFamily: 'var(--font-sans)', fontWeight: '700' }}>Live 3D Preview</h3>
            
            {/* Visualizer Area */}
            <div className="tier-visualizer" style={{ width: '100%', marginBottom: '24px' }}>
              
              {/* Gold leaf sparkles if selected */}
              {selectedToppings.includes('gold') && (
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  left: '10px',
                  right: '10px',
                  bottom: '10px',
                  pointerEvents: 'none',
                  backgroundImage: 'radial-gradient(circle, #ffd700 10%, transparent 10%)',
                  backgroundSize: '30px 30px',
                  opacity: 0.4
                }} />
              )}

              {/* Cherry on very top */}
              {selectedToppings.includes('cherries') && (
                <div className="topping-cherry" style={{
                  bottom: `${(tiers * 60) + 12}px`,
                  zIndex: 20,
                  left: 'calc(50% - 7px)',
                  transform: 'scale(1.2)'
                }} />
              )}

              {/* Flowers on top tier */}
              {selectedToppings.includes('flowers') && (
                <div className="topping-flower" style={{
                  bottom: `${(tiers * 60) + 10}px`,
                  left: 'calc(50% - 25px)',
                  zIndex: 19
                }} />
              )}

              {/* TIER 1 (TOP) - Rendered if tiers >= 1 */}
              {tiers >= 1 && (
                <div 
                  className="cake-tier" 
                  style={{
                    width: '100px',
                    height: '60px',
                    backgroundColor: FLAVORS.find(f => f.id === tierFlavors[1])?.color,
                    zIndex: 8,
                    marginBottom: '-4px'
                  }}
                >
                  {/* Sprinkles */}
                  {selectedToppings.includes('sprinkles') && <div className="topping-sprinkles" />}
                  {/* Drips */}
                  {selectedToppings.includes('drips') && (
                    <div className="cream-drips">
                      <div className="drip" style={{ height: '14px', backgroundColor: '#3e2723' }} />
                      <div className="drip" style={{ height: '8px', backgroundColor: '#3e2723' }} />
                      <div className="drip" style={{ height: '16px', backgroundColor: '#3e2723' }} />
                      <div className="drip" style={{ height: '10px', backgroundColor: '#3e2723' }} />
                    </div>
                  )}
                  {/* Display text if only 1 tier */}
                  {tiers === 1 && cakeText && (
                    <div className="cake-msg" style={{
                      color: FLAVORS.find(f => f.id === tierFlavors[1])?.textLight ? '#ffffff' : '#4a2c00',
                      bottom: '15px'
                    }}>
                      {cakeText}
                    </div>
                  )}
                </div>
              )}

              {/* TIER 2 (MIDDLE) - Rendered if tiers >= 2 */}
              {tiers >= 2 && (
                <div 
                  className="cake-tier" 
                  style={{
                    width: '150px',
                    height: '60px',
                    backgroundColor: FLAVORS.find(f => f.id === tierFlavors[2])?.color,
                    zIndex: 7,
                    marginBottom: '-4px'
                  }}
                >
                  {selectedToppings.includes('sprinkles') && <div className="topping-sprinkles" />}
                  {selectedToppings.includes('drips') && (
                    <div className="cream-drips">
                      <div className="drip" style={{ height: '10px', backgroundColor: '#3e2723' }} />
                      <div className="drip" style={{ height: '18px', backgroundColor: '#3e2723' }} />
                      <div className="drip" style={{ height: '12px', backgroundColor: '#3e2723' }} />
                      <div className="drip" style={{ height: '15px', backgroundColor: '#3e2723' }} />
                      <div className="drip" style={{ height: '8px', backgroundColor: '#3e2723' }} />
                    </div>
                  )}
                  {/* Cherry on side */}
                  {selectedToppings.includes('cherries') && (
                    <div className="topping-cherry" style={{ top: '-8px', left: '15px' }} />
                  )}
                  {/* Flower on side */}
                  {selectedToppings.includes('flowers') && (
                    <div className="topping-flower" style={{ top: '-10px', right: '15px' }} />
                  )}
                  {/* Display text if 2 tiers */}
                  {tiers === 2 && cakeText && (
                    <div className="cake-msg" style={{
                      color: FLAVORS.find(f => f.id === tierFlavors[2])?.textLight ? '#ffffff' : '#4a2c00',
                      bottom: '15px'
                    }}>
                      {cakeText}
                    </div>
                  )}
                </div>
              )}

              {/* TIER 3 (BOTTOM) - Rendered if tiers === 3 */}
              {tiers === 3 && (
                <div 
                  className="cake-tier" 
                  style={{
                    width: '200px',
                    height: '60px',
                    backgroundColor: FLAVORS.find(f => f.id === tierFlavors[3])?.color,
                    zIndex: 6,
                    marginBottom: '-4px'
                  }}
                >
                  {selectedToppings.includes('sprinkles') && <div className="topping-sprinkles" />}
                  {selectedToppings.includes('drips') && (
                    <div className="cream-drips">
                      <div className="drip" style={{ height: '12px', backgroundColor: '#3e2723' }} />
                      <div className="drip" style={{ height: '15px', backgroundColor: '#3e2723' }} />
                      <div className="drip" style={{ height: '8px', backgroundColor: '#3e2723' }} />
                      <div className="drip" style={{ height: '16px', backgroundColor: '#3e2723' }} />
                      <div className="drip" style={{ height: '11px', backgroundColor: '#3e2723' }} />
                      <div className="drip" style={{ height: '14px', backgroundColor: '#3e2723' }} />
                    </div>
                  )}
                  {/* Flowers on bottom side */}
                  {selectedToppings.includes('flowers') && (
                    <>
                      <div className="topping-flower" style={{ top: '-10px', left: '20px' }} />
                      <div className="topping-flower" style={{ top: '-10px', right: '40px' }} />
                    </>
                  )}
                  {/* Custom Text on bottom tier */}
                  {cakeText && (
                    <div className="cake-msg" style={{
                      color: FLAVORS.find(f => f.id === tierFlavors[3])?.textLight ? '#ffffff' : '#4a2c00',
                      bottom: '15px'
                    }}>
                      {cakeText}
                    </div>
                  )}
                </div>
              )}

              {/* Cake Stand */}
              <div className="cake-stand" />
              <div className="cake-stand-base" />
            </div>

            {/* Price tag */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
              <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Estimated Price:</span>
              <span style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary)' }}>${calculatedPrice.toFixed(2)}</span>
            </div>
          </div>

          {/* Right Column: Controls */}
          <div className="glass-panel" style={{
            padding: '30px',
            background: 'var(--bg-card)',
            minHeight: '430px',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {/* Tabs */}
            <div style={{
              display: 'flex',
              borderBottom: '1px solid var(--border-color)',
              marginBottom: '24px',
              gap: '12px'
            }}>
              {['Layers & Flavors', 'Toppings', 'Personalize'].map((tab, idx) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(idx + 1)}
                  style={{
                    background: 'none',
                    border: 'none',
                    borderBottom: activeTab === idx + 1 ? '2px solid var(--primary)' : '2px solid transparent',
                    color: activeTab === idx + 1 ? 'var(--primary)' : 'var(--text-secondary)',
                    fontWeight: activeTab === idx + 1 ? '700' : '500',
                    padding: '8px 12px 12px',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    transition: 'all var(--transition-fast)',
                    fontFamily: 'var(--font-sans)'
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Contents */}
            <div style={{ flexGrow: 1 }}>
              
              {/* TAB 1: Tiers & Flavors */}
              {activeTab === 1 && (
                <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {/* Tier selector */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: '700' }}>Number of Tiers</h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>More tiers, more flavor combinations</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <button 
                        onClick={() => setTiers(prev => Math.max(1, prev - 1))}
                        disabled={tiers === 1}
                        style={{
                          width: '36px', height: '36px', borderRadius: '50%', border: '1px solid var(--border-color)',
                          background: 'var(--bg-primary)', color: 'var(--text-primary)', cursor: tiers === 1 ? 'not-allowed' : 'pointer',
                          display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center',
                          opacity: tiers === 1 ? 0.5 : 1
                        }}
                      >
                        <Minus size={16} />
                      </button>
                      <span style={{ fontSize: '1.25rem', fontWeight: '800', width: '20px', textAlign: 'center' }}>{tiers}</span>
                      <button 
                        onClick={() => setTiers(prev => Math.min(3, prev + 1))}
                        disabled={tiers === 3}
                        style={{
                          width: '36px', height: '36px', borderRadius: '50%', border: '1px solid var(--border-color)',
                          background: 'var(--bg-primary)', color: 'var(--text-primary)', cursor: tiers === 3 ? 'not-allowed' : 'pointer',
                          display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center',
                          opacity: tiers === 3 ? 0.5 : 1
                        }}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Flavor Selectors per Tier */}
                  <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: '700' }}>Tier Flavors</h4>
                    
                    {Array.from({ length: tiers }, (_, i) => {
                      // We map bottom-to-top visually but represent tier IDs: 1 (Top), 2 (Middle), 3 (Bottom)
                      // If 1 tier only: we use tier 1.
                      // If 2 tiers: we use tier 1 (top) and tier 2 (bottom).
                      // If 3 tiers: we use tier 1 (top), tier 2 (middle), tier 3 (bottom).
                      const tierNum = i + 1;
                      const tierLabel = tiers === 1 ? 'Main Tier' : (tierNum === 1 ? 'Top Tier' : (tierNum === 2 && tiers === 2 ? 'Bottom Tier' : (tierNum === 2 ? 'Middle Tier' : 'Bottom Tier')));

                      return (
                        <div key={tierNum} style={{
                          padding: '12px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)',
                          display: 'flex', flexDirection: 'column', gap: '8px'
                        }}>
                          <div style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)' }}>{tierLabel}</div>
                          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            {FLAVORS.map(flavor => (
                              <button
                                key={flavor.id}
                                onClick={() => handleFlavorChange(tierNum, flavor.id)}
                                style={{
                                  padding: '6px 12px', borderRadius: 'var(--radius-full)', border: '2px solid transparent',
                                  borderColor: tierFlavors[tierNum] === flavor.id ? 'var(--primary)' : 'transparent',
                                  background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', gap: '6px',
                                  cursor: 'pointer', fontSize: '0.85rem', transition: 'all var(--transition-fast)'
                                }}
                              >
                                <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: flavor.color, border: '1px solid rgba(0,0,0,0.1)' }} />
                                <span style={{ color: 'var(--text-primary)', fontWeight: tierFlavors[tierNum] === flavor.id ? '700' : '500' }}>{flavor.name}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 2: Toppings */}
              {activeTab === 2 && (
                <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: '700' }}>Premium Toppings</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '-8px' }}>Select multiple elements to elevate your cake</p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {TOPPINGS.map(topping => {
                      const isSelected = selectedToppings.includes(topping.id);
                      return (
                        <div 
                          key={topping.id}
                          onClick={() => handleToppingToggle(topping.id)}
                          style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            padding: '12px 16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)',
                            background: isSelected ? 'var(--primary-alpha)' : 'var(--bg-primary)',
                            borderColor: isSelected ? 'var(--primary)' : 'var(--border-color)',
                            cursor: 'pointer', transition: 'all var(--transition-fast)'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{
                              width: '20px', height: '20px', borderRadius: '4px', border: '1.5px solid var(--text-secondary)',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              background: isSelected ? 'var(--primary)' : 'transparent',
                              borderColor: isSelected ? 'var(--primary)' : 'var(--text-secondary)',
                              color: 'var(--text-inverse)'
                            }}>
                              {isSelected && <Check size={14} />}
                            </div>
                            <span style={{ fontSize: '0.95rem', fontWeight: isSelected ? '600' : '500', color: 'var(--text-primary)' }}>{topping.name}</span>
                          </div>
                          <span style={{ fontSize: '0.9rem', color: 'var(--primary)', fontWeight: '700' }}>+${topping.price.toFixed(2)}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 3: Message */}
              {activeTab === 3 && (
                <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: '700' }}>Personalized Lettering</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '-8px' }}>We handwrite messages using premium chocolate piping ganache (+$5.00)</p>

                  <div className="form-group">
                    <label className="form-label" htmlFor="custom-cake-text">Message on the Cake (Max 24 characters)</label>
                    <input 
                      type="text" 
                      id="custom-cake-text"
                      className="form-input"
                      placeholder="e.g. Happy Birthday!"
                      maxLength={24}
                      value={cakeText}
                      onChange={e => setCakeText(e.target.value)}
                      style={{ letterSpacing: '0.5px' }}
                    />
                  </div>

                  {cakeText && (
                    <div style={{
                      padding: '12px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)',
                      borderLeft: '4px solid var(--secondary)', fontSize: '0.85rem', color: 'var(--text-secondary)'
                    }}>
                      <strong>Preview on cake:</strong> <span style={{ fontStyle: 'italic' }}>"{cakeText}"</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Add to Cart button */}
            <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid var(--border-color)' }}>
              <button 
                onClick={handleAddCustomCake}
                className="btn btn-primary" 
                style={{ width: '100%', gap: '10px' }}
              >
                <Sparkles size={18} />
                Add Custom Design to Cart
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
