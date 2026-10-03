import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Globe, Share2, Sparkles, Send } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { addToast } = useToast();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast('Please enter a valid email address', 'error');
      return;
    }
    setSubscribed(true);
    addToast('Thank you for subscribing to ShopCX Private Dispatches', 'success');
    setEmail('');
  };

  return (
    <footer
      style={{
        backgroundColor: 'var(--bg-dark)',
        color: '#ffffff',
        paddingTop: 'clamp(4rem, 8vw, 7rem)',
        paddingBottom: '3rem',
        marginTop: 'clamp(4rem, 8vw, 7rem)',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)'
      }}
    >
      <div className="shopcx-container">
        {/* Top Newsletter & Brand Statement */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'clamp(2rem, 5vw, 5rem)',
            paddingBottom: 'clamp(3rem, 6vw, 5rem)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.12)'
          }}
        >
          {/* Brand Manifesto */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
                fontWeight: 700,
                letterSpacing: '0.22em',
                marginBottom: '1rem'
              }}
            >
              SHOPCX
            </div>
            <p
              style={{
                color: 'var(--text-light-muted)',
                fontSize: '0.95rem',
                lineHeight: 1.7,
                maxWidth: '420px',
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic'
              }}
            >
              “Objects worth keeping. We curate high-end design, sensory objects, and living essentials engineered for permanence and quiet luxury.”
            </p>
          </div>

          {/* Newsletter Box */}
          <div>
            <span className="editorial-tag" style={{ color: 'var(--accent-gold)' }}>
              PRIVATE DISPATCHES
            </span>
            <h3 className="font-serif" style={{ fontSize: '1.75rem', marginTop: '0.35rem', marginBottom: '0.75rem' }}>
              Stay in the inner circle.
            </h3>
            <p style={{ color: 'var(--text-light-muted)', fontSize: '0.86rem', marginBottom: '1.5rem' }}>
              Receive seasonal editorial lookbooks, archival restocks, and private design releases.
            </p>

            <form onSubmit={handleSubscribe} style={{ display: 'flex', borderBottom: '1px solid rgba(255, 255, 255, 0.3)', paddingBottom: '0.5rem' }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  fontFamily: 'var(--font-sans)',
                  paddingRight: '0.75rem'
                }}
              />
              <button
                type="submit"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#ffffff',
                  fontSize: '0.78rem',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 600,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  padding: '4px 8px'
                }}
                data-cursor="button"
              >
                <span>SUBSCRIBE</span>
                <ArrowRight size={15} />
              </button>
            </form>
          </div>
        </div>

        {/* Navigation Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '2.5rem',
            paddingTop: 'clamp(2.5rem, 5vw, 4rem)',
            paddingBottom: 'clamp(2.5rem, 5vw, 4rem)'
          }}
        >
          {/* Column 1: EXPLORE */}
          <div>
            <div className="editorial-tag" style={{ color: '#ffffff', marginBottom: '1.25rem' }}>
              01 / DISCOVERY
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.88rem' }}>
              <li>
                <Link to="/shop" style={{ color: 'var(--text-light-muted)' }} onMouseEnter={e => e.currentTarget.style.color = '#fff'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-light-muted)'}>
                  Shop Catalog
                </Link>
              </li>
              <li>
                <Link to="/collections" style={{ color: 'var(--text-light-muted)' }} onMouseEnter={e => e.currentTarget.style.color = '#fff'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-light-muted)'}>
                  Editorial Collections
                </Link>
              </li>
              <li>
                <Link to="/shop?sort=new" style={{ color: 'var(--text-light-muted)' }} onMouseEnter={e => e.currentTarget.style.color = '#fff'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-light-muted)'}>
                  New Releases
                </Link>
              </li>
              <li>
                <Link to="/shop?sort=price_desc" style={{ color: 'var(--text-light-muted)' }} onMouseEnter={e => e.currentTarget.style.color = '#fff'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-light-muted)'}>
                  Haute Archive
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: CLIENT CONCIERGE */}
          <div>
            <div className="editorial-tag" style={{ color: '#ffffff', marginBottom: '1.25rem' }}>
              02 / CONCIERGE
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.88rem' }}>
              <li>
                <Link to="/orders" style={{ color: 'var(--text-light-muted)' }} onMouseEnter={e => e.currentTarget.style.color = '#fff'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-light-muted)'}>
                  Order Tracking
                </Link>
              </li>
              <li>
                <Link to="/account" style={{ color: 'var(--text-light-muted)' }} onMouseEnter={e => e.currentTarget.style.color = '#fff'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-light-muted)'}>
                  Customer Portal
                </Link>
              </li>
              <li>
                <Link to="/contact" style={{ color: 'var(--text-light-muted)' }} onMouseEnter={e => e.currentTarget.style.color = '#fff'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-light-muted)'}>
                  White Glove Delivery
                </Link>
              </li>
              <li>
                <Link to="/contact" style={{ color: 'var(--text-light-muted)' }} onMouseEnter={e => e.currentTarget.style.color = '#fff'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-light-muted)'}>
                  Complimentary Returns
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: THE MAISON */}
          <div>
            <div className="editorial-tag" style={{ color: '#ffffff', marginBottom: '1.25rem' }}>
              03 / THE MAISON
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.88rem' }}>
              <li>
                <Link to="/about" style={{ color: 'var(--text-light-muted)' }} onMouseEnter={e => e.currentTarget.style.color = '#fff'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-light-muted)'}>
                  Philosophy & Craft
                </Link>
              </li>
              <li>
                <Link to="/about" style={{ color: 'var(--text-light-muted)' }} onMouseEnter={e => e.currentTarget.style.color = '#fff'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-light-muted)'}>
                  Design Materials
                </Link>
              </li>
              <li>
                <Link to="/contact" style={{ color: 'var(--text-light-muted)' }} onMouseEnter={e => e.currentTarget.style.color = '#fff'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-light-muted)'}>
                  Studio Inquiries
                </Link>
              </li>
              <li>
                <Link to="/about" style={{ color: 'var(--text-light-muted)' }} onMouseEnter={e => e.currentTarget.style.color = '#fff'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-light-muted)'}>
                  Sustainability Codex
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: SOCIAL & LOCALITY */}
          <div>
            <div className="editorial-tag" style={{ color: '#ffffff', marginBottom: '1.25rem' }}>
              04 / NETWORK
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-light-muted)', padding: '6px' }} data-cursor="button" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-light-muted)', padding: '6px' }} data-cursor="button" aria-label="X">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l16 16M4 20L20 4"></path></svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-light-muted)', padding: '6px' }} data-cursor="button" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="https://shopcx.studio" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-light-muted)', padding: '6px' }} data-cursor="button" aria-label="Global Web">
                <Globe size={18} />
              </a>
            </div>
            <div className="editorial-tag" style={{ fontSize: '0.68rem', lineHeight: 1.6 }}>
              STUDIO 08 — NEW DELHI & MUMBAI<br />
              GLOBAL EXPEDITIONS
            </div>
          </div>
        </div>

        {/* Bottom Hairline & Legal */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '2rem',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
            fontSize: '0.78rem',
            color: 'var(--text-light-muted)',
            fontFamily: 'var(--font-mono)'
          }}
        >
          <div>© {new Date().getFullYear()} SHOPCX INC. ALL RIGHTS RESERVED.</div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span>PRIVACY CODEX</span>
            <span>TERMS OF ENGAGEMENT</span>
            <span>COOKIE GOVERNANCE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
