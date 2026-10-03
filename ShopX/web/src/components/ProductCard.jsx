import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Plus, Check, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { getProductImages } from '../utils/imageService';

export default function ProductCard({ product, aspect = 'portrait' }) {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart, addingProductId } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  if (!product) return null;

  const imgs = getProductImages(product);
  const isWishlisted = isInWishlist(product.id);
  const isAdding = addingProductId === product.id;
  const isOutOfStock = product.stockQuantity !== undefined && product.stockQuantity <= 0;

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isOutOfStock) {
      addToCart(product, 1);
    }
  };

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const aspectRatio = aspect === 'square' ? '1 / 1' : aspect === 'tall' ? '3 / 4.2' : '3 / 4';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'transform 0.35s var(--ease-editorial)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-cursor="view"
    >
      <Link to={`/product/${product.id}`} style={{ display: 'block' }}>
        {/* Image Container */}
        <div
          className="img-zoom-container"
          style={{
            aspectRatio: aspectRatio,
            width: '100%',
            position: 'relative',
            backgroundColor: '#eceae3',
            overflow: 'hidden'
          }}
        >
          {/* Primary Image */}
          <img
            src={imgs.primary}
            alt={product.name}
            loading="lazy"
            className="img-zoom-target"
            style={{
              position: 'absolute',
              inset: 0,
              opacity: isHovered && imgs.secondary ? 0 : 1,
              transition: 'opacity 0.6s var(--ease-editorial), transform 0.85s var(--ease-editorial)'
            }}
          />

          {/* Secondary Hover Image */}
          {imgs.secondary && (
            <img
              src={imgs.secondary}
              alt={`${product.name} angle`}
              loading="lazy"
              className="img-zoom-target"
              style={{
                position: 'absolute',
                inset: 0,
                opacity: isHovered ? 1 : 0,
                transition: 'opacity 0.6s var(--ease-editorial), transform 0.85s var(--ease-editorial)'
              }}
            />
          )}

          {/* Badges: Out of Stock / Low Stock / Wishlist */}
          <div
            style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              right: '12px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              zIndex: 3
            }}
          >
            {isOutOfStock ? (
              <span
                style={{
                  backgroundColor: '#000000',
                  color: '#ffffff',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.12em',
                  padding: '4px 8px',
                  textTransform: 'uppercase'
                }}
              >
                OUT OF STOCK
              </span>
            ) : product.stockQuantity && product.stockQuantity <= 5 ? (
              <span
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.92)',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.12em',
                  padding: '4px 8px',
                  textTransform: 'uppercase',
                  border: '1px solid var(--border-hairline)'
                }}
              >
                ONLY {product.stockQuantity} LEFT
              </span>
            ) : <span />}

            <button
              onClick={handleWishlistClick}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(4px)',
                borderRadius: '50%',
                width: '34px',
                height: '34px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: isWishlisted ? '#b05e45' : 'var(--text-primary)',
                transition: 'all 0.25s ease',
                boxShadow: '0 4px 12px rgba(0,0,0,0.06)'
              }}
              aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              data-cursor="button"
            >
              <Heart size={16} fill={isWishlisted ? '#b05e45' : 'none'} strokeWidth={1.75} />
            </button>
          </div>

          {/* Hover Quick Action Overlay */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '12px',
              display: 'flex',
              gap: '8px',
              transform: isHovered ? 'translateY(0)' : 'translateY(102%)',
              transition: 'transform 0.35s var(--ease-editorial)',
              zIndex: 3,
              backgroundColor: 'rgba(255, 255, 255, 0.92)',
              backdropFilter: 'blur(8px)',
              borderTop: '1px solid var(--border-hairline)'
            }}
          >
            <button
              onClick={handleQuickAdd}
              disabled={isOutOfStock || isAdding}
              style={{
                flex: 1,
                padding: '0.7rem 1rem',
                backgroundColor: isOutOfStock ? '#d4d4d0' : 'var(--text-primary)',
                color: '#ffffff',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-sans)',
                fontWeight: 500,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                transition: 'all 0.2s ease'
              }}
              data-cursor="button"
            >
              {isAdding ? (
                <span>ADDING...</span>
              ) : isOutOfStock ? (
                <span>SOLD OUT</span>
              ) : (
                <>
                  <Plus size={14} /> QUICK ADD
                </>
              )}
            </button>
          </div>
        </div>

        {/* Product Details */}
        <div style={{ marginTop: '0.9rem', display: 'flex', flexDirection: 'column', gap: '3px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span className="editorial-tag" style={{ fontSize: '0.68rem' }}>
              {product.categoryName || (product.category && product.category.name) || 'OBJECT'}
            </span>
            {product.stockQuantity && product.stockQuantity > 0 && (
              <span className="editorial-tag" style={{ fontSize: '0.65rem', color: 'var(--accent-olive)' }}>
                ● {product.stockQuantity} IN STOCK
              </span>
            )}
          </div>

          <h3
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.98rem',
              fontWeight: 500,
              color: 'var(--text-primary)',
              lineHeight: 1.35,
              transition: 'color 0.2s ease',
              marginTop: '2px'
            }}
          >
            {product.name}
          </h3>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.92rem',
                fontWeight: 600,
                color: 'var(--text-primary)'
              }}
            >
              ₹{Number(product.price).toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
