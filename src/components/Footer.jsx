import React from 'react';
import { Cake, Phone, Mail, MapPin, Clock, Heart } from 'lucide-react';

export default function Footer({ setCurrentPage }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      background: 'var(--bg-secondary)',
      borderTop: '1px solid var(--border-color)',
      padding: '64px 0 24px',
      marginTop: 'auto',
      transition: 'background-color var(--transition-normal)'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '40px',
          marginBottom: '48px'
        }}>
          {/* Brand Info */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer',
              marginBottom: '20px'
            }} onClick={() => setCurrentPage('home')}>
              <div style={{
                background: 'var(--primary-alpha)',
                padding: '6px',
                borderRadius: '50%',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Cake size={20} />
              </div>
              <span style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.25rem',
                fontWeight: 800,
                color: 'var(--text-primary)'
              }}>
                Sweet Symphony
              </span>
            </div>
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '0.9rem',
              lineHeight: 1.6,
              marginBottom: '20px'
            }}>
              Crafting premium visual and culinary masterpieces. Every cake is baked with organic ingredients, passionate creativity, and an absolute dedication to culinary art.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{
              fontSize: '1.1rem',
              marginBottom: '20px',
              fontFamily: 'var(--font-sans)',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              color: 'var(--text-primary)'
            }}>
              Quick Links
            </h3>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              {['Home', 'Our Menu', 'Cake Builder', 'Contact Us'].map((label, idx) => {
                const pageIds = ['home', 'menu', 'builder', 'contact'];
                return (
                  <li key={label}>
                    <button
                      onClick={() => setCurrentPage(pageIds[idx])}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-secondary)',
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        padding: 0,
                        transition: 'color var(--transition-fast)'
                      }}
                      onMouseEnter={e => e.target.style.color = 'var(--primary)'}
                      onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
                    >
                      {label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 style={{
              fontSize: '1.1rem',
              marginBottom: '20px',
              fontFamily: 'var(--font-sans)',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              color: 'var(--text-primary)'
            }}>
              Baking Hours
            </h3>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              color: 'var(--text-secondary)',
              fontSize: '0.9rem'
            }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={16} style={{ color: 'var(--secondary)' }} />
                <span>Mon - Fri: 8:00 AM - 7:00 PM</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={16} style={{ color: 'var(--secondary)' }} />
                <span>Saturday: 9:00 AM - 8:00 PM</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={16} style={{ color: 'var(--secondary)' }} />
                <span>Sunday: 10:00 AM - 5:00 PM</span>
              </li>
              <li style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '0.85rem', marginTop: '4px' }}>
                * Order at least 24 hours in advance
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 style={{
              fontSize: '1.1rem',
              marginBottom: '20px',
              fontFamily: 'var(--font-sans)',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              color: 'var(--text-primary)'
            }}>
              Contact Us
            </h3>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              color: 'var(--text-secondary)',
              fontSize: '0.9rem'
            }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <MapPin size={16} style={{ color: 'var(--primary)', marginTop: '3px', flexShrink: 0 }} />
                <span>45 Cake Boulevard, Pastry District, NY 10013</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={16} style={{ color: 'var(--primary)' }} />
                <a href="tel:+15550199" style={{ transition: 'color var(--transition-fast)' }} onMouseEnter={e => e.target.style.color = 'var(--primary)'} onMouseLeave={e => e.target.style.color = 'inherit'}>+1 (555) 019-9000</a>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={16} style={{ color: 'var(--primary)' }} />
                <a href="mailto:kavinduanjana35@gmail.com" style={{ transition: 'color var(--transition-fast)' }} onMouseEnter={e => e.target.style.color = 'var(--primary)'} onMouseLeave={e => e.target.style.color = 'inherit'}>kavinduanjana35@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div style={{
          height: '1px',
          background: 'var(--border-color)',
          margin: '24px 0'
        }} />

        {/* Bottom copyright */}
        <div className="footer-bottom" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          color: 'var(--text-secondary)',
          fontSize: '0.85rem'
        }}>
          <div>
            &copy; {currentYear} Sweet Symphony Patisserie. All rights reserved.
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            Made with <Heart size={14} style={{ fill: 'var(--primary)', color: 'var(--primary)' }} /> for fine taste.
          </div>
        </div>
      </div>
    </footer>
  );
}
