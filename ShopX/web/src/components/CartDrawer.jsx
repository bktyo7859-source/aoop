import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Trash2, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { getProductImages } from '../utils/imageService';

const FREE_SHIPPING_THRESHOLD = 2000;

export default function CartDrawer() {
  const { isDrawerOpen, closeDrawer, items, cartSubtotal, cartCount, removeItem, addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isDrawerOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isDrawerOpen) {
        closeDrawer();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDrawerOpen, closeDrawer]);

  if (!isDrawerOpen) return null;

  const progressPercent = Math.min(100, (cartSubtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - cartSubtotal);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(10, 10, 10, 0.65)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        zIndex: 9500,
        display: 'flex',
        justifyContent: 'flex-end',
        animation: 'fadeIn 0.25s var(--ease-editorial)'
      }}
      onClick={closeDrawer}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '480px',
          height: '100%',
          backgroundColor: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-10px 0 35px rgba(0,0,0,0.15)',
          animation: 'slideRight 0.4s var(--ease-editorial)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '1.5rem 1.75rem',
            borderBottom: '1px solid var(--border-hairline)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <div>
            <div className="editorial-tag">SHOPPING BAG</div>
            <div className="font-serif" style={{ fontSize: '1.35rem', marginTop: '2px' }}>
              Selected Objects ({cartCount})
            </div>
          </div>
          <button
            onClick={closeDrawer}
            style={{
              padding: '6px',
              color: 'var(--text-primary)',
              transition: 'transform 0.2s ease'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'rotate(90deg)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'rotate(0deg)'}
            data-cursor="button"
          >
            <X size={22} />
          </button>
        </div>

        {/* Free Shipping Progress */}
        <div style={{ padding: '1rem 1.75rem', backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-hairline)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '6px', fontFamily: 'var(--font-sans)' }}>
            <span>
              {remainingForFreeShipping === 0 ? (
                <strong style={{ color: 'var(--accent-olive)' }}>✓ Complimentary Insured Delivery Unlocked</strong>
              ) : (
                `Add ₹${remainingForFreeShipping.toLocaleString('en-IN')} for complimentary shipping`
              )}
            </span>
            <span style={{ fontFamily: 'var(--font-mono)' }}>{Math.round(progressPercent)}%</span>
          </div>
          <div style={{ height: '3px', backgroundColor: 'var(--border-hairline)', width: '100%', overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                backgroundColor: 'var(--text-primary)',
                width: `${progressPercent}%`,
                transition: 'width 0.4s var(--ease-editorial)'
              }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem 1.75rem' }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
              <div style={{ display: 'inline-flex', padding: '1.25rem', backgroundColor: 'var(--bg-secondary)', marginBottom: '1.25rem' }}>
                <ShoppingBag size={32} strokeWidth={1.5} color="var(--text-muted)" />
              </div>
              <h3 className="font-serif" style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>
                Your bag is empty
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', marginBottom: '1.8rem', lineHeight: 1.5 }}>
                Explore the latest objects and curated collections designed for permanence.
              </p>
              <button
                onClick={() => {
                  closeDrawer();
                  navigate('/shop');
                }}
                className="btn-editorial-primary"
                data-cursor="button"
              >
                EXPLORE CATALOG
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {items.map((item) => {
                const product = item.product || {};
                const imgs = getProductImages(product);
                const itemTotal = (product.price || 0) * (item.quantity || 1);

                return (
                  <div
                    key={item.id}
                    style={{
                      display: 'flex',
                      gap: '1rem',
                      paddingBottom: '1.25rem',
                      borderBottom: '1px solid var(--border-hairline)'
                    }}
                  >
                    <div
                      style={{
                        width: '84px',
                        height: '104px',
                        flexShrink: 0,
                        backgroundColor: 'var(--bg-secondary)',
                        overflow: 'hidden',
                        cursor: 'pointer'
                      }}
                      onClick={() => {
                        closeDrawer();
                        navigate(`/product/${product.id}`);
                      }}
                      data-cursor="view"
                    >
                      <img
                        src={imgs.primary}
                        alt={product.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <div className="editorial-tag" style={{ fontSize: '0.65rem' }}>
                          {product.category?.name || 'OBJECT'}
                        </div>
                        <div
                          style={{
                            fontSize: '0.92rem',
                            fontWeight: 500,
                            marginTop: '2px',
                            cursor: 'pointer',
                            color: 'var(--text-primary)'
                          }}
                          onClick={() => {
                            closeDrawer();
                            navigate(`/product/${product.id}`);
                          }}
                        >
                          {product.name}
                        </div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.84rem', marginTop: '4px' }}>
                          ₹{Number(product.price || 0).toLocaleString('en-IN')}
                        </div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid var(--border-hairline)', fontSize: '0.8rem' }}>
                          <span style={{ padding: '0.2rem 0.6rem', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                            QTY: {item.quantity || 1}
                          </span>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          style={{
                            color: 'var(--text-muted)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontSize: '0.75rem',
                            fontFamily: 'var(--font-mono)',
                            letterSpacing: '0.05em',
                            transition: 'color 0.2s'
                          }}
                          onMouseEnter={e => e.currentTarget.style.color = '#d32f2f'}
                          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                          data-cursor="button"
                        >
                          <Trash2 size={14} /> REMOVE
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer / Summary */}
        {items.length > 0 && (
          <div
            style={{
              padding: '1.5rem 1.75rem',
              borderTop: '1px solid var(--border-hairline)',
              backgroundColor: 'var(--bg-secondary)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span className="editorial-tag">SUBTOTAL</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.15rem', fontWeight: 600 }}>
                ₹{cartSubtotal.toLocaleString('en-IN')}
              </span>
            </div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={14} color="#bfa175" /> Shipping & taxes calculated at checkout.
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <button
                onClick={() => {
                  closeDrawer();
                  navigate('/checkout');
                }}
                className="btn-editorial-primary"
                style={{ width: '100%', gap: '8px' }}
                data-cursor="button"
              >
                PROCEED TO CHECKOUT <ArrowRight size={15} />
              </button>
              <button
                onClick={() => {
                  closeDrawer();
                  navigate('/cart');
                }}
                className="btn-editorial-secondary"
                style={{ width: '100%', padding: '0.85rem' }}
                data-cursor="button"
              >
                VIEW FULL BAG
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
