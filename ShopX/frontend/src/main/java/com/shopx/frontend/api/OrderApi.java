package com.shopx.frontend.api;

import com.fasterxml.jackson.core.type.TypeReference;
import com.shopx.frontend.model.OrderDto;
import com.shopx.frontend.model.OrderItemDto;

import java.util.List;

public class OrderApi {

    private final ApiClient apiClient;

    public OrderApi() {
        this(ApiClient.getInstance());
    }

    public OrderApi(ApiClient apiClient) {
        this.apiClient = apiClient;
    }

    public OrderDto getOrderById(Long orderId) throws ApiException {
        return apiClient.get("/api/orders/" + orderId, OrderDto.class);
    }

    public List<OrderItemDto> getOrderItems(Long orderId) throws ApiException {
        return apiClient.get("/api/orders/" + orderId + "/items", new TypeReference<List<OrderItemDto>>() {});
    }
}
