package com.shopx.frontend.api;

import com.shopx.frontend.model.OrderDto;

public class CheckoutApi {

    private final ApiClient apiClient;

    public CheckoutApi() {
        this(ApiClient.getInstance());
    }

    public CheckoutApi(ApiClient apiClient) {
        this.apiClient = apiClient;
    }

    public OrderDto checkout(Long cartId) throws ApiException {
        return apiClient.post("/api/checkout/" + cartId, null, OrderDto.class);
    }
}
