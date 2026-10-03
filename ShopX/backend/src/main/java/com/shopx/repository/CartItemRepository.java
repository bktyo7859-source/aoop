package com.shopx.repository;

import com.shopx.model.Cart;
import com.shopx.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    List<CartItem> findByCart(Cart cart);

    Optional<CartItem> findByCartAndProduct(
            Cart cart, com.shopx.model.Product product);
}