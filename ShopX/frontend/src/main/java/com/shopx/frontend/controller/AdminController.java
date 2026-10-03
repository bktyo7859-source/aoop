package com.shopx.frontend.controller;

import com.shopx.frontend.api.CategoryApi;
import com.shopx.frontend.api.ProductApi;
import com.shopx.frontend.model.CategoryDto;
import com.shopx.frontend.model.CustomerDto;
import com.shopx.frontend.model.UserSession;
import com.shopx.frontend.navigation.NavigationManager;
import com.shopx.frontend.util.UiUtils;
import javafx.collections.FXCollections;
import javafx.fxml.FXML;
import javafx.scene.control.*;

import java.util.ArrayList;
import java.util.List;

public class AdminController {

    @FXML
    private Label adminGreetingLabel;

    @FXML
    private TextField productNameField;

    @FXML
    private ComboBox<String> categoryComboBox;

    @FXML
    private TextField productPriceField;

    @FXML
    private TextField stockQuantityField;

    @FXML
    private TextArea descriptionArea;

    @FXML
    private Button addProductButton;

    @FXML
    private ProgressIndicator loadingIndicator;

    @FXML
    private Label notificationLabel;

    private final ProductApi productApi = new ProductApi();
    private final CategoryApi categoryApi = new CategoryApi();

    private final List<CategoryDto> categoryList = new ArrayList<>();

    @FXML
    public void initialize() {
        CustomerDto customer = UserSession.getInstance().getCurrentCustomer();
        if (customer != null && customer.getName() != null) {
            adminGreetingLabel.setText("Hello, " + customer.getName());
        } else {
            adminGreetingLabel.setText("ShopX Administrator");
        }

        loadCategories();
    }

    private void loadCategories() {
        UiUtils.runAsync(
                categoryApi::getAllCategories,
                categories -> {
                    categoryList.clear();
                    categoryList.addAll(categories);

                    List<String> names = new ArrayList<>();
                    for (CategoryDto cat : categories) {
                        if (cat.getName() != null && !cat.getName().isBlank()) {
                            names.add(cat.getName());
                        }
                    }
                    names.sort(String.CASE_INSENSITIVE_ORDER);
                    categoryComboBox.setItems(FXCollections.observableArrayList(names));
                    if (!names.isEmpty()) {
                        categoryComboBox.getSelectionModel().selectFirst();
                    }
                },
                throwable -> showNotification("Failed to load categories: " + throwable.getMessage(), true)
        );
    }

    @FXML
    private void handleAddProduct() {
        String name = productNameField.getText() != null ? productNameField.getText().trim() : "";
        String selectedCategoryName = categoryComboBox.getValue();
        String priceStr = productPriceField.getText() != null ? productPriceField.getText().trim() : "";
        String stockStr = stockQuantityField.getText() != null ? stockQuantityField.getText().trim() : "";
        String desc = descriptionArea.getText() != null ? descriptionArea.getText().trim() : "";

        if (name.isEmpty()) {
            showNotification("Product name is required.", true);
            return;
        }

        if (selectedCategoryName == null || selectedCategoryName.isBlank()) {
            showNotification("Please select a valid category.", true);
            return;
        }

        double price;
        try {
            price = Double.parseDouble(priceStr);
            if (price <= 0) {
                showNotification("Price must be greater than zero.", true);
                return;
            }
        } catch (NumberFormatException e) {
            showNotification("Please enter a valid numeric price.", true);
            return;
        }

        int stock;
        try {
            stock = Integer.parseInt(stockStr);
            if (stock < 0) {
                showNotification("Stock quantity cannot be negative.", true);
                return;
            }
        } catch (NumberFormatException e) {
            showNotification("Please enter a valid integer stock quantity.", true);
            return;
        }

        Long categoryId = null;
        for (CategoryDto cat : categoryList) {
            if (selectedCategoryName.equalsIgnoreCase(cat.getName())) {
                categoryId = cat.getId();
                break;
            }
        }

        if (categoryId == null) {
            showNotification("Could not resolve category ID.", true);
            return;
        }

        final Long finalCategoryId = categoryId;
        setLoading(true);
        clearNotification();

        UiUtils.runAsync(
                () -> productApi.createProduct(name, desc, price, stock, finalCategoryId),
                newProduct -> {
                    setLoading(false);
                    showNotification("Product '" + newProduct.getName() + "' (ID: #" + newProduct.getId() + ") added to store successfully!", false);
                    handleClearForm();
                },
                throwable -> {
                    setLoading(false);
                    showNotification("Failed to add product: " + throwable.getMessage(), true);
                }
        );
    }

    @FXML
    private void handleClearForm() {
        productNameField.clear();
        productPriceField.clear();
        stockQuantityField.clear();
        descriptionArea.clear();
        if (!categoryComboBox.getItems().isEmpty()) {
            categoryComboBox.getSelectionModel().selectFirst();
        }
    }

    @FXML
    private void handleHomeNavigation() {
        NavigationManager.getInstance().showCatalog();
    }

    @FXML
    private void handleLogout() {
        UserSession.getInstance().clearSession();
        NavigationManager.getInstance().showRoleSelect();
    }

    private void setLoading(boolean loading) {
        addProductButton.setDisable(loading);
        loadingIndicator.setVisible(loading);
        loadingIndicator.setManaged(loading);
    }

    private void showNotification(String message, boolean isError) {
        notificationLabel.setText(message);
        notificationLabel.getStyleClass().removeAll("notification-error", "notification-success");
        notificationLabel.getStyleClass().add(isError ? "notification-error" : "notification-success");
        notificationLabel.setVisible(true);
        notificationLabel.setManaged(true);
    }

    private void clearNotification() {
        notificationLabel.setText("");
        notificationLabel.setVisible(false);
        notificationLabel.setManaged(false);
    }
}
