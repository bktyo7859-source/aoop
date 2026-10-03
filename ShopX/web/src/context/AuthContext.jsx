import React, { createContext, useContext, useState, useEffect } from 'react';
import { Api } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('shopcx_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [cartId, setCartId] = useState(() => {
    try {
      return localStorage.getItem('shopcx_cart_id') || null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(false);

  // Sync user & cart
  useEffect(() => {
    if (user) {
      localStorage.setItem('shopcx_user', JSON.stringify(user));
      // Ensure user cart is resolved
      resolveUserCart(user.customerId);
    } else {
      localStorage.removeItem('shopcx_user');
    }
  }, [user]);

  async function resolveUserCart(customerId) {
    if (!customerId) return;
    try {
      let cart = await Api.cart.getByCustomerId(customerId);
      if (!cart || !cart.id) {
        cart = await Api.cart.createCart(customerId);
      }
      if (cart && cart.id) {
        setCartId(String(cart.id));
        localStorage.setItem('shopcx_cart_id', String(cart.id));
      }
    } catch (err) {
      console.error('Failed to resolve customer cart:', err);
    }
  }

  async function login(email, password) {
    setLoading(true);
    try {
      const res = await Api.auth.login(email, password);
      setUser(res);
      await resolveUserCart(res.customerId);
      return res;
    } finally {
      setLoading(false);
    }
  }

  async function register(customerData) {
    setLoading(true);
    try {
      const created = await Api.customers.register(customerData);
      // Auto login
      const loginRes = await Api.auth.login(created.email, customerData.password);
      setUser(loginRes);
      await resolveUserCart(loginRes.customerId);
      return loginRes;
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    setUser(null);
    setCartId(null);
    localStorage.removeItem('shopcx_user');
    localStorage.removeItem('shopcx_cart_id');
  }

  return (
    <AuthContext.Provider value={{ user, cartId, loading, login, register, logout, resolveUserCart }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
