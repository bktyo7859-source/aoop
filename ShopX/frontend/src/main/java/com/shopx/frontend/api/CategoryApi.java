package com.shopx.frontend.api;

import com.fasterxml.jackson.core.type.TypeReference;
import com.shopx.frontend.model.CategoryDto;

import java.util.List;

public class CategoryApi {

    private final ApiClient apiClient;

    public CategoryApi() {
        this(ApiClient.getInstance());
    }

    public CategoryApi(ApiClient apiClient) {
        this.apiClient = apiClient;
    }

    public List<CategoryDto> getAllCategories() throws ApiException {
        return apiClient.get("/api/categories", new TypeReference<List<CategoryDto>>() {});
    }
}
