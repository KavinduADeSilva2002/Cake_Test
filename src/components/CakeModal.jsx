import React, { useState, useEffect } from 'react';
import { X, Star, ShoppingBag, Plus, Minus, FileText } from 'lucide-react';

export default function CakeModal({ cake, onClose, onAddToCart }) {
  const [size, setSize] = useState('');
  const [customText, setCustomText] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [priceModifier, setPriceModifier] = useState(0);

  useEffect(() => {
    if (cake && cake.sizes && cake.sizes.length > 0) {
      setSize(cake.sizes[0]);
    }
    setCustomText('');
    setQuantity(1);
    setPriceModifier(0);
  }, [cake]);

  if (!cake) return null;

  const handleSizeChange = (selectedSize) => {
    setSize(selectedSize);
    // Parse size modifier from string like "8 inch (12-16 servings) +$15"
    if (selectedSize.includes('+$')) {
      const parts = selectedSize.split('+$');
      const value = parseFloat(parts[parts.length - 1]);
      setPriceModifier(value);
    } else if (selectedSize.includes('+$')) {
      // In case wedding tier has different formatting
      const value = parseFloat(selectedSize.split('+$')[1]);
      setPriceModifier(value);
    } else {
      setPriceModifier(0);
    }
  };

  const currentUnitPrice = cake.price + priceModifier;
  const totalPrice = currentUnitPrice * quantity;

  const handleAddToCart = () => {
    const itemToAdd = {
      ...cake,
      id: `${cake.id}-${size.split(' ')[0]}-${customText ? 'custom' : 'std'}-${Date.now()}`, // Unique cart ID
      originalId: cake.id,
      selectedSize: size,
      customText: customText,
      price: currentUnitPrice,
      quantity: quantity
    };
    onAddToCart(itemToAdd);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.5)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '16px'
    }} className="animate-fade-in" onClick={onClose}>
      
      {/* Modal Card */}
      <div 
        style={{
          background: 'var(--bg-modal)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          width: '100%',
          maxWidth: '850px',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: 'var(--shadow-lg)',
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          '@media (maxWidth: 768px)': {
            gridTemplateColumns: '1fr'
          }
        }} 
        className="modal-card animate-slide-up"
        onClick={e => e.stopPropagation()}
      >
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'var(--bg-primary)',
            border: '1.5px solid var(--border-color)',
            color: 'var(--text-primary)',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            transition: 'all var(--transition-fast)'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'var(--primary)';
            e.currentTarget.style.color = 'var(--primary)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'var(--border-color)';
            e.currentTarget.style.color = 'var(--text-primary)';
          }}
        >
          <X size={18} />
        </button>

        {/* Column 1: Image & Basic Info */}
        <div style={{ position: 'relative', height: '100%', minHeight: '300px' }}>
          <img 
            src={cake.image} 
            alt={cake.name} 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderTopLeftRadius: 'var(--radius-lg)',
              borderBottomLeftRadius: 'var(--radius-lg)',
              display: 'block'
            }}
            className="modal-image"
          />
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)',
            padding: '24px',
            color: '#fff',
            borderBottomLeftRadius: 'var(--radius-lg)'
          }}>
            <span className="badge" style={{ background: 'var(--primary)', color: '#fff', marginBottom: '8px' }}>
              {cake.category}
            </span>
            <h3 style={{ color: '#fff', fontSize: '1.8rem', margin: '4px 0', fontFamily: 'var(--font-serif)' }}>
              {cake.name}
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', color: '#ffb300' }}>
                <Star size={16} fill="#ffb300" />
              </div>
              <strong style={{ color: '#fff' }}>{cake.rating}</strong>
              <span style={{ color: 'rgba(255,255,255,0.7)' }}>({cake.reviews} reviews)</span>
            </div>
          </div>
        </div>

        {/* Column 2: Order Customizations */}
        <div style={{ padding: '36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '20px' }}>
              {cake.description}
            </p>

            {/* Ingredients */}
            <div style={{ marginBottom: '24px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', letterSpacing: '0.5px' }}>
                Key Ingredients
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                {cake.ingredients.map(ing => (
                  <span key={ing} style={{ fontSize: '0.75rem', padding: '4px 10px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)', color: 'var(--text-secondary)' }}>
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            {/* Sizes Select */}
            {cake.sizes && cake.sizes.length > 0 && (
              <div className="form-group">
                <label className="form-label">Select Cake Size & Servings</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {cake.sizes.map(sz => (
                    <label 
                      key={sz}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 14px',
                        border: '1.5px solid var(--border-color)',
                        borderRadius: 'var(--radius-sm)',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        transition: 'all var(--transition-fast)',
                        background: size === sz ? 'var(--primary-alpha)' : 'transparent',
                        borderColor: size === sz ? 'var(--primary)' : 'var(--border-color)',
                        fontWeight: size === sz ? '600' : 'normal'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <input 
                          type="radio" 
                          name="cake-size" 
                          value={sz} 
                          checked={size === sz} 
                          onChange={() => handleSizeChange(sz)}
                          style={{ accentColor: 'var(--primary)' }}
                        />
                        <span>{sz.split(' +$')[0]}</span>
                      </div>
                      {sz.includes('+$') && (
                        <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>
                          +${sz.split('+$')[1]}
                        </span>
                      )}
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Custom lettering on cake */}
            {cake.customizable && (
              <div className="form-group" style={{ marginTop: '20px' }}>
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <FileText size={16} />
                  <span>Custom Message on Cake (Optional)</span>
                </label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g., Happy 25th birthday, Amy!" 
                  maxLength={40}
                  value={customText}
                  onChange={e => setCustomText(e.target.value)}
                />
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  Message will be piped using delicious chocolate ganache.
                </span>
              </div>
            )}
          </div>

          {/* Bottom Price & Add to Cart */}
          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '20px', marginTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              
              {/* Quantity selector */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  style={{
                    width: '32px', height: '32px', borderRadius: '50%', border: '1px solid var(--border-color)',
                    background: 'var(--bg-primary)', color: 'var(--text-primary)', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}
                >
                  <Minus size={14} />
                </button>
                <span style={{ fontSize: '1.1rem', fontWeight: 'bold', width: '15px', textAlign: 'center' }}>{quantity}</span>
                <button 
                  onClick={() => setQuantity(q => q + 1)}
                  style={{
                    width: '32px', height: '32px', borderRadius: '50%', border: '1px solid var(--border-color)',
                    background: 'var(--bg-primary)', color: 'var(--text-primary)', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}
                >
                  <Plus size={14} />
                </button>
              </div>

              {/* Total Price */}
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Total Price</div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary)' }}>
                  ${totalPrice.toFixed(2)}
                </div>
              </div>
            </div>

            {/* Add to Cart button */}
            <button 
              onClick={handleAddToCart}
              className="btn btn-primary" 
              style={{ width: '100%', gap: '10px' }}
            >
              <ShoppingBag size={18} />
              Add to Cart
            </button>
          </div>

        </div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          .modal-card {
            grid-template-columns: 1fr !important;
          }
          .modal-image {
            border-top-left-radius: var(--radius-lg) !important;
            border-top-right-radius: var(--radius-lg) !important;
            border-bottom-left-radius: 0 !important;
            height: 220px !important;
          }
        }
      `}</style>
    </div>
  );
}
