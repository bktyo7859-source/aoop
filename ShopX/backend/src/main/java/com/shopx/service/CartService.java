package com.shopx.service;

import com.shopx.model.Cart;
import com.shopx.model.CartItem;
import com.shopx.repository.CartItemRepository;
import com.shopx.repository.CartRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;

    public CartService(CartRepository cartRepository,
                       CartItemRepository cartItemRepository) {
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
    }

    public List<Cart> getAllCarts() {
        return cartRepository.findAll();
    }

    public Optional<Cart> getCartById(Long id) {
        return cartRepository.findById(id);
    }

    public Optional<Cart> getCartByCustomer(
            com.shopx.model.Customer customer) {

        return cartRepository.findByCustomer(customer);
    }

    public Cart createCart(Cart cart) {
        return cartRepository.save(cart);
    }

    public CartItem addItemToCart(CartItem cartItem) {

        Optional<CartItem> existingItem =
                cartItemRepository.findByCartAndProduct(
                        cartItem.getCart(),
                        cartItem.getProduct()
                );

        if (existingItem.isPresent()) {

            CartItem item = existingItem.get();

            item.setQuantity(
                    item.getQuantity() + cartItem.getQuantity()
            );

            return cartItemRepository.save(item);
        }

        return cartItemRepository.save(cartItem);
    }

    public List<CartItem> getCartItems(Cart cart) {
        return cartItemRepository.findByCart(cart);
    }

    public void removeCartItem(Long id) {

        if (!cartItemRepository.existsById(id)) {
            throw new RuntimeException(
                    "Cart item not found with id: " + id);
        }

        cartItemRepository.deleteById(id);
    }

    public void clearCart(Cart cart) {

        List<CartItem> items =
                cartItemRepository.findByCart(cart);

        cartItemRepository.deleteAll(items);
    }
}