import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Api } from '../services/api';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { user, cartId, resolveUserCart } = useAuth();
  const { addToast } = useToast();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [addingProductId, setAddingProductId] = useState(null);

  const fetchItems = useCallback(async (cId) => {
    const activeCartId = cId || cartId;
    if (!activeCartId) {
      setItems([]);
      return;
    }
    try {
      setLoading(true);
      const res = await Api.cart.getItems(activeCartId);
      setItems(Array.isArray(res) ? res : []);
    } catch (err) {
      console.warn('Failed to fetch cart items:', err);
    } finally {
      setLoading(false);
    }
  }, [cartId]);

  useEffect(() => {
    if (cartId) {
      fetchItems(cartId);
    } else {
      setItems([]);
    }
  }, [cartId, fetchItems]);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  // Add Item to Cart
  const addToCart = async (product, quantity = 1) => {
    try {
      setAddingProductId(product.id);
      let currentCartId = cartId;

      // If user is not logged in or no cartId, resolve or create demo cart
      if (!currentCartId) {
        let customerId = user ? user.customerId : 1; // Default to demo customer 1
        let userCart = await Api.cart.getByCustomerId(customerId);
        if (!userCart || !userCart.id) {
          userCart = await Api.cart.createCart(customerId);
        }
        currentCartId = String(userCart.id);
        localStorage.setItem('shopcx_cart_id', currentCartId);
      }

      await Api.cart.addItem(Number(currentCartId), product.id, quantity);
      await fetchItems(currentCartId);
      addToast(`Added "${product.name}" to bag`, 'success');
      openDrawer();
    } catch (err) {
      console.error('Failed to add item to cart:', err);
      addToast(err.message || 'Unable to add item to bag', 'error');
    } finally {
      setAddingProductId(null);
    }
  };

  // Remove Item
  const removeItem = async (itemId) => {
    try {
      await Api.cart.removeItem(itemId);
      setItems(prev => prev.filter(i => i.id !== itemId));
      addToast('Item removed from bag', 'info');
    } catch (err) {
      console.error('Failed to remove cart item:', err);
      addToast('Failed to remove item', 'error');
    }
  };

  // Clear Cart
  const clearCart = async () => {
    if (!cartId) return;
    try {
      await Api.cart.clearCart(cartId);
      setItems([]);
      addToast('Bag cleared', 'info');
    } catch (err) {
      console.error('Failed to clear cart:', err);
    }
  };

  const cartCount = items.reduce((acc, item) => acc + (item.quantity || 1), 0);
  const cartSubtotal = items.reduce((acc, item) => {
    const price = (item.product && item.product.price) || 0;
    return acc + price * (item.quantity || 1);
  }, 0);

  return (
    <CartContext.Provider value={{
      items,
      loading,
      cartCount,
      cartSubtotal,
      isDrawerOpen,
      addingProductId,
      openDrawer,
      closeDrawer,
      addToCart,
      removeItem,
      clearCart,
      refreshCart: () => fetchItems(cartId)
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
