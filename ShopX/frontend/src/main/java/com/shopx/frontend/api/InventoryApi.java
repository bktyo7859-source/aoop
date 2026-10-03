package com.shopx.frontend.api;

import com.fasterxml.jackson.core.type.TypeReference;
import com.shopx.frontend.model.InventoryDto;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class InventoryApi {

    private final ApiClient apiClient;

    public InventoryApi() {
        this(ApiClient.getInstance());
    }

    public InventoryApi(ApiClient apiClient) {
        this.apiClient = apiClient;
    }

    public List<InventoryDto> getAllInventory() throws ApiException {
        return apiClient.get("/api/inventory", new TypeReference<List<InventoryDto>>() {});
    }

    /**
     * Builds a map of productId -> authoritative stock quantity.
     */
    public Map<Long, Integer> getInventoryStockMap() throws ApiException {
        List<InventoryDto> list = getAllInventory();
        Map<Long, Integer> map = new HashMap<>();
        if (list != null) {
            for (InventoryDto inv : list) {
                if (inv.getProduct() != null && inv.getProduct().getId() != null) {
                    map.put(inv.getProduct().getId(), inv.getQuantity());
                }
            }
        }
        return map;
    }
}
