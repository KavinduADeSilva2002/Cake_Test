import React, { useState, useEffect } from 'react';
import { Mail, Phone, Calendar, Clock, MapPin, CheckCircle, ShoppingBag, Send, Info } from 'lucide-react';
import confetti from 'canvas-confetti';

// Developer can place their Web3Forms key here for fully automated background emails.
// Get a free key at https://web3forms.com/
const WEB3FORMS_ACCESS_KEY = ""; 

export default function Orders({ cart, clearCart, setCurrentPage }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    deliveryType: 'delivery', // 'delivery' or 'pickup'
    address: '',
    deliveryDate: '',
    deliveryTime: '10:00 - 12:00',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [generatedOrderId, setGeneratedOrderId] = useState('');
  const [emailMethod, setEmailMethod] = useState('mailto'); // 'mailto' or 'api'
  const [apiSuccess, setApiSuccess] = useState(false);

  // Set minimum delivery date to tomorrow
  const [minDate, setMinDate] = useState('');
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const dd = String(tomorrow.getDate()).padStart(2, '0');
    setMinDate(`${yyyy}-${mm}-${dd}`);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = formData.deliveryType === 'delivery' ? 5.00 : 0.00;
  const total = subtotal + deliveryFee;

  const generateOrderSummaryText = (orderId) => {
    let text = `========================================\n`;
    text += `       SWEET SYMPHONY ORDER #${orderId}\n`;
    text += `========================================\n\n`;
    text += `CUSTOMER DETAILS:\n`;
    text += `- Name: ${formData.name}\n`;
    text += `- Email: ${formData.email}\n`;
    text += `- Phone: ${formData.phone}\n`;
    text += `- Method: ${formData.deliveryType.toUpperCase()}\n`;
    if (formData.deliveryType === 'delivery') {
      text += `- Delivery Address: ${formData.address}\n`;
    }
    text += `- Requested Date: ${formData.deliveryDate}\n`;
    text += `- Requested Time Slot: ${formData.deliveryTime}\n\n`;
    
    text += `ORDER DETAILS:\n`;
    cart.forEach((item, index) => {
      text += `${index + 1}. ${item.name} (${item.quantity}x)\n`;
      text += `   - Size/Option: ${item.selectedSize || 'Standard'}\n`;
      if (item.customText) {
        text += `   - Custom Text: "${item.customText}"\n`;
      }
      text += `   - Unit Price: $${item.price.toFixed(2)}\n`;
      text += `   - Total: $${(item.price * item.quantity).toFixed(2)}\n\n`;
    });
    
    text += `----------------------------------------\n`;
    text += `Subtotal: $${subtotal.toFixed(2)}\n`;
    text += `Delivery Fee: $${deliveryFee.toFixed(2)}\n`;
    text += `TOTAL BILL: $${total.toFixed(2)}\n`;
    text += `========================================\n`;
    if (formData.notes) {
      text += `SPECIAL INSTRUCTIONS:\n${formData.notes}\n`;
      text += `========================================\n`;
    }
    return text;
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsSubmitting(true);
    const orderId = 'SS-' + Math.floor(100000 + Math.random() * 900000);
    setGeneratedOrderId(orderId);
    
    const orderSummaryText = generateOrderSummaryText(orderId);
    const targetEmail = "kavinduanjana35@gmail.com";

    // 1. Mailto submission method
    if (emailMethod === 'mailto' || !WEB3FORMS_ACCESS_KEY) {
      // Build mailto link
      const subject = encodeURIComponent(`New Cake Order #${orderId} - ${formData.name}`);
      const body = encodeURIComponent(orderSummaryText);
      const mailtoLink = `mailto:${targetEmail}?subject=${subject}&body=${body}`;
      
      // Open default mail client
      window.location.href = mailtoLink;
      
      setApiSuccess(false);
      finishOrder();
    } 
    // 2. Web3Forms API submission method (if access key is present)
    else {
      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            access_key: WEB3FORMS_ACCESS_KEY,
            subject: `New Cake Order #${orderId} - ${formData.name}`,
            from_name: "Sweet Symphony Patisserie",
            to_email: targetEmail,
            message: orderSummaryText,
            customer_email: formData.email,
            customer_phone: formData.phone
          })
        });
        
        const data = await response.json();
        if (data.success) {
          setApiSuccess(true);
        } else {
          // Fallback to mailto if API fails
          console.warn("API submission failed. Falling back to mailto client.", data);
          window.location.href = `mailto:${targetEmail}?subject=${encodeURIComponent(`New Cake Order #${orderId}`)}&body=${encodeURIComponent(orderSummaryText)}`;
          setApiSuccess(false);
        }
        finishOrder();
      } catch (err) {
        console.error("Error submitting order via API", err);
        // Fallback to mailto
        window.location.href = `mailto:${targetEmail}?subject=${encodeURIComponent(`New Cake Order #${orderId}`)}&body=${encodeURIComponent(orderSummaryText)}`;
        setApiSuccess(false);
        finishOrder();
      }
    }
  };

  const finishOrder = () => {
    // Fire confetti for celebration
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.5 }
    });
    
    setIsSubmitting(false);
    setOrderSuccess(true);
    // Let the confetti clear before clearing the cart state
    setTimeout(() => {
      clearCart();
    }, 100);
  };

  // Render Success Screen
  if (orderSuccess) {
    return (
      <div className="container animate-fade-in" style={{ padding: '80px 24px', maxWidth: '650px', textAlign: 'center' }}>
        <div className="glass-panel" style={{ padding: '50px 30px', background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)' }}>
          <div style={{
            background: 'var(--primary-alpha)', color: 'var(--primary)', width: '72px', height: '72px', borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px'
          }}>
            <CheckCircle size={44} />
          </div>
          <h2 style={{ fontSize: '2rem', marginBottom: '12px' }}>Order Submitted!</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '24px' }}>
            Thank you for ordering with Sweet Symphony. Your order reference is <strong>#{generatedOrderId}</strong>.
          </p>

          <div style={{
            background: 'var(--bg-secondary)', padding: '20px', borderRadius: 'var(--radius-sm)',
            textAlign: 'left', fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '30px',
            borderLeft: '4px solid var(--primary)', lineHeight: 1.6
          }}>
            <strong>Next Steps:</strong>
            <ul style={{ margin: '8px 0 0', paddingLeft: '20px' }}>
              {apiSuccess ? (
                <li>We have successfully sent the order summary to our kitchen.</li>
              ) : (
                <li>Please complete and send the email in the window that opened! The order was compiled for <strong>kavinduanjana35@gmail.com</strong>.</li>
              )}
              <li>Our team will contact you at <strong>{formData.phone}</strong> to confirm payment details (Bank Transfer / Cash).</li>
              <li>Your delivery has been scheduled for <strong>{formData.deliveryDate} ({formData.deliveryTime})</strong>.</li>
            </ul>
          </div>

          <button 
            onClick={() => setCurrentPage('home')}
            className="btn btn-primary"
            style={{ padding: '12px 30px' }}
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container animate-fade-in" style={{ padding: '60px 24px' }}>
      
      {/* Page Title */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <span className="badge" style={{ marginBottom: '12px' }}>Checkout</span>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Place Your Order</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Fill out delivery details to send your invoice to kavinduanjana35@gmail.com</p>
      </div>

      {cart.length === 0 ? (
        <div style={{
          textAlign: 'center', padding: '60px 20px', background: 'var(--bg-card)', borderRadius: 'var(--radius-md)',
          border: '1.5px dashed var(--border-color)', maxWidth: '600px', margin: '0 auto'
        }}>
          <ShoppingBag size={48} style={{ color: 'var(--text-secondary)', marginBottom: '16px' }} />
          <h3 style={{ margin: '0 0 10px', fontSize: '1.25rem' }}>Your shopping cart is empty</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '20px' }}>
            Please select some cakes from our menu or customize a design before proceeding to place an order.
          </p>
          <button 
            onClick={() => setCurrentPage('menu')}
            className="btn btn-primary"
          >
            Browse Menu
          </button>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '40px',
          alignItems: 'start'
        }}>
          
          {/* Left Column: Form */}
          <div className="glass-panel" style={{ padding: '30px', background: 'var(--bg-card)' }}>
            <h3 style={{ fontSize: '1.35rem', marginBottom: '24px', fontFamily: 'var(--font-sans)', fontWeight: '700' }}>
              Delivery & Customer Info
            </h3>

            {/* Email Method Selection */}
            {WEB3FORMS_ACCESS_KEY && (
              <div style={{
                display: 'flex', gap: '10px', marginBottom: '24px', padding: '6px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-full)'
              }}>
                <button
                  type="button"
                  onClick={() => setEmailMethod('mailto')}
                  style={{
                    flex: 1, padding: '8px', border: 'none', borderRadius: 'var(--radius-full)', cursor: 'pointer',
                    background: emailMethod === 'mailto' ? 'var(--primary)' : 'transparent',
                    color: emailMethod === 'mailto' ? '#fff' : 'var(--text-secondary)',
                    fontWeight: 'bold', fontSize: '0.8rem', transition: 'all var(--transition-fast)'
                  }}
                >
                  Mailto client
                </button>
                <button
                  type="button"
                  onClick={() => setEmailMethod('api')}
                  style={{
                    flex: 1, padding: '8px', border: 'none', borderRadius: 'var(--radius-full)', cursor: 'pointer',
                    background: emailMethod === 'api' ? 'var(--primary)' : 'transparent',
                    color: emailMethod === 'api' ? '#fff' : 'var(--text-secondary)',
                    fontWeight: 'bold', fontSize: '0.8rem', transition: 'all var(--transition-fast)'
                  }}
                >
                  Background API
                </button>
              </div>
            )}

            <form onSubmit={handleSubmitOrder}>
              
              {/* Name */}
              <div className="form-group">
                <label className="form-label" htmlFor="name">Full Name</label>
                <input 
                  type="text" 
                  id="name"
                  name="name"
                  className="form-input"
                  required
                  placeholder="e.g. John Doe"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              {/* Email & Phone grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-grid">
                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email Address</label>
                  <input 
                    type="email" 
                    id="email"
                    name="email"
                    className="form-input"
                    required
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="phone">Phone Number</label>
                  <input 
                    type="tel" 
                    id="phone"
                    name="phone"
                    className="form-input"
                    required
                    placeholder="(555) 000-0000"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Delivery Type */}
              <div className="form-group">
                <label className="form-label">Delivery Option</label>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.9rem' }}>
                    <input 
                      type="radio" 
                      name="deliveryType" 
                      value="delivery" 
                      checked={formData.deliveryType === 'delivery'}
                      onChange={handleChange}
                      style={{ accentColor: 'var(--primary)' }}
                    />
                    <span>Home Delivery (+$5.00)</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.9rem' }}>
                    <input 
                      type="radio" 
                      name="deliveryType" 
                      value="pickup" 
                      checked={formData.deliveryType === 'pickup'}
                      onChange={handleChange}
                      style={{ accentColor: 'var(--primary)' }}
                    />
                    <span>Store Pickup (Free)</span>
                  </label>
                </div>
              </div>

              {/* Address (conditional) */}
              {formData.deliveryType === 'delivery' && (
                <div className="form-group animate-fade-in">
                  <label className="form-label" htmlFor="address">Delivery Address</label>
                  <textarea 
                    id="address"
                    name="address"
                    className="form-textarea"
                    required
                    placeholder="Enter complete street name, apartment number, zip code"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
              )}

              {/* Date & Time slot */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-grid">
                <div className="form-group">
                  <label className="form-label" htmlFor="deliveryDate">Requested Date</label>
                  <input 
                    type="date" 
                    id="deliveryDate"
                    name="deliveryDate"
                    className="form-input"
                    required
                    min={minDate}
                    value={formData.deliveryDate}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="deliveryTime">Preferred Time Slot</label>
                  <select 
                    id="deliveryTime"
                    name="deliveryTime"
                    className="form-select"
                    value={formData.deliveryTime}
                    onChange={handleChange}
                  >
                    <option value="09:00 - 11:00">Morning (09:00 AM - 11:00 AM)</option>
                    <option value="11:00 - 13:00">Midday (11:00 AM - 01:00 PM)</option>
                    <option value="13:00 - 15:00">Afternoon (01:00 PM - 03:00 PM)</option>
                    <option value="15:00 - 17:00">Late Afternoon (03:00 PM - 05:00 PM)</option>
                    <option value="17:00 - 19:00">Evening (05:00 PM - 07:00 PM)</option>
                  </select>
                </div>
              </div>

              {/* Special Notes */}
              <div className="form-group">
                <label className="form-label" htmlFor="notes">Special Kitchen Instructions (Optional)</label>
                <textarea 
                  id="notes"
                  name="notes"
                  className="form-textarea"
                  placeholder="e.g. Allergies, sugar levels, specific delivery directions..."
                  value={formData.notes}
                  onChange={handleChange}
                />
              </div>

              {/* Submit button */}
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={isSubmitting}
                style={{ width: '100%', gap: '10px', marginTop: '12px', padding: '14px 20px', fontSize: '1.05rem' }}
              >
                <Send size={18} />
                {isSubmitting ? 'Processing Order...' : 'Send Order via Email'}
              </button>

            </form>
          </div>

          {/* Right Column: Cart Summary */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            
            {/* Invoice box */}
            <div className="glass-panel" style={{ padding: '30px', background: 'var(--bg-card)' }}>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '24px', fontFamily: 'var(--font-sans)', fontWeight: '700' }}>
                Invoice Summary
              </h3>

              {/* Scrollable list */}
              <div style={{
                maxHeight: '280px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px',
                paddingRight: '6px', marginBottom: '24px'
              }}>
                {cart.map(item => (
                  <div key={item.id} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      style={{ width: '50px', height: '50px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }}
                    />
                    <div style={{ flexGrow: 1 }}>
                      <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>{item.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        Qty: {item.quantity} | {item.selectedSize || 'Standard'}
                      </div>
                      {item.customText && (
                        <div style={{ fontSize: '0.7rem', color: 'var(--secondary)', fontStyle: 'italic' }}>Message: "{item.customText}"</div>
                      )}
                    </div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div style={{ height: '1px', background: 'var(--border-color)', margin: '20px 0' }} />

              {/* Calculations */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                  <span>Delivery ({formData.deliveryType})</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                  <span>Est. Sales Tax (8%)</span>
                  <span>$0.00 (Tax Free)</span>
                </div>

                <div style={{ height: '1px', background: 'var(--border-color)', margin: '10px 0' }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ fontSize: '1.05rem' }}>Total Amount:</strong>
                  <strong style={{ fontSize: '1.5rem', color: 'var(--primary)' }}>${total.toFixed(2)}</strong>
                </div>
              </div>
            </div>

            {/* Email info banner */}
            <div className="glass-panel" style={{
              padding: '24px', background: 'var(--bg-secondary)', borderLeft: '4px solid var(--secondary)',
              display: 'flex', gap: '12px', alignItems: 'flex-start', fontSize: '0.85rem', lineHeight: 1.5
            }}>
              <Info size={18} style={{ color: 'var(--secondary)', flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ color: 'var(--text-primary)' }}>Email Order Protocol</strong>
                <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>
                  Sweet Symphony runs purely on the frontend. Clicking checkout initiates your mail client prefilled with your exact cake specifications and bill totals addressing <strong>kavinduanjana35@gmail.com</strong>. Complete and hit send in your email client to notify our bakers.
                </p>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* Embedded styles for small screens grid formatting */}
      <style>{`
        @media (max-width: 500px) {
          .form-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
