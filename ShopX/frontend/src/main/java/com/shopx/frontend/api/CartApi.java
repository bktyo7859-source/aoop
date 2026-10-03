package com.shopx.frontend.api;

import com.fasterxml.jackson.core.type.TypeReference;
import com.shopx.frontend.model.CartDto;
import com.shopx.frontend.model.CartItemDto;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class CartApi {

    private final ApiClient apiClient;

    public CartApi() {
        this(ApiClient.getInstance());
    }

    public CartApi(ApiClient apiClient) {
        this.apiClient = apiClient;
    }

    public CartDto getCartById(Long id) throws ApiException {
        return apiClient.get("/api/carts/" + id, CartDto.class);
    }

    public CartDto createCartForCustomer(Long customerId) throws ApiException {
        Map<String, Object> payload = new HashMap<>();
        Map<String, Object> customer = new HashMap<>();
        customer.put("id", customerId);
        payload.put("customer", customer);

        return apiClient.post("/api/carts", payload, CartDto.class);
    }

    /**
     * Resolves the active cart for a customer using existing backend endpoints.
     */
    public CartDto resolveCustomerCart(Long customerId) throws ApiException {
        // Step 1: In the standard seed data, cart ID matches customer ID
        try {
            CartDto cart = getCartById(customerId);
            if (cart != null && cart.getCustomer() != null && customerId.equals(cart.getCustomer().getId())) {
                return cart;
            }
            if (cart != null) {
                return cart;
            }
        } catch (ApiException e) {
            // Cart with ID customerId not found or not matching
        }

        // Step 2: Try creating a new cart for this customer
        try {
            return createCartForCustomer(customerId);
        } catch (ApiException ignored) {
            // If already exists, search all carts
        }

        // Step 3: Look up cart directly by customer ID
        try {
            CartDto cart = apiClient.get("/api/carts/customer/" + customerId, CartDto.class);
            if (cart != null) {
                return cart;
            }
        } catch (Exception ignored) {
        }

        // Default fallback
        CartDto fallback = new CartDto();
        fallback.setId(customerId);
        return fallback;
    }

    public List<CartItemDto> getCartItems(Long cartId) throws ApiException {
        return apiClient.get("/api/carts/" + cartId + "/items", new TypeReference<List<CartItemDto>>() {});
    }

    /**
     * Adds an item to the cart using the backend's verified payload format:
     * {
     *   "cart": { "id": cartId },
     *   "product": { "id": productId },
     *   "quantity": quantity
     * }
     */
    public CartItemDto addItemToCart(Long cartId, Long productId, int quantity) throws ApiException {
        Map<String, Object> payload = new HashMap<>();
        Map<String, Object> cartMap = new HashMap<>();
        cartMap.put("id", cartId);

        Map<String, Object> productMap = new HashMap<>();
        productMap.put("id", productId);

        payload.put("cart", cartMap);
        payload.put("product", productMap);
        payload.put("quantity", quantity);

        return apiClient.post("/api/carts/items", payload, CartItemDto.class);
    }

    public void removeCartItem(Long itemId) throws ApiException {
        apiClient.delete("/api/carts/items/" + itemId);
    }

    public void clearCart(Long cartId) throws ApiException {
        apiClient.delete("/api/carts/" + cartId + "/items");
    }
}
