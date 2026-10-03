package com.shopx.frontend.api;

import com.fasterxml.jackson.core.type.TypeReference;
import com.shopx.frontend.model.ProductDto;
import com.shopx.frontend.model.ProductPageDto;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;

public class ProductApi {

    private final ApiClient apiClient;

    public ProductApi() {
        this(ApiClient.getInstance());
    }

    public ProductApi(ApiClient apiClient) {
        this.apiClient = apiClient;
    }

    public List<ProductDto> getAllProducts() throws ApiException {
        return apiClient.get("/api/products", new TypeReference<List<ProductDto>>() {});
    }

    public ProductDto getProductById(Long id) throws ApiException {
        return apiClient.get("/api/products/" + id, ProductDto.class);
    }

    /**
     * Paginated product search with optional text filter and category filter.
     * Returns a page of products with inventory data included.
     */
    public ProductPageDto getProductsPage(int page, int size, String search, Long categoryId) throws ApiException {
        StringBuilder path = new StringBuilder("/api/products/search?");
        path.append("page=").append(page);
        path.append("&size=").append(size);
        if (search != null && !search.isBlank()) {
            path.append("&search=").append(URLEncoder.encode(search.trim(), StandardCharsets.UTF_8));
        }
        if (categoryId != null && categoryId > 0) {
            path.append("&categoryId=").append(categoryId);
        }
        return apiClient.get(path.toString(), ProductPageDto.class);
    }

    public ProductDto createProduct(String name, String description, Double price, Integer stockQuantity, Long categoryId) throws ApiException {
        java.util.Map<String, Object> payload = new java.util.HashMap<>();
        payload.put("name", name);
        payload.put("description", description);
        payload.put("price", price);
        payload.put("stockQuantity", stockQuantity);
        payload.put("categoryId", categoryId);

        return apiClient.post("/api/products", payload, ProductDto.class);
    }
}
