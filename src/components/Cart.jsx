import React from 'react';
import { X, Trash2, ArrowRight, ShoppingCart, Info } from 'lucide-react';

export default function Cart({ isOpen, onClose, cart, onUpdateQuantity, onRemoveFromCart, onProceedToCheckout }) {
  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.5)',
      backdropFilter: 'blur(3px)',
      display: 'flex',
      justifyContent: 'flex-end',
      zIndex: 999,
    }} className="animate-fade-in" onClick={onClose}>
      
      {/* Side Panel Drawer */}
      <div 
        style={{
          width: '100%',
          maxWidth: '440px',
          height: '100%',
          background: 'var(--bg-modal)',
          boxShadow: '-10px 0 25px rgba(0,0,0,0.15)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          borderLeft: '1px solid var(--border-color)',
        }}
        className="cart-panel animate-slide-left"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          padding: '24px',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShoppingCart style={{ color: 'var(--primary)' }} />
            <h3 style={{ margin: 0, fontSize: '1.25rem', fontFamily: 'var(--font-sans)', fontWeight: '700' }}>Your Order Cart</h3>
            <span style={{
              background: 'var(--primary-alpha)', color: 'var(--primary)', fontSize: '0.8rem', padding: '2px 8px', borderRadius: '10px', fontWeight: 'bold'
            }}>
              {cart.reduce((total, item) => total + item.quantity, 0)}
            </span>
          </div>
          <button 
            onClick={onClose}
            style={{
              background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}
          >
            <X size={24} />
          </button>
        </div>

        {/* Cart items list */}
        <div style={{
          flexGrow: 1,
          overflowY: 'auto',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          {cart.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px',
              height: '100%'
            }}>
              <div style={{
                width: '80px', height: '80px', borderRadius: '50%', background: 'var(--bg-secondary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)'
              }}>
                <ShoppingCart size={32} />
              </div>
              <div>
                <h4 style={{ margin: '0 0 8px', fontSize: '1.1rem', fontWeight: '700' }}>Your cart is empty</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Add mouthwatering cakes from our menu, or build your own custom design!
                </p>
              </div>
              <button 
                onClick={() => { onClose(); onProceedToCheckout('menu'); }}
                className="btn btn-outline"
                style={{ marginTop: '10px', padding: '10px 20px', fontSize: '0.85rem' }}
              >
                Browse Our Menu
              </button>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} style={{
                display: 'flex',
                gap: '16px',
                paddingBottom: '16px',
                borderBottom: '1px solid var(--border-color)',
                alignItems: 'flex-start'
              }}>
                {/* Item Thumbnail */}
                <img 
                  src={item.image} 
                  alt={item.name} 
                  style={{
                    width: '70px', height: '70px', borderRadius: 'var(--radius-sm)', objectFit: 'cover'
                  }}
                />
                
                {/* Item Description */}
                <div style={{ flexGrow: 1 }}>
                  <h4 style={{ margin: '0 0 4px', fontSize: '0.95rem', fontWeight: '700', lineHeight: 1.3 }}>{item.name}</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    <span>Size: {item.selectedSize || 'Standard'}</span>
                    {item.customText && (
                      <span style={{ color: 'var(--secondary)', fontWeight: '600' }}>Message: "{item.customText}"</span>
                    )}
                  </div>

                  {/* Quantity and Price row */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
                    {/* Quantity Selector */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        style={{
                          width: '24px', height: '24px', borderRadius: '50%', border: '1px solid var(--border-color)',
                          background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
                        }}
                      >
                        -
                      </button>
                      <span style={{ fontSize: '0.85rem', fontWeight: 'bold', width: '12px', textAlign: 'center' }}>{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        style={{
                          width: '24px', height: '24px', borderRadius: '50%', border: '1px solid var(--border-color)',
                          background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
                        }}
                      >
                        +
                      </button>
                    </div>
                    {/* Price */}
                    <div style={{ fontWeight: '700', color: 'var(--text-primary)', fontSize: '0.95rem' }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>

                {/* Trash button */}
                <button 
                  onClick={() => onRemoveFromCart(item.id)}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', padding: '4px',
                    transition: 'color var(--transition-fast)'
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = '#ef4444'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer summary */}
        {cart.length > 0 && (
          <div style={{
            padding: '24px',
            borderTop: '1px solid var(--border-color)',
            background: 'var(--bg-secondary)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'var(--text-secondary)', fontWeight: '600' }}>Subtotal:</span>
              <span style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                ${subtotal.toFixed(2)}
              </span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              <Info size={14} style={{ color: 'var(--secondary)', flexShrink: 0, marginTop: '2px' }} />
              <span>Delivery charges, custom taxes, and orders confirmations will be calculated at checkout in the Orders page.</span>
            </div>

            <button 
              onClick={() => { onClose(); onProceedToCheckout('orders'); }}
              className="btn btn-primary"
              style={{
                width: '100%',
                gap: '8px',
                padding: '14px 20px',
                fontSize: '1rem'
              }}
            >
              <span>Proceed to Orders Page</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}

      </div>

      <style>{`
        .animate-slide-left {
          animation: slideLeft 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes slideLeft {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
