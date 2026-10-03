import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  ShieldCheck,
  Truck,
  CreditCard,
  ArrowRight,
  Lock,
  Sparkles,
  Loader2,
  AlertCircle,
  QrCode,
  Smartphone,
  Building2,
  Check,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  Copy,
  Clock
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { getProductImages } from '../utils/imageService';

const POPULAR_BANKS = [
  { id: 'HDFC', name: 'HDFC Bank', code: 'HDFC0001', logo: '🏛️' },
  { id: 'ICICI', name: 'ICICI Bank', code: 'ICIC0001', logo: '🏦' },
  { id: 'SBI', name: 'State Bank of India', code: 'SBIN0001', logo: '🏛️' },
  { id: 'AXIS', name: 'Axis Bank', code: 'UTIB0001', logo: '🏦' },
  { id: 'KOTAK', name: 'Kotak Mahindra', code: 'KKBK0001', logo: '🏛️' },
  { id: 'PNB', name: 'Punjab National Bank', code: 'PUNB0001', logo: '🏦' }
];

const ALL_BANKS = [
  'Bank of Baroda',
  'Canara Bank',
  'Union Bank of India',
  'IndusInd Bank',
  'IDFC FIRST Bank',
  'Yes Bank',
  'Federal Bank',
  'Bank of India',
  'Central Bank of India',
  'Indian Bank',
  'Standard Chartered Bank',
  'HSBC India',
  'RBL Bank',
  'South Indian Bank',
  'DBS Bank India'
];

