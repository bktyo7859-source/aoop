import React, { useState } from 'react';
import { Mail, MapPin, Phone, Clock, ArrowRight, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const FAQS = [
  {
    q: 'How does live inventory verification operate?',
    a: 'Every item in our online catalog is synchronized directly with our primary PostgreSQL fulfillment warehouse engine. When an order is placed, stock quantities are allocated instantaneously to prevent backorders.'
  },
  {
    q: 'What are the parameters for complimentary delivery?',
    a: 'All orders with a subtotal of ₹2,000 or greater automatically qualify for complimentary white-glove insured expedition. Orders under ₹2,000 incur a flat ₹250 courier fee.'
  },
  {
    q: 'What is the return and exchange window?',
    a: 'We offer an effortless 30-day exchange window on all unused objects in original archival packaging with intact serial badges.'
  },
  {
    q: 'Can I request bespoke or corporate curations?',
    a: 'Yes, our Concierge Studio handles bespoke private architectural commissions and corporate gifts. Submit an inquiry through the form with your project requirements.'
  }
];

export default function Contact() {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'General Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    addToast('Your inquiry has been relayed to our Concierge Team', 'success');
  };

  return (
    <div className="animate-fade-in" style={{ paddingTop: 'var(--header-height)' }}>
      {/* Header Banner */}
      <section style={{ padding: 'clamp(3rem, 6vw, 5rem) 0', borderBottom: '1px solid var(--border-hairline)', backgroundColor: '#faf9f6' }}>
        <div className="shopcx-container">
          <div className="editorial-tag" style={{ marginBottom: '0.75rem', color: 'var(--accent-gold)' }}>
            PATRON CONCIERGE
          </div>
          <h1 className="font-serif" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.75rem)', lineHeight: 1.05 }}>
            Concierge & Studio Dialogue
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginTop: '0.75rem', maxWidth: '560px' }}>
            Direct correspondence for private commissions, order tracking, and bespoke archival inquiries.
          </p>
        </div>
      </section>

      {/* Main Grid: Form + Studio Details */}
      <section style={{ padding: 'clamp(3rem, 6vw, 5rem) 0', borderBottom: '1px solid var(--border-hairline)' }}>
        <div className="shopcx-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'clamp(2.5rem, 5vw, 5rem)' }}>
            {/* Contact Form */}
            <div>
              <div className="editorial-tag" style={{ marginBottom: '1rem' }}>DISPATCH A MESSAGE</div>

              {submitted ? (
                <div style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-hairline)', padding: '2.5rem', textAlign: 'center' }}>
                  <div style={{ display: 'inline-flex', padding: '1rem', backgroundColor: '#ffffff', borderRadius: '50%', marginBottom: '1rem' }}>
                    <CheckCircle2 size={36} color="var(--accent-olive)" />
                  </div>
                  <h3 className="font-serif" style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>
                    Dispatch Transmitted
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                    Thank you, {formData.name}. An associate from our concierge division will respond to {formData.email} within 4 business hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', topic: 'General Inquiry', message: '' });
                    }}
                    className="btn-editorial-secondary"
                    data-cursor="button"
                  >
                    SEND ANOTHER INQUIRY
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div>
                    <label className="editorial-tag" style={{ display: 'block', marginBottom: '6px' }}>NAME</label>
                    <input
                      type="text"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      required
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        border: '1px solid var(--border-hairline)',
                        backgroundColor: '#ffffff',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.9rem'
                      }}
                    />
                  </div>

                  <div>
                    <label className="editorial-tag" style={{ display: 'block', marginBottom: '6px' }}>EMAIL ADDRESS</label>
                    <input
                      type="email"
                      placeholder="name@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      required
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        border: '1px solid var(--border-hairline)',
                        backgroundColor: '#ffffff',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.9rem'
                      }}
                    />
                  </div>

                  <div>
                    <label className="editorial-tag" style={{ display: 'block', marginBottom: '6px' }}>INQUIRY NATURE</label>
                    <select
                      value={formData.topic}
                      onChange={(e) => setFormData(prev => ({ ...prev, topic: e.target.value }))}
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        border: '1px solid var(--border-hairline)',
                        backgroundColor: '#ffffff',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.88rem'
                      }}
                      data-cursor="button"
                    >
                      <option value="General Inquiry">General Curatorial Inquiry</option>
                      <option value="Order Tracking">Order & Logistics Expedition</option>
                      <option value="Private Commission">Private Architectural Commission</option>
                      <option value="Press">Press & Editorial Representation</option>
                    </select>
                  </div>

                  <div>
                    <label className="editorial-tag" style={{ display: 'block', marginBottom: '6px' }}>MESSAGE / SPECIFICATIONS</label>
                    <textarea
                      rows={5}
                      placeholder="Describe your inquiry..."
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      required
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        border: '1px solid var(--border-hairline)',
                        backgroundColor: '#ffffff',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.9rem',
                        resize: 'vertical'
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-editorial-primary"
                    style={{ alignSelf: 'flex-start', marginTop: '0.5rem', gap: '8px' }}
                    data-cursor="button"
                  >
                    TRANSMIT INQUIRY <ArrowRight size={15} />
                  </button>
                </form>
              )}
            </div>

            {/* Studio Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div className="editorial-tag">GLOBAL HEADQUARTERS</div>

              <div style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-hairline)', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <MapPin size={20} color="var(--accent-gold)" style={{ marginTop: '3px' }} />
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '2px' }}>New Delhi Studio & Gallery</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      Pavilion 8, Diplomatic Enclave, Chanakyapuri<br />
                      New Delhi, 110021, India
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <Mail size={20} color="var(--accent-gold)" style={{ marginTop: '3px' }} />
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '2px' }}>Digital Transmissions</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      concierge@shopcx.studio<br />
                      curation@shopcx.studio
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <Clock size={20} color="var(--accent-gold)" style={{ marginTop: '3px' }} />
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '2px' }}>Concierge Hours</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      Monday – Saturday: 10:00 – 19:00 IST<br />
                      Private appointments available upon request.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordions Section */}
      <section style={{ padding: 'clamp(3rem, 6vw, 5rem) 0', backgroundColor: 'var(--bg-secondary)' }}>
        <div className="shopcx-container" style={{ maxWidth: '860px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="editorial-tag">FREQUENT INQUIRIES</div>
            <h2 className="font-serif" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', marginTop: '4px' }}>
              Frequently Clarified Questions
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid var(--border-hairline)',
                    padding: '1.25rem 1.75rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                  data-cursor="button"
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ fontSize: '1.02rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                      {faq.q}
                    </h4>
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                  {isOpen && (
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginTop: '0.85rem', borderTop: '1px solid var(--border-hairline)', paddingTop: '0.85rem' }}>
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
