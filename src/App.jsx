import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import CakeBuilder from './components/CakeBuilder';
import Contact from './pages/Contact';
import Orders from './pages/Orders';
import CakeModal from './components/CakeModal';
import Cart from './components/Cart';
import { Sparkles, X } from 'lucide-react';
import './App.css';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('sweet_symphony_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedCake, setSelectedCake] = useState(null);
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('sweet_symphony_theme');
    return savedTheme || 'light';
  });
  const [toast, setToast] = useState(null);

  // Apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('sweet_symphony_theme', theme);
  }, [theme]);

  // Persist cart to localStorage
  useEffect(() => {
    localStorage.setItem('sweet_symphony_cart', JSON.stringify(cart));
  }, [cart]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleAddToCart = (item) => {
    setCart(prevCart => {
      // Find if item with same ID (matching size and customization) exists
      const existingItemIndex = prevCart.findIndex(cartItem => cartItem.id === item.id);
      
      if (existingItemIndex > -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += item.quantity;
        return updatedCart;
      }
      return [...prevCart, item];
    });

    // Trigger toast notification
    showToast(`Added ${item.quantity}x ${item.name} to cart!`);
  };

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart(itemId);
      return;
    }
    setCart(prevCart => 
      prevCart.map(item => item.id === itemId ? { ...item, quantity: newQuantity } : item)
    );
  };

  const handleRemoveFromCart = (itemId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
    showToast("Item removed from cart");
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleProceedToCheckout = (targetPage) => {
    setCurrentPage(targetPage);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home setCurrentPage={setCurrentPage} onSelectCake={setSelectedCake} />;
      case 'menu':
        return <Menu onSelectCake={setSelectedCake} />;
      case 'builder':
        return <CakeBuilder onAddToCart={handleAddToCart} />;
      case 'contact':
        return <Contact />;
      case 'orders':
        return (
          <Orders 
            cart={cart} 
            clearCart={handleClearCart} 
            setCurrentPage={setCurrentPage} 
          />
        );
      default:
        return <Home setCurrentPage={setCurrentPage} onSelectCake={setSelectedCake} />;
    }
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="app-container">
      {/* Dynamic Header */}
      <Navbar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        cartCount={cartCount} 
        toggleCart={() => setCartOpen(!cartOpen)} 
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Main Content Area */}
      <main style={{ flexGrow: 1, minHeight: 'calc(100vh - 75px)' }}>
        {renderPage()}
      </main>

      {/* Page Footer */}
      <Footer setCurrentPage={setCurrentPage} />

      {/* Item Detail Customize Modal */}
      {selectedCake && (
        <CakeModal 
          cake={selectedCake} 
          onClose={() => setSelectedCake(null)} 
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Cart Sliding Drawer Panel */}
      <Cart 
        isOpen={cartOpen} 
        onClose={() => setCartOpen(false)} 
        cart={cart} 
        onUpdateQuantity={handleUpdateQuantity} 
        onRemoveFromCart={handleRemoveFromCart}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* Toast Notification HUD */}
      {toast && (
        <div 
          style={{
            position: 'fixed',
            bottom: '24px',
            left: '24px',
            background: 'var(--bg-modal)',
            border: '1px solid var(--primary)',
            borderRadius: 'var(--radius-md)',
            padding: '16px 20px',
            boxShadow: 'var(--shadow-lg)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            zIndex: 2000,
            maxWidth: '350px'
          }}
          className="animate-slide-up"
        >
          <div style={{
            background: 'var(--primary-alpha)', color: 'var(--primary)',
            padding: '6px', borderRadius: '50%', display: 'flex', alignItems: 'center'
          }}>
            <Sparkles size={16} />
          </div>
          <span style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-primary)', flexGrow: 1 }}>
            {toast}
          </span>
          <button 
            onClick={() => setToast(null)}
            style={{
              background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '2px'
            }}
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
