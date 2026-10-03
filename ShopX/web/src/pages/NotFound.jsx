import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div
      className="animate-fade-in"
      style={{
        paddingTop: 'var(--header-height)',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        paddingLeft: '1.5rem',
        paddingRight: '1.5rem'
      }}
    >
      <div style={{ maxWidth: '540px' }}>
        <div className="editorial-tag" style={{ color: 'var(--accent-gold)', marginBottom: '1rem' }}>
          404 ERROR / VOID
        </div>
        <h1
          className="font-serif"
          style={{
            fontSize: 'clamp(4rem, 10vw, 8rem)',
            lineHeight: 0.9,
            marginBottom: '1rem',
            letterSpacing: '-0.04em'
          }}
        >
          404
        </h1>
        <h2 className="font-serif" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', marginBottom: '1rem' }}>
          Looks like this page went somewhere else.
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2.5rem' }}>
          The requested coordinate does not exist in our curatorial index or has been relocated to another gallery wing.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <Link to="/" className="btn-editorial-primary" data-cursor="button">
            RETURN TO SANCTUARY <ArrowRight size={15} style={{ marginLeft: '6px' }} />
          </Link>
          <Link to="/shop" className="btn-editorial-secondary" data-cursor="button">
            DISCOVER CATALOG
          </Link>
        </div>
      </div>
    </div>
  );
}
