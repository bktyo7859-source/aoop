package com.shopx.frontend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ProductDto {
    private Long id;
    private String name;
    private String description;
    private Double price;
    private Integer stockQuantity;
    private CategoryDto category;

    // Authoritative stock populated from the Inventory API
    private Integer availableInventory;

    // Flattened fields from paginated search endpoint
    private String categoryName;
    private Integer inventoryQuantity;

    public ProductDto() {
    }

    public ProductDto(Long id, String name, String description, Double price, Integer stockQuantity, CategoryDto category) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.stockQuantity = stockQuantity;
        this.category = category;
        this.availableInventory = stockQuantity;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPrice() {
        return price != null ? price : 0.0;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getStockQuantity() {
        return stockQuantity != null ? stockQuantity : 0;
    }

    public void setStockQuantity(Integer stockQuantity) {
        this.stockQuantity = stockQuantity;
    }

    public CategoryDto getCategory() {
        return category;
    }

    public void setCategory(CategoryDto category) {
        this.category = category;
    }

    public Integer getAvailableInventory() {
        if (availableInventory != null) return availableInventory;
        if (inventoryQuantity != null) return inventoryQuantity;
        return getStockQuantity();
    }

    public void setAvailableInventory(Integer availableInventory) {
        this.availableInventory = availableInventory;
    }

    public Integer getInventoryQuantity() {
        return inventoryQuantity;
    }

    public void setInventoryQuantity(Integer inventoryQuantity) {
        this.inventoryQuantity = inventoryQuantity;
    }

    public boolean isInStock() {
        return getAvailableInventory() > 0;
    }

    public String getCategoryName() {
        if (categoryName != null && !categoryName.isBlank()) return categoryName;
        return category != null && category.getName() != null ? category.getName() : "Uncategorized";
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    @Override
    public String toString() {
        return name + " (" + price + ")";
    }
}
