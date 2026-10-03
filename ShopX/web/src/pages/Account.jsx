import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, LogOut, Package, ShoppingBag, Shield, Check, ArrowRight, Loader2, Sparkles, KeyRound } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function Account() {
  const { user, login, register, logout, loading } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [tab, setTab] = useState('login'); // 'login' or 'register'
  const [loginEmail, setLoginEmail] = useState('shashank@shopx.local');
  const [loginPassword, setLoginPassword] = useState('ShopX@123');

  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(loginEmail, loginPassword);
      addToast('Welcome back to ShopCX', 'success');
    } catch (err) {
      addToast(err.message || 'Authentication failed. Verify credentials.', 'error');
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      await register({
        name: regName,
        email: regEmail,
        password: regPassword,
        role: 'CUSTOMER'
      });
      addToast('Patron account created successfully', 'success');
    } catch (err) {
      addToast(err.message || 'Registration failed', 'error');
    }
  };

  const handleQuickDemoFill = (email, pwd) => {
    setLoginEmail(email);
    setLoginPassword(pwd);
  };

  // Logged-in Profile View
  if (user) {
    return (
      <div className="animate-fade-in" style={{ paddingTop: 'calc(var(--header-height) + 2.5rem)', paddingBottom: '7rem' }}>
        <div className="shopcx-container" style={{ maxWidth: '860px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid var(--border-hairline)', paddingBottom: '1.5rem', marginBottom: '3rem' }}>
            <div>
              <span className="editorial-tag">PATRON PROFILE</span>
              <h1 className="font-serif" style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', marginTop: '4px' }}>
                Welcome, {user.name}
              </h1>
            </div>
            <button
              onClick={() => {
                logout();
                addToast('Logged out of session', 'info');
              }}
              className="btn-editorial-secondary"
              style={{ padding: '0.65rem 1.25rem', fontSize: '0.78rem', gap: '6px' }}
              data-cursor="button"
            >
              <LogOut size={15} /> LOGOUT
            </button>
          </div>

          {/* User Dashboard Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
            {/* Account Details Card */}
            <div style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-hairline)', padding: '1.75rem' }}>
              <div className="editorial-tag" style={{ marginBottom: '0.75rem' }}>DOSSIER</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem' }}>
                <div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem', display: 'block' }}>FULL NAME</span>
                  <strong>{user.name}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem', display: 'block' }}>EMAIL IDENTITY</span>
                  <span>{user.email}</span>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem', display: 'block' }}>PATRON ID</span>
                  <span style={{ fontFamily: 'var(--font-mono)' }}>#CX-00{user.customerId}</span>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem', display: 'block' }}>ACCESS TIER</span>
                  <span style={{ color: 'var(--accent-olive)', fontWeight: 600 }}>{user.role || 'CUSTOMER'} PRIVILEGE</span>
                </div>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-hairline)', padding: '1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div className="editorial-tag" style={{ marginBottom: '0.75rem' }}>ARCHIVAL EXPEDITIONS</div>
                <h3 className="font-serif" style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>
                  Orders & Acquisitions
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.5 }}>
                  Review confirmed dispatches, historical invoices, and live tracking.
                </p>
              </div>

              <div style={{ marginTop: '1.5rem' }}>
                <Link to="/orders" className="btn-editorial-primary" style={{ width: '100%', gap: '6px' }} data-cursor="button">
                  <Package size={15} /> VIEW ORDER ARCHIVE
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Shop CTA */}
          <div style={{ borderTop: '1px solid var(--border-hairline)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link to="/shop" className="btn-editorial-text" data-cursor="button">
              ← DISCOVER NEW RELEASES
            </Link>
            <Link to="/cart" className="btn-editorial-text" data-cursor="button">
              VIEW CURRENT BAG →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Login / Register Tabs
  return (
    <div className="animate-fade-in" style={{ paddingTop: 'calc(var(--header-height) + 2.5rem)', paddingBottom: '7rem' }}>
      <div className="shopcx-container" style={{ maxWidth: '520px', margin: '0 auto' }}>
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div className="editorial-tag" style={{ color: 'var(--accent-gold)' }}>PATRON ACCESS</div>
          <h1 className="font-serif" style={{ fontSize: 'clamp(2.4rem, 5vw, 3.5rem)', marginTop: '4px' }}>
            {tab === 'login' ? 'Sign In to ShopCX' : 'Join the Maison'}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
            {tab === 'login'
              ? 'Access your curated order archive and synchronized luxury bag.'
              : 'Register your details to unlock bespoke access and orders.'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid var(--border-hairline)', marginBottom: '2rem' }}>
          <button
            onClick={() => setTab('login')}
            style={{
              padding: '0.85rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.82rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontWeight: tab === 'login' ? 700 : 400,
              color: tab === 'login' ? 'var(--text-primary)' : 'var(--text-muted)',
              borderBottom: tab === 'login' ? '2px solid var(--text-primary)' : 'none'
            }}
            data-cursor="button"
          >
            LOG IN
          </button>
          <button
            onClick={() => setTab('register')}
            style={{
              padding: '0.85rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.82rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontWeight: tab === 'register' ? 700 : 400,
              color: tab === 'register' ? 'var(--text-primary)' : 'var(--text-muted)',
              borderBottom: tab === 'register' ? '2px solid var(--text-primary)' : 'none'
            }}
            data-cursor="button"
          >
            CREATE ACCOUNT
          </button>
        </div>

        {/* LOGIN FORM */}
        {tab === 'login' && (
          <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Demo Quick Fill Buttons */}
            <div style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-hairline)', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <span className="editorial-tag" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <KeyRound size={12} /> INSTANT DEMO PROFILES (1-CLICK FILL):
              </span>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => handleQuickDemoFill('shashank@shopx.local', 'ShopX@123')}
                  style={{
                    padding: '4px 10px',
                    backgroundColor: '#ffffff',
                    border: '1px solid var(--border-hairline)',
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-mono)'
                  }}
                  data-cursor="button"
                >
                  Shashank (Customer)
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemoFill('admin@shopx.local', 'Admin@123')}
                  style={{
                    padding: '4px 10px',
                    backgroundColor: '#ffffff',
                    border: '1px solid var(--border-hairline)',
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-mono)'
                  }}
                  data-cursor="button"
                >
                  Administrator
                </button>
              </div>
            </div>

            <div>
              <label className="editorial-tag" style={{ display: 'block', marginBottom: '6px' }}>EMAIL ADDRESS</label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '0.9rem 1rem',
                  border: '1px solid var(--border-hairline)',
                  backgroundColor: '#ffffff',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.9rem'
                }}
              />
            </div>

            <div>
              <label className="editorial-tag" style={{ display: 'block', marginBottom: '6px' }}>PASSWORD</label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '0.9rem 1rem',
                  border: '1px solid var(--border-hairline)',
                  backgroundColor: '#ffffff',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.9rem'
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-editorial-primary"
              style={{ width: '100%', marginTop: '0.75rem', gap: '8px' }}
              data-cursor="button"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <span>SIGN IN TO MAISON</span>}
            </button>
          </form>
        )}

        {/* REGISTER FORM */}
        {tab === 'register' && (
          <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label className="editorial-tag" style={{ display: 'block', marginBottom: '6px' }}>FULL NAME</label>
              <input
                type="text"
                placeholder="e.g. Aurelius Vance"
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '0.9rem 1rem',
                  border: '1px solid var(--border-hairline)',
                  backgroundColor: '#ffffff',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.9rem'
                }}
              />
            </div>

            <div>
              <label className="editorial-tag" style={{ display: 'block', marginBottom: '6px' }}>EMAIL IDENTITY</label>
              <input
                type="email"
                placeholder="name@domain.com"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '0.9rem 1rem',
                  border: '1px solid var(--border-hairline)',
                  backgroundColor: '#ffffff',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.9rem'
                }}
              />
            </div>

            <div>
              <label className="editorial-tag" style={{ display: 'block', marginBottom: '6px' }}>CREATE PASSWORD</label>
              <input
                type="password"
                placeholder="Minimum 6 characters"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '0.9rem 1rem',
                  border: '1px solid var(--border-hairline)',
                  backgroundColor: '#ffffff',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.9rem'
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-editorial-primary"
              style={{ width: '100%', marginTop: '0.75rem', gap: '8px' }}
              data-cursor="button"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <span>REGISTER ACCOUNT</span>}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
