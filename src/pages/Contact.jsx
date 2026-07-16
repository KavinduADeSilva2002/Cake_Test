import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Compile email message
    const targetEmail = "kavinduanjana35@gmail.com";
    const subjectLine = `[Inquiry] ${formData.subject} - ${formData.name}`;
    const bodyContent = `Customer Name: ${formData.name}\nCustomer Email: ${formData.email}\n\nMessage:\n${formData.message}`;

    // Trigger email client
    const mailtoLink = `mailto:${targetEmail}?subject=${encodeURIComponent(subjectLine)}&body=${encodeURIComponent(bodyContent)}`;
    
    // Simulate submission success and trigger client
    setTimeout(() => {
      window.location.href = mailtoLink;
      setIsSubmitting(false);
      setSuccess(true);
      
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 }
      });
    }, 800);
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '60px 24px' }}>
      
      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: '56px' }}>
        <span className="badge" style={{ marginBottom: '12px' }}>Get In Touch</span>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>We'd Love to Hear From You</h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: '1.05rem', lineHeight: '1.6' }}>
          Have questions about catering, weddings, custom designs, or deliveries? Reach out, and our team will get back to you within 24 hours.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '40px',
        alignItems: 'start'
      }}>
        
        {/* Left Column: Form / Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          
          {/* Contact Details Panel */}
          <div className="glass-panel" style={{ padding: '30px', background: 'var(--bg-card)' }}>
            <h3 style={{ fontSize: '1.35rem', marginBottom: '24px', fontFamily: 'var(--font-sans)', fontWeight: '700' }}>
              Connect Details
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Address */}
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{
                  background: 'var(--primary-alpha)', color: 'var(--primary)', padding: '10px', borderRadius: '50%', display: 'flex', alignItems: 'center'
                }}>
                  <MapPin size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: '0.95rem' }}>Visit Our Boutique</div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '4px', lineHeight: 1.5 }}>
                    45 Cake Boulevard, Pastry District, New York, NY 10013
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{
                  background: 'var(--primary-alpha)', color: 'var(--primary)', padding: '10px', borderRadius: '50%', display: 'flex', alignItems: 'center'
                }}>
                  <Phone size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: '0.95rem' }}>Direct Line</div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '4px' }}>
                    <a href="tel:+15550199000" style={{ transition: 'color var(--transition-fast)' }} onMouseEnter={e => e.target.style.color = 'var(--primary)'} onMouseLeave={e => e.target.style.color = 'inherit'}>+1 (555) 019-9000</a>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{
                  background: 'var(--primary-alpha)', color: 'var(--primary)', padding: '10px', borderRadius: '50%', display: 'flex', alignItems: 'center'
                }}>
                  <Mail size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: '0.95rem' }}>Bakehouse Email</div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '4px' }}>
                    <a href="mailto:kavinduanjana35@gmail.com" style={{ transition: 'color var(--transition-fast)' }} onMouseEnter={e => e.target.style.color = 'var(--primary)'} onMouseLeave={e => e.target.style.color = 'inherit'}>kavinduanjana35@gmail.com</a>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{
                  background: 'var(--primary-alpha)', color: 'var(--primary)', padding: '10px', borderRadius: '50%', display: 'flex', alignItems: 'center'
                }}>
                  <Clock size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: '0.95rem' }}>Operating Hours</div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '4px', lineHeight: 1.5 }}>
                    Monday - Friday: 8:00 AM - 7:00 PM <br />
                    Saturday: 9:00 AM - 8:00 PM <br />
                    Sunday: 10:00 AM - 5:00 PM
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Interactive Map Visualizer */}
          <div className="glass-panel" style={{
            padding: '24px', background: 'var(--bg-card)', height: '240px', position: 'relative', overflow: 'hidden',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            {/* Mock Vector Street Map grid */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.15,
              backgroundImage: 'linear-gradient(#ccc 1px, transparent 1px), linear-gradient(90deg, #ccc 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }} />
            
            {/* Mock Roads */}
            <div style={{ position: 'absolute', top: '110px', left: 0, width: '100%', height: '20px', background: 'var(--border-color)' }} />
            <div style={{ position: 'absolute', left: '160px', top: 0, width: '20px', height: '100%', background: 'var(--border-color)' }} />
            
            {/* Central Park representation */}
            <div style={{
              position: 'absolute', top: '20px', left: '20px', width: '100px', height: '60px',
              background: 'rgba(76, 175, 80, 0.2)', border: '1px dashed rgba(76, 175, 80, 0.4)', borderRadius: '8px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: '#4caf50', fontWeight: 'bold'
            }}>
              Green Gardens
            </div>

            {/* Cake Boutique Location */}
            <div style={{
              position: 'absolute', top: '100px', left: '150px', zIndex: 5,
              display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer'
            }} className="float-img">
              <div style={{
                background: 'var(--primary)', color: '#fff', padding: '8px', borderRadius: '50%',
                boxShadow: '0 4px 12px rgba(255, 107, 139, 0.4)', border: '2px solid #fff'
              }}>
                <MapPin size={18} />
              </div>
              <div style={{
                background: 'var(--bg-modal)', border: '1px solid var(--border-color)', borderRadius: '4px',
                padding: '2px 8px', fontSize: '0.65rem', fontWeight: 'bold', marginTop: '4px', whiteSpace: 'nowrap',
                boxShadow: 'var(--shadow-sm)'
              }}>
                Sweet Symphony
              </div>
            </div>
            
            <div style={{
              position: 'absolute', bottom: '12px', right: '12px', background: 'var(--bg-modal)',
              padding: '4px 10px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-color)',
              fontSize: '0.7rem', fontWeight: 'bold', color: 'var(--text-secondary)'
            }}>
              NYC Patisserie Zone Map
            </div>
          </div>

        </div>

        {/* Right Column: Contact Inquiry Form */}
        <div className="glass-panel" style={{ padding: '30px', background: 'var(--bg-card)' }}>
          {success ? (
            <div style={{ textAlign: 'center', padding: '40px 10px' }} className="animate-fade-in">
              <div style={{
                background: 'var(--primary-alpha)', color: 'var(--primary)', width: '64px', height: '64px', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px'
              }}>
                <CheckCircle size={36} />
              </div>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '8px' }}>Inquiry Prepared!</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '24px' }}>
                Your inquiry has been compiled. Please send the pre-addressed email that just opened in your browser/email app.
              </p>
              <button 
                onClick={() => setSuccess(false)}
                className="btn btn-outline"
                style={{ padding: '8px 20px', fontSize: '0.85rem' }}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '24px', fontFamily: 'var(--font-sans)', fontWeight: '700' }}>
                Send Feedback
              </h3>
              
              <form onSubmit={handleSubmit}>
                {/* Name */}
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-name">Your Name</label>
                  <input 
                    type="text" 
                    id="contact-name"
                    name="name"
                    className="form-input"
                    required
                    placeholder="e.g. Jane Doe"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                {/* Email */}
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-email">Email Address</label>
                  <input 
                    type="email" 
                    id="contact-email"
                    name="email"
                    className="form-input"
                    required
                    placeholder="jane@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                {/* Subject Selector */}
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-subject">Inquiry Subject</label>
                  <select 
                    id="contact-subject"
                    name="subject"
                    className="form-select"
                    value={formData.subject}
                    onChange={handleChange}
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Wedding Consultation">Wedding Cake Consultation</option>
                    <option value="Catering Service">Bulk Catering Service</option>
                    <option value="Delivery Status">Delivery Tracking Status</option>
                    <option value="Feedback">Patisserie Feedback</option>
                  </select>
                </div>

                {/* Message */}
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-message">Message Details</label>
                  <textarea 
                    id="contact-message"
                    name="message"
                    className="form-textarea"
                    required
                    rows={5}
                    placeholder="Type details about your inquiry here..."
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>

                {/* Submit button */}
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={isSubmitting}
                  style={{ width: '100%', gap: '10px', marginTop: '8px' }}
                >
                  <Send size={18} />
                  {isSubmitting ? 'Opening Mail client...' : 'Send Inquiry Message'}
                </button>
              </form>
            </>
          )}
        </div>

      </div>

    </div>
  );
}
