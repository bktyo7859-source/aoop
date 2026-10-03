package com.shopx.controller;

import com.shopx.model.Cart;
import com.shopx.model.Order;
import com.shopx.service.CartService;
import com.shopx.service.CheckoutService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {

    private final CheckoutService checkoutService;
    private final CartService cartService;

    public CheckoutController(
            CheckoutService checkoutService,
            CartService cartService) {

        this.checkoutService = checkoutService;
        this.cartService = cartService;
    }

    @PostMapping("/{cartId}")
    public ResponseEntity<Order> checkout(
            @PathVariable Long cartId) {

        Cart cart = cartService.getCartById(cartId)
        .orElseThrow(() -> new RuntimeException("Cart not found"));

        Order order = checkoutService.checkout(cart);

        return ResponseEntity.ok(order);
    }
}