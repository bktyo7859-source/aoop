import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Api } from '../services/api';

const CURATED_LOOKBOOKS = [
  {
    id: 'monochrome',
    title: 'The Monolith & Minimalist Living',
    tag: 'EDITORIAL CURATION 01',
    description: 'Sculptural lighting, architectural furniture, and understated desk accessories stripped to fundamental forms.',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=85',
    categoryFilter: '43',
    itemsCount: '124 Objects'
  },
  {
    id: 'sensory',
    title: 'Sensory Scents & Olfactory Art',
    tag: 'EDITORIAL CURATION 02',
    description: 'Rare botanical extracts, hand-poured essences, and glass flacons formulated for atmospheric presence.',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=85',
    categoryFilter: '63',
    itemsCount: '86 Objects'
  },
  {
    id: 'acoustic',
    title: 'Acoustic Precision & Keyboards',
    tag: 'EDITORIAL CURATION 03',
    description: 'Solid tonewood acoustic instruments, digital grand synthesizers, and audiophile sound monitors.',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=85',
    categoryFilter: '60',
    itemsCount: '48 Objects'
  },
  {
    id: 'leather',
    title: 'Vegetable-Tanned Leather & Carry',
    tag: 'EDITORIAL CURATION 04',
    description: 'Full-grain structured bags, modular wallets, and travel cases designed to patina with time.',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=85',
    categoryFilter: '32',
    itemsCount: '92 Objects'
  },
  {
    id: 'textiles',
    title: 'Egyptian Cotton & Bath Linens',
    tag: 'EDITORIAL CURATION 05',
    description: 'Long-staple organic cotton weaves, waffle bath sheets, and natural temperature-regulating bedding.',
    image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1200&q=85',
    categoryFilter: '11',
    itemsCount: '70 Objects'
  },
  {
    id: 'horology',
    title: 'Modern Horology & Luxury Gifts',
    tag: 'EDITORIAL CURATION 06',
    description: 'Minimalist mechanical timepieces, sapphire crystal dials, and precision metalwork.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=85',
    categoryFilter: '67',
    itemsCount: '150 Objects'
  }
];

export default function Collections() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await Api.categories.getAll();
        setCategories(Array.isArray(res) ? res : []);
      } catch (err) {
        console.error('Failed to load categories:', err);
      }
    }
    loadCategories();
  }, []);

  return (
    <div className="animate-fade-in" style={{ paddingTop: 'var(--header-height)' }}>
      {/* Header Banner */}
      <section style={{ borderBottom: '1px solid var(--border-hairline)', backgroundColor: '#fcfcfb', padding: 'clamp(3rem, 6vw, 5rem) 0' }}>
        <div className="shopcx-container">
          <div className="editorial-tag" style={{ marginBottom: '0.75rem' }}>COLLECTIONS DIRECTORY</div>
          <h1 className="font-serif" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.75rem)', lineHeight: 1.05 }}>
            Curated Series & Lookbooks
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginTop: '0.75rem', maxWidth: '580px' }}>
            Thematic expressions uniting material integrity, form, and purpose across our live inventory.
          </p>
        </div>
      </section>

      {/* Editorial Lookbooks Grid */}
      <section style={{ padding: 'clamp(3rem, 6vw, 5rem) 0', borderBottom: '1px solid var(--border-hairline)' }}>
        <div className="shopcx-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 'clamp(2rem, 4vw, 3.5rem)' }}>
            {CURATED_LOOKBOOKS.map((col) => (
              <div
                key={col.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative'
                }}
              >
                <Link
                  to={`/shop?category=${col.categoryFilter}`}
                  className="img-zoom-container"
                  style={{
                    aspectRatio: '16 / 10',
                    width: '100%',
                    display: 'block',
                    backgroundColor: '#eae8e1',
                    boxShadow: '0 12px 30px rgba(0,0,0,0.05)'
                  }}
                  data-cursor="explore"
                >
                  <img
                    src={col.image}
                    alt={col.title}
                    className="img-zoom-target"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </Link>

                <div style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="editorial-tag">{col.tag}</span>
                    <span className="editorial-tag" style={{ color: 'var(--text-primary)' }}>{col.itemsCount}</span>
                  </div>

                  <h3 className="font-serif" style={{ fontSize: '1.6rem', marginTop: '2px', lineHeight: 1.2 }}>
                    <Link to={`/shop?category=${col.categoryFilter}`}>
                      {col.title}
                    </Link>
                  </h3>

                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6, marginTop: '2px' }}>
                    {col.description}
                  </p>

                  <div style={{ marginTop: '0.75rem' }}>
                    <Link
                      to={`/shop?category=${col.categoryFilter}`}
                      className="btn-editorial-text"
                      style={{ fontSize: '0.78rem' }}
                      data-cursor="button"
                    >
                      EXPLORE SERIES <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Complete Categories Index (All 74 Categories List) */}
      <section style={{ padding: 'clamp(3rem, 6vw, 5rem) 0', backgroundColor: 'var(--bg-secondary)' }}>
        <div className="shopcx-container">
          <div style={{ marginBottom: '2.5rem', borderBottom: '1px solid var(--border-hairline)', paddingBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <span className="editorial-tag">SYSTEM TAXONOMY</span>
              <h2 className="font-serif" style={{ fontSize: '2.2rem', marginTop: '4px' }}>
                Complete Category Index ({categories.length})
              </h2>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: '1rem'
            }}
          >
            {categories.map((cat, idx) => (
              <Link
                key={cat.id}
                to={`/shop?category=${cat.id}`}
                style={{
                  padding: '1rem 1.25rem',
                  backgroundColor: '#ffffff',
                  border: '1px solid var(--border-hairline)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'all 0.25s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--text-primary)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-hairline)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
                data-cursor="button"
              >
                <span style={{ fontSize: '0.88rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                  {cat.name}
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  #{String(cat.id).padStart(2, '0')}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
