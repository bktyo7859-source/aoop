import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, ArrowRight, X, Loader2, CheckCircle, Clock, Truck, ShieldCheck } from 'lucide-react';
import { Api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { getProductImages } from '../utils/imageService';

export default function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [loadingItems, setLoadingItems] = useState(false);

  useEffect(() => {
    async function loadOrders() {
      try {
        setLoading(true);
        const allOrders = await Api.orders.getAll();
        let list = Array.isArray(allOrders) ? allOrders : [];

        // If user logged in, filter orders by user customerId if available, or show all
        if (user && user.customerId) {
          const userOrders = list.filter(o => o.customer && o.customer.id === user.customerId);
          if (userOrders.length > 0) {
            list = userOrders;
          }
        }

        // Sort latest first
        list.sort((a, b) => b.id - a.id);
        setOrders(list);
      } catch (err) {
        console.error('Failed to load orders:', err);
      } finally {
        setLoading(false);
      }
    }

    loadOrders();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [user]);

  const handleOpenOrderDetails = async (order) => {
    setSelectedOrder(order);
    setLoadingItems(true);
    try {
      const items = await Api.orders.getItems(order.id);
      setOrderItems(Array.isArray(items) ? items : []);
    } catch (err) {
      console.error('Failed to fetch order items:', err);
      setOrderItems([]);
    } finally {
      setLoadingItems(false);
    }
  };

  return (
    <div className="animate-fade-in" style={{ paddingTop: 'calc(var(--header-height) + 2.5rem)', paddingBottom: '7rem' }}>
      <div className="shopcx-container">
        {/* Header */}
        <div style={{ borderBottom: '1px solid var(--border-hairline)', paddingBottom: '1.5rem', marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div className="editorial-tag">PATRON LOG</div>
            <h1 className="font-serif" style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', marginTop: '4px' }}>
              Historical Acquisitions
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '0.5rem' }}>
              Chronological ledger of orders dispatched from ShopCX fulfillment centers.
            </p>
          </div>

          <Link to="/shop" className="btn-editorial-text" data-cursor="button">
            DISCOVER MORE OBJECTS <ArrowRight size={14} />
          </Link>
        </div>

        {/* Orders Table */}
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
            <div style={{ textAlign: 'center' }}>
              <Loader2 size={36} className="animate-spin" style={{ color: 'var(--text-primary)', margin: '0 auto 1rem' }} />
              <div className="editorial-tag">LOADING ORDER ARCHIVE...</div>
            </div>
          </div>
        ) : orders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem 1rem', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-hairline)' }}>
            <div style={{ display: 'inline-flex', padding: '1.25rem', backgroundColor: '#ffffff', marginBottom: '1.25rem' }}>
              <Package size={36} strokeWidth={1.25} color="var(--text-muted)" />
            </div>
            <h3 className="font-serif" style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>
              No recorded orders found
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.75rem' }}>
              You have not placed any orders yet with your active session profile.
            </p>
            <Link to="/shop" className="btn-editorial-primary" data-cursor="button">
              EXPLORE CATALOG
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {orders.slice(0, 20).map((order) => {
              const status = order.status || 'CONFIRMED';
              return (
                <div
                  key={order.id}
                  onClick={() => handleOpenOrderDetails(order)}
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-hairline)',
                    padding: '1.5rem 2rem',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                    gap: '1.5rem',
                    alignItems: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--text-primary)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.04)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-hairline)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  data-cursor="view"
                >
                  <div>
                    <div className="editorial-tag">REFERENCE</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', fontWeight: 600, marginTop: '2px' }}>
                      #SCX-{order.id}
                    </div>
                  </div>

                  <div>
                    <div className="editorial-tag">PATRON</div>
                    <div style={{ fontSize: '0.92rem', marginTop: '2px', color: 'var(--text-primary)' }}>
                      {order.customer?.name || (user ? user.name : 'Shashank')}
                    </div>
                  </div>

                  <div>
                    <div className="editorial-tag">STATUS</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.86rem', marginTop: '2px', color: status === 'CONFIRMED' ? 'var(--accent-olive)' : 'var(--text-primary)', fontWeight: 600 }}>
                      <CheckCircle size={14} /> {status}
                    </div>
                  </div>

                  <div>
                    <div className="editorial-tag">TOTAL VALUE</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.05rem', fontWeight: 600, marginTop: '2px' }}>
                      ₹{Number(order.totalAmount || 0).toLocaleString('en-IN')}
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <span className="btn-editorial-text" style={{ fontSize: '0.78rem' }}>
                      INSPECT DOSSIER →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ORDER DETAILS MODAL */}
        {selectedOrder && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(10, 10, 10, 0.7)',
              backdropFilter: 'blur(8px)',
              zIndex: 9990,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem',
              animation: 'fadeIn 0.25s ease'
            }}
            onClick={() => setSelectedOrder(null)}
          >
            <div
              style={{
                width: '100%',
                maxWidth: '680px',
                backgroundColor: '#ffffff',
                border: '1px solid var(--border-hairline)',
                padding: '2.5rem',
                maxHeight: '90vh',
                overflowY: 'auto',
                boxShadow: '0 25px 60px rgba(0,0,0,0.2)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border-hairline)', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
                <div>
                  <div className="editorial-tag">INVOICE & PROVENANCE</div>
                  <h2 className="font-serif" style={{ fontSize: '2rem', marginTop: '2px' }}>
                    Order #SCX-{selectedOrder.id}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  style={{ padding: '6px', color: 'var(--text-primary)' }}
                  data-cursor="button"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Order Meta Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', backgroundColor: 'var(--bg-secondary)', padding: '1.25rem', marginBottom: '1.5rem', fontSize: '0.86rem' }}>
                <div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.74rem', display: 'block' }}>RECIPIENT</span>
                  <strong>{selectedOrder.customer?.name || (user ? user.name : 'Shashank')}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.74rem', display: 'block' }}>EMAIL</span>
                  <span>{selectedOrder.customer?.email || (user ? user.email : 'shashank@shopx.local')}</span>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.74rem', display: 'block' }}>STATUS</span>
                  <span style={{ color: 'var(--accent-olive)', fontWeight: 600 }}>{selectedOrder.status || 'CONFIRMED'}</span>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.74rem', display: 'block' }}>GRAND TOTAL</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>₹{Number(selectedOrder.totalAmount || 0).toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Order Items */}
              <div className="editorial-tag" style={{ marginBottom: '1rem' }}>ENCLOSED OBJECTS</div>
              {loadingItems ? (
                <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                  <Loader2 size={24} className="animate-spin" style={{ color: 'var(--text-primary)', margin: '0 auto' }} />
                </div>
              ) : orderItems.length === 0 ? (
                <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', padding: '1rem 0' }}>
                  Items successfully archived with fulfillment serials.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                  {orderItems.map((item) => (
                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-hairline)', paddingBottom: '0.75rem', fontSize: '0.9rem' }}>
                      <div>
                        <div style={{ fontWeight: 500 }}>{item.product?.name || 'Curated Object'}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Quantity: {item.quantity}</div>
                      </div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                        ₹{Number((item.price || 0) * (item.quantity || 1)).toLocaleString('en-IN')}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid var(--border-hairline)', paddingTop: '1.25rem' }}>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="btn-editorial-primary"
                  data-cursor="button"
                >
                  CLOSE DOSSIER
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
