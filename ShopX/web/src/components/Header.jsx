import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, User, Menu, X, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';

export default function Header({ onOpenSearch }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartCount, openDrawer } = useCart();
  const { user } = useAuth();
  const { count: wishlistCount } = useWishlist();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: 'var(--header-height)',
          zIndex: 8000,
          backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.94)' : 'rgba(255, 255, 255, 0.75)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: isScrolled ? '1px solid var(--border-hairline)' : '1px solid transparent',
          transition: 'all 0.35s var(--ease-editorial)',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <div className="shopcx-container" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* LEFT: SHOPCX LOGO */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <Link
              to="/"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.25rem, 2.2vw, 1.65rem)',
                fontWeight: 700,
                letterSpacing: '0.22em',
                color: 'var(--text-primary)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
              data-cursor="explore"
            >
              SHOPCX
            </Link>
          </div>

          {/* CENTER: DESKTOP NAVIGATION */}
          <nav
            style={{
              display: 'none',
              alignItems: 'center',
              gap: 'clamp(1.5rem, 3vw, 3rem)'
            }}
            className="desktop-nav"
          >
            <NavLink
              to="/shop"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              data-cursor="button"
            >
              SHOP
            </NavLink>
            <NavLink
              to="/collections"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              data-cursor="button"
            >
              COLLECTIONS
            </NavLink>
            <NavLink
              to="/shop?sort=new"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              data-cursor="button"
            >
              NEW
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              data-cursor="button"
            >
              ABOUT
            </NavLink>
          </nav>

          {/* RIGHT: SEARCH, ACCOUNT, CART */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(0.85rem, 1.8vw, 1.75rem)' }}>
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.78rem',
                letterSpacing: '0.14em',
                fontFamily: 'var(--font-sans)',
                fontWeight: 500,
                textTransform: 'uppercase',
                padding: '6px 8px'
              }}
              data-cursor="button"
              aria-label="Search Catalog"
            >
              <Search size={18} strokeWidth={1.75} />
              <span className="desktop-only-label">SEARCH</span>
            </button>

            {/* Account Link */}
            <Link
              to="/account"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.78rem',
                letterSpacing: '0.14em',
                fontFamily: 'var(--font-sans)',
                fontWeight: 500,
                textTransform: 'uppercase',
                padding: '6px 8px'
              }}
              data-cursor="button"
              aria-label="Account and Orders"
            >
              <User size={18} strokeWidth={1.75} />
              <span className="desktop-only-label">
                {user ? user.name?.split(' ')[0].toUpperCase() : 'ACCOUNT'}
              </span>
            </Link>

            {/* Wishlist Link (Desktop) */}
            <Link
              to="/shop?filter=wishlist"
              style={{
                display: 'none',
                alignItems: 'center',
                gap: '4px',
                fontSize: '0.78rem',
                letterSpacing: '0.14em',
                fontFamily: 'var(--font-sans)',
                fontWeight: 500,
                position: 'relative'
              }}
              className="desktop-wishlist-link"
              data-cursor="button"
              aria-label="Wishlist"
            >
              <Heart size={18} strokeWidth={1.75} />
              {wishlistCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-6px',
                    right: '-8px',
                    backgroundColor: 'var(--accent-gold)',
                    color: '#fff',
                    borderRadius: '50%',
                    width: '16px',
                    height: '16px',
                    fontSize: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-mono)'
                  }}
                >
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Trigger */}
            <button
              onClick={openDrawer}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.78rem',
                letterSpacing: '0.14em',
                fontFamily: 'var(--font-sans)',
                fontWeight: 500,
                textTransform: 'uppercase',
                padding: '6px 8px',
                position: 'relative'
              }}
              data-cursor="button"
              aria-label="Open Shopping Bag"
            >
              <ShoppingBag size={18} strokeWidth={1.75} />
              <span className="desktop-only-label">BAG</span>
              {cartCount > 0 && (
                <span
                  style={{
                    backgroundColor: 'var(--text-primary)',
                    color: '#ffffff',
                    fontSize: '0.7rem',
                    fontFamily: 'var(--font-mono)',
                    padding: '2px 7px',
                    marginLeft: '2px',
                    transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                >
                  {cartCount}
                </span>
              )}
            </button>

            {/* Hamburger for Mobile */}
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              style={{
                display: 'none',
                padding: '6px',
                marginLeft: '4px'
              }}
              className="mobile-burger-btn"
              aria-label="Toggle Mobile Navigation"
              data-cursor="button"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            top: 'var(--header-height)',
            backgroundColor: '#ffffff',
            zIndex: 7999,
            padding: '2rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            animation: 'fadeIn 0.25s var(--ease-editorial)'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            <div className="editorial-tag">NAVIGATION</div>
            <Link
              to="/shop"
              className="font-serif"
              style={{ fontSize: '2.2rem', color: 'var(--text-primary)' }}
            >
              SHOP ALL
            </Link>
            <Link
              to="/collections"
              className="font-serif"
              style={{ fontSize: '2.2rem', color: 'var(--text-primary)' }}
            >
              COLLECTIONS
            </Link>
            <Link
              to="/shop?sort=new"
              className="font-serif"
              style={{ fontSize: '2.2rem', color: 'var(--text-primary)' }}
            >
              NEW ARRIVALS
            </Link>
            <Link
              to="/about"
              className="font-serif"
              style={{ fontSize: '2.2rem', color: 'var(--text-primary)' }}
            >
              ABOUT SHOPCX
            </Link>
            <Link
              to="/contact"
              className="font-serif"
              style={{ fontSize: '2.2rem', color: 'var(--text-primary)' }}
            >
              CONTACT
            </Link>
          </div>

          <div style={{ borderTop: '1px solid var(--border-hairline)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link to="/account" className="btn-editorial-text">
              {user ? `ACCOUNT (${user.name})` : 'LOG IN / REGISTER'}
            </Link>
            <span className="editorial-tag">EDITION 2026</span>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 900px) {
          .desktop-nav {
            display: flex !important;
          }
          .desktop-wishlist-link {
            display: inline-flex !important;
          }
        }
        @media (max-width: 899px) {
          .desktop-only-label {
            display: none !important;
          }
          .mobile-burger-btn {
            display: inline-flex !important;
          }
        }
      `}</style>
    </>
  );
}