export default function Checkout() {
  const { user, cartId } = useAuth();
  const { items, cartSubtotal, refreshCart } = useCart();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1: Info & Shipping, 2: Payment, 3: Confirmed
  const [submitting, setSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [paymentDetails, setPaymentDetails] = useState(null);

  // Payment method state
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi', 'netbanking', 'card'

  // UPI Specific State
  const [upiMode, setUpiMode] = useState('qr'); // 'qr' or 'vpa'
  const [upiId, setUpiId] = useState('shashank@okhdfcbank');
  const [upiVerified, setUpiVerified] = useState(true);
  const [upiVerifying, setUpiVerifying] = useState(false);
  const [collectRequested, setCollectRequested] = useState(false);
  const [qrTimer, setQrTimer] = useState(300); // 5 minutes timer

  // Net Banking Specific State
  const [selectedBank, setSelectedBank] = useState('HDFC');
  const [customBank, setCustomBank] = useState('');
  const [netBankingModalOpen, setNetBankingModalOpen] = useState(false);
  const [netBankingStep, setNetBankingStep] = useState('login'); // 'login', 'otp', 'processing'
  const [netBankingUserId, setNetBankingUserId] = useState('CX_PATRON_8901');
  const [netBankingPassword, setNetBankingPassword] = useState('••••••••');
  const [netBankingOtp, setNetBankingOtp] = useState('749201');

  // Card State
  const [cardData, setCardData] = useState({
    number: '4242 •••• •••• 4242',
    name: user ? user.name : 'Shashank',
    expiry: '12/28',
    cvc: '888'
  });

  // Client Form state
  const [formData, setFormData] = useState({
    name: user ? user.name : 'Shashank',
    email: user ? user.email : 'shashank@shopx.local',
    phone: '+91 98765 43210',
    address: '42 Heritage Boulevard, Diplomatic Enclave, Chanakyapuri',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '110021',
    shippingMethod: 'express'
  });

  // QR Timer Countdown
  useEffect(() => {
    let interval;
    if (step === 2 && paymentMethod === 'upi' && upiMode === 'qr' && qrTimer > 0) {
      interval = setInterval(() => {
        setQrTimer(prev => Math.max(0, prev - 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, paymentMethod, upiMode, qrTimer]);

  const shippingCost = formData.shippingMethod === 'express' ? 0 : 0;
  const grandTotal = cartSubtotal + shippingCost;

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // UPI VPA Verification Handler
  const handleVerifyVpa = () => {
    if (!upiId || !upiId.includes('@')) {
      addToast('Please enter a valid VPA handle (e.g. user@okhdfcbank)', 'error');
      return;
    }
    setUpiVerifying(true);
    setTimeout(() => {
      setUpiVerifying(false);
      setUpiVerified(true);
      addToast(`VPA "${upiId}" verified: Verified Patron Account`, 'success');
    }, 700);
  };

  // UPI Collect Request
  const handleSendCollectRequest = () => {
    if (!upiVerified) {
      addToast('Please verify your UPI ID first', 'error');
      return;
    }
    setCollectRequested(true);
    addToast(`Payment request of ₹${grandTotal.toLocaleString('en-IN')} sent to ${upiId}`, 'info');
  };

  // Final Order Execution with Backend Integration
  const executeOrderPlacement = async (paymentMeta) => {
    setSubmitting(true);
    try {
      const activeCartId = cartId || '1';
      const order = await Api.checkout.process(Number(activeCartId));
      setConfirmedOrder(order);
      setPaymentDetails(paymentMeta);

      // Fetch confirmed order items
      if (order && order.id) {
        try {
          const fetchedItems = await Api.orders.getItems(order.id);
          setOrderItems(Array.isArray(fetchedItems) ? fetchedItems : []);
        } catch (err) {
          console.warn('Order items lookup note:', err);
        }
      }

      // Confetti animation
      confetti({
        particleCount: 140,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#bfa175', '#000000', '#6b705c', '#eae8e1', '#d4af37']
      });

      await refreshCart();
      setStep(3);
      addToast(`Order #${order?.id || 'SCX-1024'} Confirmed & Settled!`, 'success');
    } catch (err) {
      console.error('Checkout failed:', err);
      addToast(err.message || 'Payment execution failed. Please verify live stock availability.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  // Standard checkout button submit
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (items.length === 0) {
      addToast('Your shopping bag is empty', 'error');
      return;
    }

    if (paymentMethod === 'netbanking') {
      // Open interactive NetBanking modal
      setNetBankingModalOpen(true);
      setNetBankingStep('login');
      return;
    }

    if (paymentMethod === 'upi') {
      const meta = {
        method: 'UPI Instant',
        vpa: upiMode === 'vpa' ? upiId : 'shopcx.maison@okhdfcbank',
        utr: `UPI-${Math.floor(100000000000 + Math.random() * 900000000000)}`,
        mode: upiMode === 'qr' ? 'Dynamic Bharat QR Scan & Pay' : 'VPA Collect'
      };
      await executeOrderPlacement(meta);
      return;
    }

    if (paymentMethod === 'card') {
      const meta = {
        method: 'Credit / Debit Card',
        cardMasked: cardData.number,
        txnId: `TXN-CARD-${Date.now().toString().slice(-8)}`,
        authCode: 'AUTH_APPROVED_256'
      };
      await executeOrderPlacement(meta);
    }
  };

  // NetBanking Modal Submission Flow
  const handleNetBankingLogin = (e) => {
    e.preventDefault();
    setNetBankingStep('otp');
    addToast('One-Time Password (OTP) dispatched to linked mobile', 'info');
  };

  const handleNetBankingOtpSubmit = async (e) => {
    e.preventDefault();
    setNetBankingStep('processing');
    setTimeout(async () => {
      setNetBankingModalOpen(false);
      const activeBankName = customBank || (POPULAR_BANKS.find(b => b.id === selectedBank)?.name || selectedBank);
      const meta = {
        method: `Net Banking (${activeBankName})`,
        bankRef: `NB-${selectedBank}-${Math.floor(10000000 + Math.random() * 90000000)}`,
        status: 'AUTHENTICATED_SETTLED',
        accountHolder: formData.name
      };
      await executeOrderPlacement(meta);
    }, 1200);
  };

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // STEP 3: ORDER CONFIRMED VIEW
  if (step === 3 && confirmedOrder) {
    return (
      <div className="animate-fade-in" style={{ paddingTop: 'calc(var(--header-height) + 3rem)', paddingBottom: '7rem' }}>
        <div className="shopcx-container" style={{ maxWidth: '820px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div
              style={{
                display: 'inline-flex',
                padding: '1.25rem',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '50%',
                marginBottom: '1.5rem'
              }}
            >
              <CheckCircle2 size={52} color="#bfa175" strokeWidth={1.5} />
            </div>
            <div className="editorial-tag" style={{ color: 'var(--accent-gold)' }}>
              ORDER #{confirmedOrder.id} SETTLED & CONFIRMED
            </div>
            <h1 className="font-serif" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.2rem)', marginTop: '6px' }}>
              Acquisition Confirmed
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginTop: '0.75rem', lineHeight: 1.6 }}>
              Your order has been authorized and confirmed against live inventory. A luxury dispatch itinerary has been transmitted to <strong>{formData.email}</strong>.
            </p>
          </div>

          {/* Receipt & Payment Verification Card */}
          <div
            style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-hairline)',
              padding: '2.5rem',
              marginBottom: '2.5rem',
              boxShadow: '0 15px 35px rgba(0,0,0,0.04)'
            }}
          >
            {/* Meta header */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '1.5rem',
                borderBottom: '1px solid var(--border-hairline)',
                paddingBottom: '1.5rem',
                marginBottom: '1.5rem'
              }}
            >
              <div>
                <div className="editorial-tag">ORDER REFERENCE</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', fontWeight: 600, marginTop: '4px' }}>
                  #SCX-{confirmedOrder.id}
                </div>
              </div>
              <div>
                <div className="editorial-tag">PAYMENT MODE</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 600, marginTop: '4px', color: 'var(--text-primary)' }}>
                  {paymentDetails?.method || 'UPI Instant'}
                </div>
              </div>
              <div>
                <div className="editorial-tag">SETTLED AMOUNT</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.15rem', fontWeight: 700, marginTop: '4px' }}>
                  ₹{Number(confirmedOrder.totalAmount || grandTotal).toLocaleString('en-IN')}
                </div>
              </div>
            </div>

            {/* Payment Transaction Details Banner */}
            <div
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid var(--border-hairline)',
                padding: '1.25rem 1.5rem',
                marginBottom: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="editorial-tag" style={{ color: 'var(--accent-olive)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <CheckCircle2 size={13} /> DIGITAL SETTLEMENT COMPLETED
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  {new Date().toLocaleTimeString()} IST
                </span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', fontSize: '0.85rem', marginTop: '4px' }}>
                {paymentDetails?.utr && (
                  <div>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', display: 'block' }}>UTR / REF NUMBER</span>
                    <strong style={{ fontFamily: 'var(--font-mono)' }}>{paymentDetails.utr}</strong>
                  </div>
                )}
                {paymentDetails?.bankRef && (
                  <div>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', display: 'block' }}>GATEWAY REF</span>
                    <strong style={{ fontFamily: 'var(--font-mono)' }}>{paymentDetails.bankRef}</strong>
                  </div>
                )}
                {paymentDetails?.vpa && (
                  <div>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', display: 'block' }}>PAYER VPA</span>
                    <strong>{paymentDetails.vpa}</strong>
                  </div>
                )}
                {paymentDetails?.txnId && (
                  <div>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', display: 'block' }}>TRANSACTION ID</span>
                    <strong style={{ fontFamily: 'var(--font-mono)' }}>{paymentDetails.txnId}</strong>
                  </div>
                )}
              </div>
            </div>

            {/* Purchased Items List */}
            <div className="editorial-tag" style={{ marginBottom: '1rem' }}>VERIFIED OBJECTS</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.75rem' }}>
              {orderItems.length > 0 ? (
                orderItems.map((oi) => (
                  <div key={oi.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.92rem' }}>
                    <span>
                      {oi.product?.name || 'Curated Object'} <span style={{ color: 'var(--text-muted)' }}>× {oi.quantity}</span>
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                      ₹{Number(oi.price * oi.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))
              ) : (
                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  Objects allocated and assigned to expedited order #{confirmedOrder.id}.
                </div>
              )}
            </div>

            {/* Shipping details */}
            <div style={{ borderTop: '1px solid var(--border-hairline)', paddingTop: '1.25rem', fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              <strong>Expedition Destination:</strong> {formData.name}, {formData.address}, {formData.city}, {formData.state} - {formData.pincode}
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
            <Link to="/orders" className="btn-editorial-primary" data-cursor="button">
              VIEW IN ORDER ARCHIVE <ArrowRight size={15} style={{ marginLeft: '6px' }} />
            </Link>
            <Link to="/shop" className="btn-editorial-secondary" data-cursor="button">
              RETURN TO CATALOG
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in" style={{ paddingTop: 'calc(var(--header-height) + 2rem)', paddingBottom: '7rem' }}>
      <div className="shopcx-container">
        {/* Header */}
        <div style={{ borderBottom: '1px solid var(--border-hairline)', paddingBottom: '1.5rem', marginBottom: '3rem' }}>
          <div className="editorial-tag">SECURE CHECKOUT CONCIERGE</div>
          <h1 className="font-serif" style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', marginTop: '4px' }}>
            Finalize Your Acquisition
          </h1>
        </div>

        {/* Step Indicator */}
        <div style={{ display: 'flex', gap: '2rem', marginBottom: '2.5rem', borderBottom: '1px solid var(--border-hairline)', paddingBottom: '1rem' }}>
          <button
            onClick={() => setStep(1)}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.82rem',
              fontWeight: step === 1 ? 700 : 400,
              color: step === 1 ? 'var(--text-primary)' : 'var(--text-muted)',
              borderBottom: step === 1 ? '2px solid var(--text-primary)' : 'none',
              paddingBottom: '0.5rem'
            }}
            data-cursor="button"
          >
            01 / SHIPPING & CLIENT
          </button>
          <button
            onClick={() => setStep(2)}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.82rem',
              fontWeight: step === 2 ? 700 : 400,
              color: step === 2 ? 'var(--text-primary)' : 'var(--text-muted)',
              borderBottom: step === 2 ? '2px solid var(--text-primary)' : 'none',
              paddingBottom: '0.5rem'
            }}
            data-cursor="button"
          >
            02 / PAYMENT SETTLEMENT
          </button>
        </div>

        <form onSubmit={handlePlaceOrder}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 'clamp(2.5rem, 5vw, 5rem)',
              alignItems: 'start'
            }}
          >
            {/* LEFT COLUMN: Steps */}
            <div>
              {/* STEP 1: CLIENT & ADDRESS */}
              {step === 1 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
                  <h2 className="font-serif" style={{ fontSize: '1.6rem' }}>Client & Delivery Dossier</h2>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label className="editorial-tag" style={{ display: 'block', marginBottom: '6px' }}>FULL NAME</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        style={{
                          width: '100%',
                          padding: '0.85rem 1rem',
                          border: '1px solid var(--border-hairline)',
                          backgroundColor: '#ffffff',
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.88rem'
                        }}
                      />
                    </div>
                    <div>
                      <label className="editorial-tag" style={{ display: 'block', marginBottom: '6px' }}>EMAIL DISPATCH</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={{
                          width: '100%',
                          padding: '0.85rem 1rem',
                          border: '1px solid var(--border-hairline)',
                          backgroundColor: '#ffffff',
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.88rem'
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="editorial-tag" style={{ display: 'block', marginBottom: '6px' }}>STREET ADDRESS</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        border: '1px solid var(--border-hairline)',
                        backgroundColor: '#ffffff',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.88rem'
                      }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label className="editorial-tag" style={{ display: 'block', marginBottom: '6px' }}>CITY</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        style={{
                          width: '100%',
                          padding: '0.85rem 1rem',
                          border: '1px solid var(--border-hairline)',
                          backgroundColor: '#ffffff',
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.88rem'
                        }}
                      />
                    </div>
                    <div>
                      <label className="editorial-tag" style={{ display: 'block', marginBottom: '6px' }}>STATE</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                        style={{
                          width: '100%',
                          padding: '0.85rem 1rem',
                          border: '1px solid var(--border-hairline)',
                          backgroundColor: '#ffffff',
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.88rem'
                        }}
                      />
                    </div>
                    <div>
                      <label className="editorial-tag" style={{ display: 'block', marginBottom: '6px' }}>PINCODE</label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        required
                        style={{
                          width: '100%',
                          padding: '0.85rem 1rem',
                          border: '1px solid var(--border-hairline)',
                          backgroundColor: '#ffffff',
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.88rem'
                        }}
                      />
                    </div>
                  </div>

                  {/* Delivery Tier */}
                  <div style={{ marginTop: '0.5rem' }}>
                    <label className="editorial-tag" style={{ display: 'block', marginBottom: '0.75rem' }}>EXPEDITION TIER</label>
                    <div
                      style={{
                        padding: '1.1rem 1.25rem',
                        border: '1px solid var(--border-strong)',
                        backgroundColor: 'var(--bg-secondary)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Truck size={18} color="var(--accent-gold)" />
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>White-Glove Insured Delivery</div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Estimated arrival in 2–3 business days with signature receipt</div>
                        </div>
                      </div>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent-olive)', fontWeight: 600 }}>COMPLIMENTARY</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="btn-editorial-primary"
                    style={{ alignSelf: 'flex-start', marginTop: '1rem' }}
                    data-cursor="button"
                  >
                    CONTINUE TO PAYMENT <ArrowRight size={15} style={{ marginLeft: '6px' }} />
                  </button>
                </div>
              )}

              {/* STEP 2: PAYMENT METHODS */}
              {step === 2 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h2 className="font-serif" style={{ fontSize: '1.6rem' }}>Select Settlement Mode</h2>
                    <span className="editorial-tag" style={{ color: 'var(--accent-gold)' }}>
                      256-BIT ENCRYPTED
                    </span>
                  </div>

                  {/* Payment Method Selector Tabs */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                    {[
                      { id: 'upi', label: 'UPI Instant', icon: <Smartphone size={16} /> },
                      { id: 'netbanking', label: 'Net Banking', icon: <Building2 size={16} /> },
                      { id: 'card', label: 'Cards', icon: <CreditCard size={16} /> }
                    ].map((pm) => (
                      <button
                        key={pm.id}
                        type="button"
                        onClick={() => setPaymentMethod(pm.id)}
                        style={{
                          padding: '1.1rem 0.75rem',
                          border: paymentMethod === pm.id ? '2px solid var(--text-primary)' : '1px solid var(--border-hairline)',
                          backgroundColor: paymentMethod === pm.id ? 'var(--text-primary)' : 'var(--bg-secondary)',
                          color: paymentMethod === pm.id ? '#ffffff' : 'var(--text-primary)',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '6px',
                          textTransform: 'uppercase',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.78rem',
                          letterSpacing: '0.08em',
                          transition: 'all 0.2s ease'
                        }}
                        data-cursor="button"
                      >
                        {pm.icon}
                        <span>{pm.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* 1. UPI PAYMENT CONTAINER */}
                  {paymentMethod === 'upi' && (
                    <div
                      style={{
                        backgroundColor: 'var(--bg-secondary)',
                        border: '1px solid var(--border-hairline)',
                        padding: '1.75rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.5rem'
                      }}
                    >
                      {/* Sub-modes: QR Code vs UPI ID */}
                      <div style={{ display: 'flex', borderBottom: '1px solid var(--border-hairline)', paddingBottom: '0.75rem', gap: '1.5rem' }}>
                        <button
                          type="button"
                          onClick={() => setUpiMode('qr')}
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.8rem',
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            fontWeight: upiMode === 'qr' ? 700 : 400,
                            color: upiMode === 'qr' ? 'var(--text-primary)' : 'var(--text-muted)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                          }}
                          data-cursor="button"
                        >
                          <QrCode size={16} /> SCAN BHARAT UPI QR
                        </button>
                        <button
                          type="button"
                          onClick={() => setUpiMode('vpa')}
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.8rem',
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            fontWeight: upiMode === 'vpa' ? 700 : 400,
                            color: upiMode === 'vpa' ? 'var(--text-primary)' : 'var(--text-muted)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                          }}
                          data-cursor="button"
                        >
                          <Smartphone size={16} /> ENTER UPI ID / VPA
                        </button>
                      </div>

                      {/* UPI QR CODE MODE */}
                      {upiMode === 'qr' && (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1.25rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Clock size={15} color="var(--accent-gold)" />
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
                              QR Code expires in: <strong style={{ color: qrTimer < 60 ? '#d32f2f' : 'inherit' }}>{formatTimer(qrTimer)}</strong>
                            </span>
                          </div>

                          {/* Stylized Vector QR Canvas / SVG */}
                          <div
                            style={{
                              padding: '1.25rem',
                              backgroundColor: '#ffffff',
                              border: '2px solid var(--text-primary)',
                              boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
                              display: 'inline-flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              position: 'relative'
                            }}
                          >
                            <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                              {/* QR Finder 1 Top Left */}
                              <rect x="10" y="10" width="50" height="50" stroke="#000" strokeWidth="8" />
                              <rect x="24" y="24" width="22" height="22" fill="#000" />
                              {/* QR Finder 2 Top Right */}
                              <rect x="140" y="10" width="50" height="50" stroke="#000" strokeWidth="8" />
                              <rect x="154" y="24" width="22" height="22" fill="#000" />
                              {/* QR Finder 3 Bottom Left */}
                              <rect x="10" y="140" width="50" height="50" stroke="#000" strokeWidth="8" />
                              <rect x="24" y="154" width="22" height="22" fill="#000" />
                              {/* Realistic QR Pattern Grid Blocks */}
                              <rect x="75" y="15" width="12" height="12" fill="#000" />
                              <rect x="95" y="15" width="12" height="12" fill="#000" />
                              <rect x="115" y="15" width="12" height="12" fill="#000" />
                              <rect x="75" y="35" width="12" height="24" fill="#000" />
                              <rect x="105" y="35" width="20" height="12" fill="#000" />
                              <rect x="15" y="75" width="24" height="12" fill="#000" />
                              <rect x="45" y="85" width="12" height="24" fill="#000" />
                              <rect x="70" y="70" width="60" height="60" fill="#000" rx="4" />
                              {/* Center Brand Monogram */}
                              <rect x="76" y="76" width="48" height="48" fill="#fff" />
                              <text x="100" y="105" textAnchor="middle" fontFamily="sans-serif" fontSize="13" fontWeight="bold" fill="#000">SHOPCX</text>
                              <rect x="140" y="75" width="16" height="16" fill="#000" />
                              <rect x="165" y="85" width="20" height="12" fill="#000" />
                              <rect x="140" y="110" width="45" height="12" fill="#000" />
                              <rect x="75" y="140" width="16" height="30" fill="#000" />
                              <rect x="100" y="150" width="30" height="12" fill="#000" />
                              <rect x="140" y="140" width="20" height="20" fill="#000" />
                              <rect x="170" y="150" width="16" height="35" fill="#000" />
                              <rect x="140" y="170" width="20" height="15" fill="#000" />
                            </svg>
                            <div style={{ marginTop: '8px', fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                              shopcx.maison@okhdfcbank
                            </div>
                          </div>

                          <div style={{ fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
                            Scan with any UPI App: <strong>Google Pay, PhonePe, Paytm, BHIM, Cred</strong>
                          </div>

                          {/* Supported UPI Apps Row */}
                          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
                            {['Google Pay', 'PhonePe', 'Paytm', 'BHIM', 'CRED'].map(app => (
                              <span
                                key={app}
                                style={{
                                  padding: '4px 10px',
                                  backgroundColor: '#ffffff',
                                  border: '1px solid var(--border-hairline)',
                                  fontSize: '0.75rem',
                                  fontFamily: 'var(--font-mono)'
                                }}
                              >
                                {app}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* UPI VPA MODE */}
                      {upiMode === 'vpa' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                          <div>
                            <label className="editorial-tag" style={{ display: 'block', marginBottom: '6px' }}>VPA / UPI ADDRESS</label>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <input
                                type="text"
                                value={upiId}
                                onChange={(e) => {
                                  setUpiId(e.target.value);
                                  setUpiVerified(false);
                                  setCollectRequested(false);
                                }}
                                placeholder="username@upi or mobile@paytm"
                                style={{
                                  flex: 1,
                                  padding: '0.85rem 1rem',
                                  border: '1px solid var(--border-hairline)',
                                  backgroundColor: '#ffffff',
                                  fontFamily: 'var(--font-mono)',
                                  fontSize: '0.9rem'
                                }}
                              />
                              <button
                                type="button"
                                onClick={handleVerifyVpa}
                                className="btn-editorial-secondary"
                                style={{ padding: '0.85rem 1.25rem', fontSize: '0.76rem' }}
                                data-cursor="button"
                              >
                                {upiVerifying ? <Loader2 size={14} className="animate-spin" /> : <span>VERIFY</span>}
                              </button>
                            </div>
                          </div>

                          {/* Quick Suffixes */}
                          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                            {['@okhdfcbank', '@okaxis', '@oksbi', '@paytm', '@ybl'].map(suffix => (
                              <button
                                key={suffix}
                                type="button"
                                onClick={() => {
                                  const base = upiId.includes('@') ? upiId.split('@')[0] : upiId;
                                  setUpiId(`${base}${suffix}`);
                                  setUpiVerified(true);
                                }}
                                style={{
                                  padding: '3px 8px',
                                  backgroundColor: '#ffffff',
                                  border: '1px solid var(--border-hairline)',
                                  fontSize: '0.72rem',
                                  fontFamily: 'var(--font-mono)'
                                }}
                                data-cursor="button"
                              >
                                {suffix}
                              </button>
                            ))}
                          </div>

                          {upiVerified && (
                            <div style={{ backgroundColor: '#ffffff', padding: '0.85rem 1rem', border: '1px solid var(--border-hairline)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.84rem' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-olive)', fontWeight: 600 }}>
                                <CheckCircle2 size={16} /> Verified: Shashank (HDFC Bank)
                              </div>
                              {!collectRequested ? (
                                <button
                                  type="button"
                                  onClick={handleSendCollectRequest}
                                  className="btn-editorial-text"
                                  style={{ fontSize: '0.76rem' }}
                                  data-cursor="button"
                                >
                                  SEND COLLECT REQUEST →
                                </button>
                              ) : (
                                <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-gold)', fontSize: '0.76rem' }}>
                                  ● PENDING APPROVAL IN UPI APP
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* 2. NET BANKING PAYMENT CONTAINER */}
                  {paymentMethod === 'netbanking' && (
                    <div
                      style={{
                        backgroundColor: 'var(--bg-secondary)',
                        border: '1px solid var(--border-hairline)',
                        padding: '1.75rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.5rem'
                      }}
                    >
                      <div className="editorial-tag">POPULAR FINANCIAL INSTITUTIONS</div>

                      {/* Popular Banks Grid */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.75rem' }}>
                        {POPULAR_BANKS.map((b) => (
                          <button
                            key={b.id}
                            type="button"
                            onClick={() => {
                              setSelectedBank(b.id);
                              setCustomBank('');
                            }}
                            style={{
                              padding: '1rem 0.75rem',
                              border: selectedBank === b.id && !customBank ? '1.5px solid var(--text-primary)' : '1px solid var(--border-hairline)',
                              backgroundColor: selectedBank === b.id && !customBank ? 'var(--text-primary)' : '#ffffff',
                              color: selectedBank === b.id && !customBank ? '#ffffff' : 'var(--text-primary)',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              gap: '6px',
                              transition: 'all 0.2s ease'
                            }}
                            data-cursor="button"
                          >
                            <span style={{ fontSize: '1.4rem' }}>{b.logo}</span>
                            <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>{b.name}</span>
                          </button>
                        ))}
                      </div>

                      {/* All Other Banks Dropdown */}
                      <div>
                        <label className="editorial-tag" style={{ display: 'block', marginBottom: '6px' }}>OR SELECT OTHER SCHEDULED BANK</label>
                        <select
                          value={customBank}
                          onChange={(e) => {
                            setCustomBank(e.target.value);
                            if (e.target.value) setSelectedBank('');
                          }}
                          style={{
                            width: '100%',
                            padding: '0.85rem 1rem',
                            border: '1px solid var(--border-hairline)',
                            backgroundColor: '#ffffff',
                            fontFamily: 'var(--font-sans)',
                            fontSize: '0.88rem'
                          }}
                          data-cursor="button"
                        >
                          <option value="">-- Choose from 30+ other Indian banks --</option>
                          {ALL_BANKS.map(bank => (
                            <option key={bank} value={bank}>{bank}</option>
                          ))}
                        </select>
                      </div>

                      <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <ShieldCheck size={16} color="var(--accent-gold)" /> You will be connected to the bank's 256-bit encrypted authentication gateway.
                      </div>
                    </div>
                  )}

                  {/* 3. CARD PAYMENT CONTAINER */}
                  {paymentMethod === 'card' && (
                    <div
                      style={{
                        backgroundColor: 'var(--bg-secondary)',
                        border: '1px solid var(--border-hairline)',
                        padding: '1.75rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.25rem'
                      }}
                    >
                      <div>
                        <label className="editorial-tag" style={{ display: 'block', marginBottom: '6px' }}>CARD NUMBER</label>
                        <input
                          type="text"
                          value={cardData.number}
                          onChange={(e) => setCardData(prev => ({ ...prev, number: e.target.value }))}
                          placeholder="4111 2222 3333 4444"
                          style={{
                            width: '100%',
                            padding: '0.85rem 1rem',
                            border: '1px solid var(--border-hairline)',
                            backgroundColor: '#ffffff',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.9rem'
                          }}
                        />
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                          <label className="editorial-tag" style={{ display: 'block', marginBottom: '6px' }}>EXPIRY (MM/YY)</label>
                          <input
                            type="text"
                            value={cardData.expiry}
                            onChange={(e) => setCardData(prev => ({ ...prev, expiry: e.target.value }))}
                            placeholder="MM/YY"
                            style={{
                              width: '100%',
                              padding: '0.85rem 1rem',
                              border: '1px solid var(--border-hairline)',
                              backgroundColor: '#ffffff',
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.9rem'
                            }}
                          />
                        </div>
                        <div>
                          <label className="editorial-tag" style={{ display: 'block', marginBottom: '6px' }}>CVC SECURITY</label>
                          <input
                            type="password"
                            maxLength={4}
                            value={cardData.cvc}
                            onChange={(e) => setCardData(prev => ({ ...prev, cvc: e.target.value }))}
                            placeholder="•••"
                            style={{
                              width: '100%',
                              padding: '0.85rem 1rem',
                              border: '1px solid var(--border-hairline)',
                              backgroundColor: '#ffffff',
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.9rem'
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2 Bottom Actions */}
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="btn-editorial-secondary"
                      data-cursor="button"
                    >
                      ← EDIT SHIPPING
                    </button>

                    <button
                      type="submit"
                      disabled={submitting || items.length === 0}
                      className="btn-editorial-primary"
                      style={{ flex: 1, gap: '8px' }}
                      data-cursor="button"
                    >
                      {submitting ? (
                        <>
                          <Loader2 size={16} className="animate-spin" /> COMMITTING TRANSACTION...
                        </>
                      ) : paymentMethod === 'netbanking' ? (
                        <>
                          <ExternalLink size={15} /> PROCEED TO BANK PORTAL (₹{grandTotal.toLocaleString('en-IN')})
                        </>
                      ) : paymentMethod === 'upi' ? (
                        <>
                          <Lock size={15} /> AUTHORIZE UPI PAYMENT (₹{grandTotal.toLocaleString('en-IN')})
                        </>
                      ) : (
                        <>
                          <Lock size={15} /> CONFIRM ORDER (₹{grandTotal.toLocaleString('en-IN')})
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: Order Review Summary */}
            <div
              style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-hairline)',
                padding: '2rem',
                position: 'sticky',
                top: 'calc(var(--header-height) + 2rem)'
              }}
            >
              <div className="editorial-tag" style={{ marginBottom: '0.5rem' }}>BAG REVIEW</div>
              <h3 className="font-serif" style={{ fontSize: '1.6rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-hairline)', paddingBottom: '0.75rem' }}>
                Acquisition Summary ({items.length})
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '280px', overflowY: 'auto', marginBottom: '1.5rem', paddingRight: '4px' }}>
                {items.map((item) => {
                  const product = item.product || {};
                  const imgs = getProductImages(product);
                  return (
                    <div key={item.id} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <img
                        src={imgs.primary}
                        alt={product.name}
                        style={{ width: '50px', height: '62px', objectFit: 'cover', backgroundColor: '#eceae3' }}
                      />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '0.86rem', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {product.name}
                        </div>
                        <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                          Qty: {item.quantity || 1}
                        </div>
                      </div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.88rem', fontWeight: 600 }}>
                        ₹{((product.price || 0) * (item.quantity || 1)).toLocaleString('en-IN')}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div style={{ borderTop: '1px solid var(--border-hairline)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.88rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Subtotal</span>
                  <span style={{ fontFamily: 'var(--font-mono)' }}>₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>White-Glove Delivery</span>
                  <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-olive)' }}>COMPLIMENTARY</span>
                </div>
                <div style={{ borderTop: '1px solid var(--border-hairline)', paddingTop: '0.75rem', marginTop: '0.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontWeight: 600, fontSize: '1rem' }}>Total Settlement</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.45rem', fontWeight: 700 }}>
                    ₹{grandTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* INTERACTIVE NETBANKING GATEWAY MODAL */}
      {netBankingModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(10, 10, 10, 0.75)',
            backdropFilter: 'blur(10px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            animation: 'fadeIn 0.25s ease'
          }}
          onClick={() => setNetBankingModalOpen(false)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '520px',
              backgroundColor: '#ffffff',
              border: '1px solid var(--border-hairline)',
              padding: '2.5rem',
              boxShadow: '0 25px 60px rgba(0,0,0,0.25)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Bank Header */}
            <div style={{ borderBottom: '1px solid var(--border-hairline)', paddingBottom: '1.25rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span className="editorial-tag" style={{ color: 'var(--accent-olive)' }}>
                  ● 256-BIT ENCRYPTED BANKING GATEWAY
                </span>
                <h3 className="font-serif" style={{ fontSize: '1.6rem', marginTop: '4px' }}>
                  {customBank || (POPULAR_BANKS.find(b => b.id === selectedBank)?.name || selectedBank)}
                </h3>
              </div>
              <span style={{ fontSize: '2rem' }}>🏛️</span>
            </div>

            {/* Total Badge */}
            <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '0.85rem 1.25rem', border: '1px solid var(--border-hairline)', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Merchant: <strong>SHOPCX MAISON</strong></span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', fontWeight: 700 }}>₹{grandTotal.toLocaleString('en-IN')}</span>
            </div>

            {/* NetBanking Step 1: Login */}
            {netBankingStep === 'login' && (
              <form onSubmit={handleNetBankingLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label className="editorial-tag" style={{ display: 'block', marginBottom: '6px' }}>CUSTOMER / USER ID</label>
                  <input
                    type="text"
                    value={netBankingUserId}
                    onChange={(e) => setNetBankingUserId(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      border: '1px solid var(--border-hairline)',
                      backgroundColor: '#ffffff',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.9rem'
                    }}
                  />
                </div>

                <div>
                  <label className="editorial-tag" style={{ display: 'block', marginBottom: '6px' }}>IPIN / INTERNET BANKING PASSWORD</label>
                  <input
                    type="password"
                    value={netBankingPassword}
                    onChange={(e) => setNetBankingPassword(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      border: '1px solid var(--border-hairline)',
                      backgroundColor: '#ffffff',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.9rem'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                  <button
                    type="button"
                    onClick={() => setNetBankingModalOpen(false)}
                    className="btn-editorial-secondary"
                    style={{ padding: '0.85rem' }}
                    data-cursor="button"
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    className="btn-editorial-primary"
                    style={{ flex: 1 }}
                    data-cursor="button"
                  >
                    CONTINUE TO OTP VERIFICATION →
                  </button>
                </div>
              </form>
            )}

            {/* NetBanking Step 2: OTP */}
            {netBankingStep === 'otp' && (
              <form onSubmit={handleNetBankingOtpSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label className="editorial-tag" style={{ display: 'block', marginBottom: '6px' }}>ENTER ONE-TIME PASSWORD (OTP)</label>
                  <input
                    type="text"
                    maxLength={6}
                    value={netBankingOtp}
                    onChange={(e) => setNetBankingOtp(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      border: '1px solid var(--border-hairline)',
                      backgroundColor: '#ffffff',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '1.2rem',
                      letterSpacing: '0.3em',
                      textAlign: 'center'
                    }}
                  />
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginTop: '4px' }}>
                    Demo OTP `749201` automatically filled for instant verification.
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                  <button
                    type="button"
                    onClick={() => setNetBankingStep('login')}
                    className="btn-editorial-secondary"
                    style={{ padding: '0.85rem' }}
                    data-cursor="button"
                  >
                    BACK
                  </button>
                  <button
                    type="submit"
                    className="btn-editorial-primary"
                    style={{ flex: 1, gap: '6px' }}
                    data-cursor="button"
                  >
                    <Check size={16} /> AUTHORIZE & PAY ₹{grandTotal.toLocaleString('en-IN')}
                  </button>
                </div>
              </form>
            )}

            {/* NetBanking Step 3: Processing */}
            {netBankingStep === 'processing' && (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <Loader2 size={36} className="animate-spin" style={{ color: 'var(--text-primary)', margin: '0 auto 1rem' }} />
                <h4 className="font-serif" style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>
                  Securing Transaction...
                </h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  Communicating with bank authorization gateway. Do not refresh.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
