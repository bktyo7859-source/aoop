/**
 * ShopCX REST API Service Layer
 * Fully integrated with Java Spring Boot backend on http://localhost:8080
 */

const API_BASE = '/api';

async function handleResponse(response) {
  if (!response.ok) {
    let errorMsg = `HTTP error ${response.status}`;
    try {
      const errJson = await response.json();
      errorMsg = errJson.message || errJson.error || errorMsg;
    } catch {
      const errText = await response.text();
      if (errText) errorMsg = errText;
    }
    throw new Error(errorMsg);
  }
  // If response has no content (204 No Content)
  if (response.status === 204) {
    return null;
  }
  return response.json();
}

export const Api = {
  // Authentication
  auth: {
    async login(email, password) {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      return handleResponse(res);
    }
  },

  // Customer Management
  customers: {
    async register(customer) {
      const res = await fetch(`${API_BASE}/customers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: customer.name,
          email: customer.email,
          password: customer.password,
          role: customer.role || 'CUSTOMER'
        })
      });
      return handleResponse(res);
    },
    async getById(id) {
      const res = await fetch(`${API_BASE}/customers/${id}`);
      return handleResponse(res);
    },
    async getByEmail(email) {
      const res = await fetch(`${API_BASE}/customers/email/${encodeURIComponent(email)}`);
      return handleResponse(res);
    }
  },

  // Categories
  categories: {
    async getAll() {
      const res = await fetch(`${API_BASE}/categories`);
      return handleResponse(res);
    }
  },

  // Products
  products: {
    async getAll() {
      const res = await fetch(`${API_BASE}/products`);
      return handleResponse(res);
    },
    async search({ page = 0, size = 50, search = '', categoryId = null } = {}) {
      const params = new URLSearchParams({
        page: String(page),
        size: String(size)
      });
      if (search && search.trim()) {
        params.append('search', search.trim());
      }
      if (categoryId) {
        params.append('categoryId', String(categoryId));
      }
      const res = await fetch(`${API_BASE}/products/search?${params.toString()}`);
      return handleResponse(res);
    },
    async getById(id) {
      const res = await fetch(`${API_BASE}/products/${id}`);
      return handleResponse(res);
    }
  },

  // Cart
  cart: {
    async getByCustomerId(customerId) {
      try {
        const res = await fetch(`${API_BASE}/carts/customer/${customerId}`);
        if (res.status === 404) return null;
        return handleResponse(res);
      } catch (err) {
        console.warn('Cart lookup note:', err);
        return null;
      }
    },
    async createCart(customerId) {
      const res = await fetch(`${API_BASE}/carts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: { id: customerId }
        })
      });
      return handleResponse(res);
    },
    async getItems(cartId) {
      const res = await fetch(`${API_BASE}/carts/${cartId}/items`);
      return handleResponse(res);
    },
    async addItem(cartId, productId, quantity = 1) {
      const res = await fetch(`${API_BASE}/carts/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cart: { id: cartId },
          product: { id: productId },
          quantity: quantity
        })
      });
      return handleResponse(res);
    },
    async removeItem(itemId) {
      const res = await fetch(`${API_BASE}/carts/items/${itemId}`, {
        method: 'DELETE'
      });
      return handleResponse(res);
    },
    async clearCart(cartId) {
      const res = await fetch(`${API_BASE}/carts/${cartId}/items`, {
        method: 'DELETE'
      });
      return handleResponse(res);
    }
  },

  // Checkout
  checkout: {
    async process(cartId) {
      const res = await fetch(`${API_BASE}/checkout/${cartId}`, {
        method: 'POST'
      });
      return handleResponse(res);
    }
  },

  // Orders
  orders: {
    async getAll() {
      const res = await fetch(`${API_BASE}/orders`);
      return handleResponse(res);
    },
    async getById(id) {
      const res = await fetch(`${API_BASE}/orders/${id}`);
      return handleResponse(res);
    },
    async getItems(orderId) {
      const res = await fetch(`${API_BASE}/orders/${orderId}/items`);
      return handleResponse(res);
    }
  }
};
