import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Compass, Shield, Award, ChevronRight } from 'lucide-react';
import { Api } from '../services/api';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        // Load initial products
        const prodData = await Api.products.search({ page: 0, size: 8 });
        const list = (prodData && prodData.content) || (Array.isArray(prodData) ? prodData : []);
        setFeaturedProducts(list);

        // Load categories
        const catData = await Api.categories.getAll();
        setCategories(Array.isArray(catData) ? catData.slice(0, 6) : []);
      } catch (err) {
        console.error('Home load error:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="animate-fade-in" style={{ paddingTop: 'var(--header-height)' }}>
      {/* 1. HERO SECTION — IMMERSIVE EDITORIAL */}
      <section
        style={{
          minHeight: 'calc(90vh - var(--header-height))',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          paddingTop: 'clamp(2rem, 5vw, 4rem)',
          paddingBottom: '2.5rem',
          borderBottom: '1px solid var(--border-hairline)',
          backgroundColor: '#fbfbfa'
        }}
      >
        <div className="shopcx-container" style={{ width: '100%', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {/* Tagline */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem' }}>
            <span
              style={{
                width: '8px',
                height: '8px',
                backgroundColor: 'var(--text-primary)',
                borderRadius: '50%',
                display: 'inline-block'
              }}
            />
            <span className="editorial-tag">AUTUMN / WINTER 2026 EDITION</span>
          </div>

          {/* Giant Editorial Headline */}
          <div style={{ maxWidth: '1200px', marginBottom: '2.5rem' }}>
            <h1
              className="font-serif"
              style={{
                fontSize: 'clamp(2.75rem, 7.5vw, 6.75rem)',
                lineHeight: 0.96,
                letterSpacing: '-0.03em',
                color: 'var(--text-primary)',
                fontWeight: 400
              }}
            >
              Objects designed for the way you live.
            </h1>
          </div>

          {/* Hero Bottom Bar: Manifest + CTA + Hero Visual Preview */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2.5rem',
              alignItems: 'flex-end',
              paddingTop: '2rem',
              borderTop: '1px solid var(--border-hairline)'
            }}
          >
            <p
              style={{
                fontSize: 'clamp(0.95rem, 1.2vw, 1.15rem)',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
                maxWidth: '480px',
                fontFamily: 'var(--font-sans)'
              }}
            >
              ShopCX is an architectural curated inventory of sensory objects, bespoke accoutrements, and functional art crafted for permanence.
            </p>

            <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
              <Link to="/shop" className="btn-editorial-primary" data-cursor="explore">
                SHOP COLLECTION <ArrowRight size={15} style={{ marginLeft: '6px' }} />
              </Link>
              <Link to="/collections" className="btn-editorial-secondary" data-cursor="button">
                VIEW LOOKBOOK
              </Link>
            </div>

            <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <span className="editorial-tag">AUTHORITATIVE DATABASE</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                32,950+ LIVE OBJECTS
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MARQUEE BRAND STATEMENT */}
      <div
        style={{
          borderBottom: '1px solid var(--border-hairline)',
          backgroundColor: 'var(--bg-primary)',
          overflow: 'hidden',
          padding: '1.1rem 0'
        }}
      >
        <div className="marquee-track">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '2.5rem',
                paddingRight: '2.5rem',
                whiteSpace: 'nowrap',
                fontFamily: 'var(--font-display)',
                fontSize: '0.88rem',
                letterSpacing: '0.22em',
                color: 'var(--text-primary)'
              }}
            >
              <span>HAUTE DESIGN</span>
              <span style={{ color: 'var(--accent-gold)' }}>✦</span>
              <span>COMPLIMENTARY INSURED DELIVERY</span>
              <span style={{ color: 'var(--accent-gold)' }}>✦</span>
              <span>AUTHENTIC PROVENANCE</span>
              <span style={{ color: 'var(--accent-gold)' }}>✦</span>
              <span>TIMELESS OBJECTS</span>
              <span style={{ color: 'var(--accent-gold)' }}>✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. CURATED SPOTLIGHT — SPLIT LOOKBOOK SECTION */}
      <section style={{ padding: 'clamp(4rem, 8vw, 7rem) 0', borderBottom: '1px solid var(--border-hairline)' }}>
        <div className="shopcx-container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 'clamp(2.5rem, 5vw, 5rem)',
              alignItems: 'center'
            }}
          >
            {/* Split Left: High-Fashion Visual Composition */}
            <div
              className="img-zoom-container"
              style={{
                aspectRatio: '4 / 5',
                overflow: 'hidden',
                backgroundColor: '#eeeae1',
                boxShadow: '0 20px 45px rgba(0,0,0,0.06)'
              }}
              data-cursor="explore"
            >
              <img
                src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=85"
                alt="Haute Perfumery & Editorial Objects"
                className="img-zoom-target"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '24px',
                  left: '24px',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(8px)',
                  padding: '12px 18px'
                }}
              >
                <div className="editorial-tag">CURATION 01</div>
                <div className="font-serif" style={{ fontSize: '1.15rem' }}>Sensory & Archival Fragrances</div>
              </div>
            </div>

            {/* Split Right: Editorial Copy & Selection */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span className="editorial-tag" style={{ marginBottom: '0.75rem', color: 'var(--accent-gold)' }}>
                FEATURED EDITORIAL
              </span>
              <h2
                className="font-serif"
                style={{
                  fontSize: 'clamp(2rem, 4.5vw, 3.8rem)',
                  lineHeight: 1.08,
                  marginBottom: '1.5rem',
                  color: 'var(--text-primary)'
                }}
              >
                The Architecture of Quiet Luxury.
              </h2>
              <p
                style={{
                  fontSize: '1.02rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.7,
                  marginBottom: '2rem'
                }}
              >
                Every piece in our catalog is chosen for its tactile honesty, geometric purity, and longevity. From handcrafted niche perfumery to sculptural acoustic instruments, discover things that elevate everyday rituals.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ padding: '8px', backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}>
                    <Sparkles size={18} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '2px' }}>Curated Niche Standards</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Rigorous material verification across 74 distinct specialized categories.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ padding: '8px', backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}>
                    <Shield size={18} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '2px' }}>Direct Provenance</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Verified real-time stock allocation directly with our fulfillment hubs.</p>
                  </div>
                </div>
              </div>

              <div>
                <Link to="/shop" className="btn-editorial-primary" data-cursor="button">
                  EXPLORE THE CURATION <ArrowRight size={15} style={{ marginLeft: '8px' }} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS GRID */}
      <section style={{ padding: 'clamp(4rem, 8vw, 7rem) 0', borderBottom: '1px solid var(--border-hairline)' }}>
        <div className="shopcx-container">
          {/* Section Header */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              gap: '1.5rem',
              marginBottom: '3rem',
              borderBottom: '1px solid var(--border-hairline)',
              paddingBottom: '1.5rem'
            }}
          >
            <div>
              <span className="editorial-tag">EDITION ARCHIVE</span>
              <h2 className="font-serif" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', marginTop: '4px' }}>
                Selected Highlights
              </h2>
            </div>
            <Link to="/shop" className="btn-editorial-text" data-cursor="button">
              VIEW ALL OBJECTS <ArrowRight size={14} />
            </Link>
          </div>

          {/* Product Grid */}
          {loading ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '2rem' }}>
              {[...Array(4)].map((_, i) => (
                <div key={i} style={{ aspectRatio: '3/4', backgroundColor: 'var(--bg-secondary)', animation: 'fadeIn 0.6s infinite alternate' }} />
              ))}
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: 'clamp(1.5rem, 3vw, 2.5rem)'
              }}
            >
              {featuredProducts.slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 5. EDITORIAL CATEGORY SPOTLIGHTS */}
      <section style={{ padding: 'clamp(4rem, 8vw, 7rem) 0', backgroundColor: 'var(--bg-secondary)' }}>
        <div className="shopcx-container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3.5rem' }}>
            <span className="editorial-tag">CURATED DOMAINS</span>
            <h2 className="font-serif" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', marginTop: '4px' }}>
              Explore By Category
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
              Immerse yourself in specialized collections crafted to bring order, beauty, and function.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem'
            }}
          >
            {[
              {
                name: 'Perfumery & Scents',
                desc: 'Artisanal extraits and sensory fragrances',
                image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=85',
                url: '/shop?category=63'
              },
              {
                name: 'Home & Architecture',
                desc: 'Sculptural lighting, decor & tactile textiles',
                image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=85',
                url: '/shop?category=43'
              },
              {
                name: 'Tech & Peripherals',
                desc: 'Minimalist desktop tools and ergonomic instruments',
                image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=85',
                url: '/shop?category=19'
              }
            ].map((cat, idx) => (
              <Link
                key={idx}
                to={cat.url}
                className="img-zoom-container"
                style={{
                  height: '420px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '2rem',
                  color: '#ffffff',
                  position: 'relative'
                }}
                data-cursor="explore"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="img-zoom-target"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.15) 60%, transparent 100%)'
                  }}
                />
                <div style={{ position: 'relative', zIndex: 2 }}>
                  <div className="editorial-tag" style={{ color: 'var(--accent-gold)', marginBottom: '4px' }}>
                    0{idx + 1} / DOMAIN
                  </div>
                  <h3 className="font-serif" style={{ fontSize: '1.8rem', marginBottom: '4px' }}>
                    {cat.name}
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)', marginBottom: '1rem' }}>
                    {cat.desc}
                  </p>
                  <span className="btn-editorial-text" style={{ fontSize: '0.75rem', color: '#fff' }}>
                    DISCOVER NOW <ChevronRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
