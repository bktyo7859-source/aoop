import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Shield, Sparkles, Award } from 'lucide-react';

export default function About() {
  return (
    <div className="animate-fade-in" style={{ paddingTop: 'var(--header-height)' }}>
      {/* Editorial Hero */}
      <section style={{ padding: 'clamp(4rem, 8vw, 7rem) 0', borderBottom: '1px solid var(--border-hairline)', backgroundColor: '#faf9f6' }}>
        <div className="shopcx-container">
          <div className="editorial-tag" style={{ marginBottom: '1rem', color: 'var(--accent-gold)' }}>
            THE MAISON PHILOSOPHY
          </div>
          <h1
            className="font-serif"
            style={{
              fontSize: 'clamp(2.8rem, 6.5vw, 5.5rem)',
              lineHeight: 1.04,
              maxWidth: '1000px',
              marginBottom: '2rem'
            }}
          >
            We curate permanence in a world of planned obsolescence.
          </h1>
          <p
            style={{
              fontSize: '1.2rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.7,
              maxWidth: '680px',
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic'
            }}
          >
            “ShopCX is born from a desire to reduce cognitive and visual noise. We believe every object in your personal environment should possess sculptural dignity, material truth, and enduring function.”
          </p>
        </div>
      </section>

      {/* Visual Composition & Narrative */}
      <section style={{ padding: 'clamp(4rem, 8vw, 7rem) 0', borderBottom: '1px solid var(--border-hairline)' }}>
        <div className="shopcx-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'clamp(2.5rem, 5vw, 5rem)', alignItems: 'center' }}>
            <div
              className="img-zoom-container"
              style={{
                aspectRatio: '4 / 5',
                overflow: 'hidden',
                backgroundColor: '#eae8e1',
                boxShadow: '0 20px 45px rgba(0,0,0,0.06)'
              }}
              data-cursor="explore"
            >
              <img
                src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=85"
                alt="Architectural Object Studio"
                className="img-zoom-target"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            <div>
              <div className="editorial-tag" style={{ marginBottom: '0.75rem' }}>01 / MATERIAL INTEGRITY</div>
              <h2 className="font-serif" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', marginBottom: '1.5rem', lineHeight: 1.15 }}>
                Crafted for Generations.
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                Our taxonomy spans over 74 rigorously indexed product domains—ranging from handcrafted acoustic guitars and long-staple Egyptian cotton textiles to minimal computing peripherals and rare niche perfumery.
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2.5rem' }}>
                We avoid synthetic trends and rapid disposal cycles. Every item is verified through real-time stock allocation and authoritative warehouse provenance before being dispatched in archival casing.
              </p>

              <Link to="/shop" className="btn-editorial-primary" data-cursor="button">
                EXPLORE CURATED CATALOG <ArrowRight size={15} style={{ marginLeft: '6px' }} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars Grid */}
      <section style={{ padding: 'clamp(4rem, 8vw, 7rem) 0', backgroundColor: 'var(--bg-secondary)' }}>
        <div className="shopcx-container">
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 4rem' }}>
            <div className="editorial-tag">FOUR CORE PILLARS</div>
            <h2 className="font-serif" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)', marginTop: '4px' }}>
              The ShopCX Standard
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
            {[
              {
                num: '01',
                title: 'Tactile Honesty',
                desc: 'Uncompromising adherence to authentic raw materials: brushed steel, solid tonewood, vegetable-tanned leather, and glass.'
              },
              {
                num: '02',
                title: 'Minimalist Restraint',
                desc: 'Eliminating non-essential ornament to highlight pure geometric proportions and ergonomic clarity.'
              },
              {
                num: '03',
                title: 'Live Provenance',
                desc: 'Synchronized inventory systems connected directly to physical stocks to guarantee delivery certainty.'
              },
              {
                num: '04',
                title: 'White-Glove Care',
                desc: 'Insured protective fulfillment, custom presentation boxes, and dedicated patron concierge assistance.'
              }
            ].map((pillar) => (
              <div
                key={pillar.num}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid var(--border-hairline)',
                  padding: '2.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent-gold)', marginBottom: '1.5rem' }}>
                  {pillar.num}
                </div>
                <div>
                  <h3 className="font-serif" style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>
                    {pillar.title}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                    {pillar.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
