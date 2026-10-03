package com.shopx.service;

import com.shopx.model.Cart;
import com.shopx.model.CartItem;
import com.shopx.model.InventoryTransaction;
import com.shopx.model.Order;
import com.shopx.model.OrderItem;
import com.shopx.model.OrderStatus;
import com.shopx.model.TransactionType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CheckoutService {
    

    private final CartService cartService;
    private final OrderService orderService;
    private final InventoryService inventoryService;
    private final InventoryTransactionService transactionService;

    public CheckoutService(
            CartService cartService,
            OrderService orderService,
            InventoryService inventoryService,
            InventoryTransactionService transactionService) {

        this.cartService = cartService;
        this.orderService = orderService;
        this.inventoryService = inventoryService;
        this.transactionService = transactionService;
    }
    @Transactional

    public Order checkout(Cart cart) {

        List<CartItem> cartItems =
                cartService.getCartItems(cart);

        if (cartItems.isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        double totalAmount = 0.0;

        for (CartItem cartItem : cartItems) {

            if (cartItem.getQuantity() <= 0) {
                throw new RuntimeException(
                        "Cart item quantity must be greater than zero");
            }

            totalAmount +=
                    cartItem.getProduct().getPrice()
                    * cartItem.getQuantity();
        }

        Order order = new Order(
                cart.getCustomer(),
                OrderStatus.CONFIRMED,
                totalAmount
        );

        order = orderService.createOrder(order);

        for (CartItem cartItem : cartItems) {

            OrderItem orderItem = new OrderItem(
                    order,
                    cartItem.getProduct(),
                    cartItem.getQuantity(),
                    cartItem.getProduct().getPrice()
            );

            orderService.addOrderItem(orderItem);

            inventoryService.reduceStockByProduct(
                    cartItem.getProduct(),
                    cartItem.getQuantity()
            );

            InventoryTransaction transaction =
                    new InventoryTransaction(
                            cartItem.getProduct(),
                            cartItem.getQuantity(),
                            TransactionType.SALE
                    );

            transactionService.createTransaction(transaction);
        }

        cartService.clearCart(cart);

        return order;
    }
}