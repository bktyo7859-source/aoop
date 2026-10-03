package com.shopx.service;

import com.shopx.model.Order;
import com.shopx.model.OrderItem;
import com.shopx.model.Customer;
import com.shopx.repository.OrderItemRepository;
import com.shopx.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;

    public OrderService(OrderRepository orderRepository,
                        OrderItemRepository orderItemRepository) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Optional<Order> getOrderById(Long id) {
        return orderRepository.findById(id);
    }

    public List<Order> getOrdersByCustomer(Customer customer) {
        return orderRepository.findByCustomer(customer);
    }

    public Order createOrder(Order order) {
        return orderRepository.save(order);
    }

    public OrderItem addOrderItem(OrderItem orderItem) {
        return orderItemRepository.save(orderItem);
    }

    public List<OrderItem> getOrderItems(Order order) {
        return orderItemRepository.findByOrder(order);
    }

    public Order updateOrder(Long id, Order updatedOrder) {

        Order existingOrder = orderRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Order not found with id: " + id));

        existingOrder.setCustomer(updatedOrder.getCustomer());
        existingOrder.setStatus(updatedOrder.getStatus());
        existingOrder.setTotalAmount(updatedOrder.getTotalAmount());

        return orderRepository.save(existingOrder);
    }

    public void deleteOrder(Long id) {

        if (!orderRepository.existsById(id)) {
            throw new RuntimeException(
                    "Order not found with id: " + id);
        }

        orderRepository.deleteById(id);
    }

    public void deleteOrderItem(Long id) {

        if (!orderItemRepository.existsById(id)) {
            throw new RuntimeException(
                    "Order item not found with id: " + id);
        }

        orderItemRepository.deleteById(id);
    }
}