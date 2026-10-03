package com.shopx.controller;

import com.shopx.model.Cart;
import com.shopx.model.CartItem;
import com.shopx.service.CartService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/carts")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping
    public ResponseEntity<List<Cart>> getAllCarts() {
        return ResponseEntity.ok(
                cartService.getAllCarts()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cart> getCartById(
            @PathVariable Long id) {

        return cartService.getCartById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<Cart> getCartByCustomerId(
            @PathVariable Long customerId) {

        com.shopx.model.Customer customer = new com.shopx.model.Customer();
        customer.setId(customerId);
        return cartService.getCartByCustomer(customer)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Cart> createCart(
            @RequestBody Cart cart) {

        return ResponseEntity.ok(
                cartService.createCart(cart)
        );
    }

    @PostMapping("/items")
    public ResponseEntity<CartItem> addItemToCart(
            @RequestBody CartItem cartItem) {

        return ResponseEntity.ok(
                cartService.addItemToCart(cartItem)
        );
    }

    @GetMapping("/{cartId}/items")
    public ResponseEntity<List<CartItem>> getCartItems(
            @PathVariable Long cartId) {

        return cartService.getCartById(cartId)
                .map(cart -> ResponseEntity.ok(
                        cartService.getCartItems(cart)
                ))
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/items/{itemId}")
    public ResponseEntity<Void> removeCartItem(
            @PathVariable Long itemId) {

        cartService.removeCartItem(itemId);

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{cartId}/items")
    public ResponseEntity<Void> clearCart(
            @PathVariable Long cartId) {

        return cartService.getCartById(cartId)
                .map(cart -> {
                    cartService.clearCart(cart);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}