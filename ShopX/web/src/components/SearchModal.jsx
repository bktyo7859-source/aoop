import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { Api } from '../services/api';
import { getProductImages } from '../utils/imageService';

const POPULAR_SEARCHES = [
  'Perfumery',
  'Midnight Oud',
  'Table Lamp',
  'Cotton Sheet',
  'Audio & Headphones',
  'Watches',
  'Home Decor',
  'Wireless Mouse'
];

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 150);
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setResults([]);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const data = await Api.products.search({ search: query.trim(), size: 8 });
        const list = (data && data.content) || (Array.isArray(data) ? data : []);
        setResults(list);
      } catch (err) {
        console.error('Search failed:', err);
      } finally {
        setLoading(false);
      }
    }, 280);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  const handleSelectProduct = (productId) => {
    onClose();
    navigate(`/product/${productId}`);
  };

  const handleFullSearch = (e) => {
    e?.preventDefault();
    if (query.trim()) {
      onClose();
      navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(10, 10, 10, 0.75)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        zIndex: 9000,
        display: 'flex',
        flexDirection: 'column',
        animation: 'fadeIn 0.3s var(--ease-editorial)'
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          backgroundColor: '#ffffff',
          borderBottom: '1px solid var(--border-hairline)',
          paddingTop: '2.5rem',
          paddingBottom: '3rem',
          boxShadow: '0 20px 40px rgba(0,0,0,0.06)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="shopcx-container">
          {/* Top Bar with ESC */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <span className="editorial-tag" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={13} color="#bfa175" /> SHOPCX INDEX & DISCOVERY
            </span>
            <button
              onClick={onClose}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--text-secondary)'
              }}
              data-cursor="button"
            >
              <span>ESC</span>
              <X size={18} />
            </button>
          </div>

          {/* Search Input */}
          <form onSubmit={handleFullSearch} style={{ position: 'relative', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', borderBottom: '2px solid var(--text-primary)', paddingBottom: '0.85rem' }}>
              <Search size={28} style={{ marginRight: '1rem', color: 'var(--text-primary)' }} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, objects, collections..."
                style={{
                  width: '100%',
                  border: 'none',
                  outline: 'none',
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)',
                  color: 'var(--text-primary)',
                  backgroundColor: 'transparent',
                  lineHeight: 1.2
                }}
              />
              {loading && <Loader2 size={24} className="animate-spin" style={{ color: 'var(--text-muted)' }} />}
              {query && !loading && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  style={{ color: 'var(--text-muted)', padding: '4px' }}
                >
                  <X size={20} />
                </button>
              )}
            </div>
          </form>

          {/* Popular Search Suggestions */}
          {!query && (
            <div>
              <div className="editorial-tag" style={{ marginBottom: '1rem' }}>SUGGESTED DISCOVERIES</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                {POPULAR_SEARCHES.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    style={{
                      padding: '0.5rem 1.1rem',
                      backgroundColor: 'var(--bg-secondary)',
                      border: '1px solid var(--border-hairline)',
                      fontSize: '0.82rem',
                      fontFamily: 'var(--font-sans)',
                      letterSpacing: '0.04em',
                      transition: 'all 0.2s ease',
                      borderRadius: 0
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--text-primary)';
                      e.currentTarget.style.color = '#fff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
                      e.currentTarget.style.color = 'var(--text-primary)';
                    }}
                    data-cursor="button"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search Results */}
          {query && results.length > 0 && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <span className="editorial-tag">{results.length} OBJECTS LOCATED</span>
                <button
                  onClick={handleFullSearch}
                  className="btn-editorial-text"
                  style={{ fontSize: '0.78rem' }}
                >
                  VIEW ALL RESULTS <ArrowRight size={14} />
                </button>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                  gap: '1.5rem',
                  maxHeight: '48vh',
                  overflowY: 'auto',
                  paddingRight: '0.5rem'
                }}
              >
                {results.map((product) => {
                  const imgs = getProductImages(product);
                  return (
                    <div
                      key={product.id}
                      onClick={() => handleSelectProduct(product.id)}
                      style={{
                        display: 'flex',
                        gap: '1rem',
                        alignItems: 'center',
                        padding: '0.75rem',
                        border: '1px solid var(--border-hairline)',
                        backgroundColor: 'var(--bg-secondary)',
                        cursor: 'pointer',
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
                      data-cursor="view"
                    >
                      <div style={{ width: '64px', height: '64px', flexShrink: 0, overflow: 'hidden', backgroundColor: '#eae8e1' }}>
                        <img
                          src={imgs.primary}
                          alt={product.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div className="editorial-tag" style={{ fontSize: '0.65rem', marginBottom: '2px' }}>
                          {product.categoryName || 'OBJECT'}
                        </div>
                        <div
                          style={{
                            fontSize: '0.9rem',
                            fontWeight: 500,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            color: 'var(--text-primary)'
                          }}
                        >
                          {product.name}
                        </div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', marginTop: '3px' }}>
                          ₹{Number(product.price).toLocaleString('en-IN')}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* No results state */}
          {query && !loading && results.length === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem 0' }}>
              <div className="font-serif" style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>
                No curated objects found
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                We couldn't find any objects matching "{query}". Explore our complete catalog.
              </p>
              <button
                onClick={() => {
                  onClose();
                  navigate('/shop');
                }}
                className="btn-editorial-primary"
                data-cursor="button"
              >
                EXPLORE ALL COLLECTIONS
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
