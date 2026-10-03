import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ArrowRight, ShoppingBag, ShieldCheck, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { getProductImages } from '../utils/imageService';

const FREE_SHIPPING_THRESHOLD = 2000;

export default function Cart() {
  const { items, cartSubtotal, cartCount, removeItem, clearCart } = useCart();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'SHOPCX10') {
      setDiscountPercent(10);
      addToast('Promo code "SHOPCX10" applied: 10% privilege discount', 'success');
    } else if (promoCode.trim().toUpperCase() === 'HAUTE20') {
      setDiscountPercent(20);
      addToast('Promo code "HAUTE20" applied: 20% privilege discount', 'success');
    } else {
      addToast('Invalid or expired promotional code', 'error');
    }
  };

  const shippingCost = cartSubtotal >= FREE_SHIPPING_THRESHOLD || cartSubtotal === 0 ? 0 : 250;
  const discountAmount = Math.round((cartSubtotal * discountPercent) / 100);
  const grandTotal = Math.max(0, cartSubtotal - discountAmount + shippingCost);

  if (items.length === 0) {
    return (
      <div className="animate-fade-in" style={{ paddingTop: 'calc(var(--header-height) + 4rem)', paddingBottom: '8rem', textAlign: 'center' }}>
        <div className="shopcx-container" style={{ maxWidth: '540px' }}>
          <div style={{ display: 'inline-flex', padding: '1.75rem', backgroundColor: 'var(--bg-secondary)', marginBottom: '1.5rem' }}>
            <ShoppingBag size={42} strokeWidth={1.25} color="var(--text-muted)" />
          </div>
          <h1 className="font-serif" style={{ fontSize: '2.8rem', marginBottom: '0.75rem' }}>
            Your Bag is Empty
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', lineHeight: 1.6, marginBottom: '2.5rem' }}>
            You have not committed any objects to your current shopping bag. Browse our curated catalogs to discover permanent pieces.
          </p>
          <Link to="/shop" className="btn-editorial-primary" data-cursor="button">
            EXPLORE THE CATALOG <ArrowRight size={15} style={{ marginLeft: '8px' }} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in" style={{ paddingTop: 'calc(var(--header-height) + 2rem)', paddingBottom: '7rem' }}>
      <div className="shopcx-container">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid var(--border-hairline)', paddingBottom: '1.5rem', marginBottom: '3rem' }}>
          <div>
            <div className="editorial-tag">ORDER CURATION</div>
            <h1 className="font-serif" style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', marginTop: '4px' }}>
              Shopping Bag ({cartCount})
            </h1>
          </div>
          <button
            onClick={clearCart}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              letterSpacing: '0.08em',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#d32f2f'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
            data-cursor="button"
          >
            <Trash2 size={14} /> CLEAR ALL OBJECTS
          </button>
        </div>

        {/* Two-Column Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'clamp(2.5rem, 5vw, 5rem)',
            alignItems: 'start'
          }}
        >
          {/* LEFT: Items Table */}
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              {items.map((item) => {
                const product = item.product || {};
                const imgs = getProductImages(product);
                const lineTotal = (product.price || 0) * (item.quantity || 1);

                return (
                  <div
                    key={item.id}
                    style={{
                      display: 'flex',
                      gap: '1.5rem',
                      paddingBottom: '1.75rem',
                      borderBottom: '1px solid var(--border-hairline)'
                    }}
                  >
                    <Link
                      to={`/product/${product.id}`}
                      style={{
                        width: '100px',
                        height: '130px',
                        flexShrink: 0,
                        backgroundColor: '#eceae3',
                        overflow: 'hidden',
                        display: 'block'
                      }}
                      data-cursor="view"
                    >
                      <img
                        src={imgs.primary}
                        alt={product.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </Link>

                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <div className="editorial-tag" style={{ fontSize: '0.68rem' }}>
                          {product.category?.name || 'OBJECT'}
                        </div>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 500, marginTop: '2px' }}>
                          <Link to={`/product/${product.id}`} style={{ color: 'var(--text-primary)' }}>
                            {product.name}
                          </Link>
                        </h3>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                          ₹{Number(product.price || 0).toLocaleString('en-IN')} each
                        </div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 600 }}>
                          QTY: {item.quantity || 1}
                        </span>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.05rem', fontWeight: 600 }}>
                            ₹{lineTotal.toLocaleString('en-IN')}
                          </span>

                          <button
                            onClick={() => removeItem(item.id)}
                            style={{
                              color: 'var(--text-muted)',
                              padding: '4px',
                              transition: 'color 0.2s'
                            }}
                            onMouseEnter={e => e.currentTarget.style.color = '#d32f2f'}
                            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                            title="Remove object"
                            data-cursor="button"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ marginTop: '2.5rem' }}>
              <Link to="/shop" className="btn-editorial-text" data-cursor="button">
                ← CONTINUE EXPLORING CATALOG
              </Link>
            </div>
          </div>

          {/* RIGHT: Order Summary Card */}
          <div
            style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-hairline)',
              padding: '2rem 2.25rem',
              position: 'sticky',
              top: 'calc(var(--header-height) + 2rem)'
            }}
          >
            <div className="editorial-tag" style={{ marginBottom: '0.5rem' }}>ORDER SUMMARY</div>
            <h2 className="font-serif" style={{ fontSize: '1.8rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-hairline)', paddingBottom: '1rem' }}>
              Financial Breakdown
            </h2>

            {/* Subtotal */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.85rem', fontSize: '0.92rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Bag Subtotal</span>
              <span style={{ fontFamily: 'var(--font-mono)' }}>₹{cartSubtotal.toLocaleString('en-IN')}</span>
            </div>

            {/* Promo Code Discount */}
            {discountPercent > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.85rem', fontSize: '0.92rem', color: 'var(--accent-olive)' }}>
                <span>Privilege Discount ({discountPercent}%)</span>
                <span style={{ fontFamily: 'var(--font-mono)' }}>- ₹{discountAmount.toLocaleString('en-IN')}</span>
              </div>
            )}

            {/* Shipping */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem', fontSize: '0.92rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Insured White-Glove Delivery</span>
              <span style={{ fontFamily: 'var(--font-mono)' }}>
                {shippingCost === 0 ? <strong style={{ color: 'var(--accent-olive)' }}>COMPLIMENTARY</strong> : `₹${shippingCost}`}
              </span>
            </div>

            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} style={{ display: 'flex', gap: '8px', marginBottom: '1.75rem' }}>
              <div style={{ flex: 1, position: 'relative' }}>
                <input
                  type="text"
                  placeholder="Promo Code (e.g. SHOPCX10)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    border: '1px solid var(--border-hairline)',
                    backgroundColor: '#ffffff',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.82rem',
                    outline: 'none'
                  }}
                />
              </div>
              <button
                type="submit"
                className="btn-editorial-secondary"
                style={{ padding: '0.75rem 1.25rem', fontSize: '0.75rem' }}
                data-cursor="button"
              >
                APPLY
              </button>
            </form>

            {/* Grand Total */}
            <div
              style={{
                borderTop: '1px solid var(--border-hairline)',
                paddingTop: '1.25rem',
                marginBottom: '1.75rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline'
              }}
            >
              <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>Total Commitment</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.65rem', fontWeight: 700 }}>
                ₹{grandTotal.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Checkout CTA */}
            <button
              onClick={() => navigate('/checkout')}
              className="btn-editorial-primary"
              style={{ width: '100%', marginBottom: '1rem', gap: '8px' }}
              data-cursor="button"
            >
              PROCEED TO SECURE CHECKOUT <ArrowRight size={15} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.76rem', color: 'var(--text-muted)', justifyContent: 'center' }}>
              <ShieldCheck size={14} color="#bfa175" /> 256-bit encrypted checkout & live stock reserve.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
