import React, { useState } from 'react';
import { ShoppingBag, Sun, Moon, Menu as MenuIcon, X, Cake } from 'lucide-react';

export default function Navbar({ currentPage, setCurrentPage, cartCount, toggleCart, theme, toggleTheme }) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'menu', label: 'Our Menu' },
    { id: 'builder', label: 'Cake Builder' },
    { id: 'contact', label: 'Contact Us' }
  ];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'var(--bg-modal)',
      borderBottom: '1px solid var(--border-color)',
      backdropFilter: 'blur(8px)',
      transition: 'background-color var(--transition-normal)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '75px',
      }}>
        {/* Logo */}
        <div 
          onClick={() => { setCurrentPage('home'); setIsOpen(false); }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer'
          }}
        >
          <div style={{
            background: 'var(--primary-alpha)',
            padding: '8px',
            borderRadius: '50%',
            color: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Cake size={26} />
          </div>
          <div>
            <span style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.45rem',
              fontWeight: 800,
              background: 'linear-gradient(90deg, var(--primary) 0%, var(--secondary) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '0.5px'
            }}>
              Sweet Symphony
            </span>
            <div style={{
              fontSize: '0.65rem',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: 'var(--text-secondary)',
              marginTop: '-2px'
            }}>
              Luxury Patisserie
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '32px',
          '@media (maxWidth: 768px)': { display: 'none' }
        }} className="desktop-nav">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              style={{
                background: 'none',
                border: 'none',
                color: currentPage === item.id ? 'var(--primary)' : 'var(--text-secondary)',
                fontWeight: currentPage === item.id ? '700' : '500',
                fontSize: '0.95rem',
                cursor: 'pointer',
                padding: '8px 0',
                position: 'relative',
                transition: 'color var(--transition-fast)',
                fontFamily: 'var(--font-sans)'
              }}
            >
              {item.label}
              {currentPage === item.id && (
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: 'var(--primary)',
                  borderRadius: '10px'
                }} />
              )}
            </button>
          ))}
        </nav>

        {/* Actions (Theme, Cart, Mobile Menu Toggle) */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}>
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-secondary)',
              padding: '6px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background-color var(--transition-fast)'
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--border-color)'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
            title="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={20} style={{ color: 'var(--secondary)' }} /> : <Moon size={20} />}
          </button>

          {/* Cart Icon */}
          <button 
            onClick={toggleCart}
            style={{
              background: 'var(--primary-alpha)',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--primary)',
              padding: '10px 14px',
              borderRadius: 'var(--radius-full)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: '600',
              transition: 'transform var(--transition-fast), box-shadow var(--transition-fast)',
              position: 'relative'
            }}
            className="cart-toggle-btn"
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 4px 10px var(--primary-alpha)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <ShoppingBag size={18} />
            <span style={{ fontSize: '0.9rem', display: 'inline-block' }}>Cart</span>
            {cartCount > 0 && (
              <span style={{
                background: 'var(--primary)',
                color: 'var(--text-inverse)',
                fontSize: '0.75rem',
                minWidth: '20px',
                height: '20px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 4px',
                fontWeight: 'bold',
                animation: 'pulse-glow 2s infinite'
              }}>
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Icon */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-primary)',
              padding: '6px',
              display: 'none', // Managed by responsive CSS styles (inline check below)
            }}
            className="mobile-menu-btn"
          >
            {isOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '75px',
          left: 0,
          right: 0,
          background: 'var(--bg-modal)',
          borderBottom: '1px solid var(--border-color)',
          padding: '16px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          zIndex: 99,
          boxShadow: 'var(--shadow-md)'
        }} className="mobile-drawer animate-fade-in">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => { setCurrentPage(item.id); setIsOpen(false); }}
              style={{
                background: currentPage === item.id ? 'var(--primary-alpha)' : 'none',
                border: 'none',
                textAlign: 'left',
                padding: '12px 16px',
                borderRadius: 'var(--radius-sm)',
                color: currentPage === item.id ? 'var(--primary)' : 'var(--text-primary)',
                fontWeight: currentPage === item.id ? '700' : '500',
                fontSize: '1rem',
                cursor: 'pointer',
                width: '100%',
                transition: 'all var(--transition-fast)'
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}

      {/* Inline styles helper to inject CSS media queries without external style loading issues */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
            align-items: center;
            justify-content: center;
          }
        }
      `}</style>
    </header>
  );
}
