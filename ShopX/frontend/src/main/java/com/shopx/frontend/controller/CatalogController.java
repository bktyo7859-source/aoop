package com.shopx.frontend.controller;

import com.shopx.frontend.api.CartApi;
import com.shopx.frontend.api.CategoryApi;
import com.shopx.frontend.api.ProductApi;
import com.shopx.frontend.model.*;
import com.shopx.frontend.navigation.NavigationManager;
import com.shopx.frontend.util.CurrencyFormatter;
import com.shopx.frontend.util.UiUtils;
import javafx.animation.PauseTransition;
import javafx.application.Platform;
import javafx.collections.FXCollections;
import javafx.fxml.FXML;
import javafx.geometry.Pos;
import javafx.scene.control.*;
import javafx.scene.layout.*;
import javafx.util.Duration;

import java.util.*;

public class CatalogController {

    @FXML
    private Label userGreetingLabel;

    @FXML
    private Button cartButton;

    @FXML
    private TextField searchField;

    @FXML
    private ComboBox<String> categoryComboBox;

    @FXML
    private Button adminPanelButton;

    @FXML
    private FlowPane productGrid;

    @FXML
    private ProgressIndicator loadingIndicator;

    @FXML
    private Label emptyStateLabel;

    @FXML
    private Label notificationLabel;

    @FXML
    private Button prevPageButton;

    @FXML
    private Button nextPageButton;

    @FXML
    private Label pageInfoLabel;

    private final ProductApi productApi = new ProductApi();
    private final CategoryApi categoryApi = new CategoryApi();
    private final CartApi cartApi = new CartApi();

    private final List<CategoryDto> masterCategoryList = new ArrayList<>();

    private static final int PAGE_SIZE = 50;
    private int currentPage = 0;
    private int totalPages = 1;
    private long totalElements = 0;

    // Debounce timer for search field
    private PauseTransition searchDebounce;

    @FXML
    public void initialize() {
        // Bind customer greeting
        CustomerDto customer = UserSession.getInstance().getCurrentCustomer();
        if (customer != null && customer.getName() != null) {
            userGreetingLabel.setText("Hello, " + customer.getName());
        } else {
            userGreetingLabel.setText("Welcome to ShopX");
        }

        // Configure Admin Panel button
        boolean isAdmin = UserSession.getInstance().isAdmin();
        adminPanelButton.setVisible(isAdmin);
        adminPanelButton.setManaged(isAdmin);

        // Bind cart button to session cart item count
        updateCartButtonBadge(UserSession.getInstance().getCartItemCount());
        UserSession.getInstance().cartItemCountProperty().addListener((obs, oldVal, newVal) -> {
            updateCartButtonBadge(newVal.intValue());
        });

        // Search field listener with debounce (300ms delay)
        searchDebounce = new PauseTransition(Duration.millis(300));
        searchDebounce.setOnFinished(e -> {
            currentPage = 0;
            loadProductsPage();
        });
        searchField.textProperty().addListener((obs, oldVal, newVal) -> searchDebounce.playFromStart());

        // Category dropdown listener
        categoryComboBox.valueProperty().addListener((obs, oldVal, newVal) -> {
            if (oldVal != null && !oldVal.equals(newVal)) {
                currentPage = 0;
                loadProductsPage();
            }
        });

        // Load categories, then load first page of products
        loadCatalogData();
    }

    private void updateCartButtonBadge(int count) {
        if (count > 0) {
            cartButton.setText("\uD83D\uDED2 Cart (" + count + ")");
        } else {
            cartButton.setText("\uD83D\uDED2 Cart");
        }
    }

    @FXML
    public void loadCatalogData() {
        setLoading(true);
        clearNotification();

        UiUtils.runAsync(
                () -> {
                    // Fetch categories for the dropdown filter
                    List<CategoryDto> categories = categoryApi.getAllCategories();

                    // Fetch cart count
                    Long cartId = UserSession.getInstance().getActiveCartId();
                    int cartCount = 0;
                    if (cartId != null) {
                        try {
                            List<CartItemDto> items = cartApi.getCartItems(cartId);
                            cartCount = items.stream().mapToInt(CartItemDto::getQuantity).sum();
                        } catch (Exception ignored) {
                        }
                    }

                    return new Object[]{categories, cartCount};
                },
                result -> {
                    @SuppressWarnings("unchecked")
                    List<CategoryDto> categories = (List<CategoryDto>) result[0];
                    int cartCount = (Integer) result[1];

                    UserSession.getInstance().setCartItemCount(cartCount);

                    masterCategoryList.clear();
                    masterCategoryList.addAll(categories);
                    populateCategoryFilter(categories);

                    // Now load the first page of products
                    currentPage = 0;
                    loadProductsPage();
                },
                throwable -> {
                    setLoading(false);
                    showNotification("Error loading catalog: " + throwable.getMessage(), true);
                }
        );
    }

    private void loadProductsPage() {
        setLoading(true);
        clearNotification();

        String search = searchField.getText() != null ? searchField.getText().trim() : "";
        Long categoryId = getSelectedCategoryId();

        UiUtils.runAsync(
                () -> productApi.getProductsPage(currentPage, PAGE_SIZE, search, categoryId),
                page -> {
                    setLoading(false);
                    if (page != null && page.getContent() != null) {
                        totalPages = page.getTotalPages();
                        totalElements = page.getTotalElements();
                        currentPage = page.getNumber();
                        renderProducts(page.getContent());
                    } else {
                        totalPages = 1;
                        totalElements = 0;
                        renderProducts(Collections.emptyList());
                    }
                    updatePaginationControls();
                },
                throwable -> {
                    setLoading(false);
                    showNotification("Error loading products: " + throwable.getMessage(), true);
                }
        );
    }

    private Long getSelectedCategoryId() {
        String selectedCategory = categoryComboBox.getValue();
        if (selectedCategory == null || "All Categories".equals(selectedCategory)) {
            return null;
        }
        for (CategoryDto cat : masterCategoryList) {
            if (selectedCategory.equalsIgnoreCase(cat.getName())) {
                return cat.getId();
            }
        }
        return null;
    }

    private void populateCategoryFilter(List<CategoryDto> categories) {
        List<String> options = new ArrayList<>();
        options.add("All Categories");

        List<String> sortedNames = new ArrayList<>();
        for (CategoryDto cat : categories) {
            if (cat.getName() != null && !cat.getName().isBlank()) {
                sortedNames.add(cat.getName());
            }
        }
        sortedNames.sort(String.CASE_INSENSITIVE_ORDER);
        options.addAll(sortedNames);

        categoryComboBox.setItems(FXCollections.observableArrayList(options));
        categoryComboBox.getSelectionModel().selectFirst();
    }

    private void renderProducts(List<ProductDto> products) {
        productGrid.getChildren().clear();

        if (products.isEmpty()) {
            emptyStateLabel.setVisible(true);
            emptyStateLabel.setManaged(true);
            return;
        }

        emptyStateLabel.setVisible(false);
        emptyStateLabel.setManaged(false);

        for (ProductDto product : products) {
            VBox card = createProductCard(product);
            productGrid.getChildren().add(card);
        }
    }

    private VBox createProductCard(ProductDto product) {
        VBox card = new VBox(8);
        card.getStyleClass().add("product-card");
        card.setPrefWidth(260);
        card.setMaxWidth(260);

        // Product Name
        Label nameLabel = new Label(product.getName());
        nameLabel.getStyleClass().add("product-name");
        nameLabel.setWrapText(true);
        nameLabel.setMinHeight(40);

        // Category Tag
        Label categoryTag = new Label(product.getCategoryName());
        categoryTag.getStyleClass().add("category-tag");

        // Description snippet
        Label descLabel = new Label(product.getDescription());
        descLabel.getStyleClass().add("product-description");
        descLabel.setWrapText(true);
        descLabel.setMaxHeight(45);

        // Price
        Label priceLabel = new Label(CurrencyFormatter.format(product.getPrice()));
        priceLabel.getStyleClass().add("product-price");

        // Authoritative Live Inventory Stock Availability
        int stock = product.getAvailableInventory();
        Label stockLabel = new Label();
        if (stock > 0) {
            stockLabel.setText("● In Stock (" + stock + ")");
            stockLabel.getStyleClass().addAll("stock-badge", "stock-in");
        } else {
            stockLabel.setText("✕ Out of Stock");
            stockLabel.getStyleClass().addAll("stock-badge", "stock-out");
        }

        HBox priceAndStock = new HBox(10, priceLabel, stockLabel);
        priceAndStock.setAlignment(Pos.CENTER_LEFT);

        // Add to Cart Button
        Button addButton = new Button("Add to Cart");
        addButton.getStyleClass().add("btn-primary");
        addButton.setMaxWidth(Double.MAX_VALUE);

        if (stock <= 0) {
            addButton.setDisable(true);
            addButton.setText("Out of Stock");
        } else {
            addButton.setOnAction(e -> handleAddToCart(product, addButton));
        }

        card.getChildren().addAll(nameLabel, categoryTag, descLabel, priceAndStock, addButton);
        return card;
    }

    private void handleAddToCart(ProductDto product, Button button) {
        Long cartId = UserSession.getInstance().getActiveCartId();
        if (cartId == null) {
            showNotification("Please log in to add items to the cart.", true);
            return;
        }

        button.setDisable(true);
        button.setText("Adding...");

        UiUtils.runAsync(
                () -> cartApi.addItemToCart(cartId, product.getId(), 1),
                cartItem -> {
                    // Temporarily confirm on button
                    button.setText("✓ Added!");
                    button.getStyleClass().add("btn-success");

                    // Increment session cart count
                    UserSession.getInstance().setCartItemCount(
                            UserSession.getInstance().getCartItemCount() + 1
                    );

                    showNotification("Added '" + product.getName() + "' to cart.", false);

                    // Re-enable button after 1.5 seconds using PauseTransition (no thread leak)
                    PauseTransition pause = new PauseTransition(Duration.seconds(1.5));
                    pause.setOnFinished(e -> {
                        button.setText("Add to Cart");
                        button.getStyleClass().remove("btn-success");
                        button.setDisable(false);
                    });
                    pause.play();
                },
                throwable -> {
                    button.setDisable(false);
                    button.setText("Add to Cart");
                    showNotification("Failed to add to cart: " + throwable.getMessage(), true);
                }
        );
    }

    @FXML
    private void prevPage() {
        if (currentPage > 0) {
            currentPage--;
            loadProductsPage();
        }
    }

    @FXML
    private void nextPage() {
        if (currentPage < totalPages - 1) {
            currentPage++;
            loadProductsPage();
        }
    }

    private void updatePaginationControls() {
        prevPageButton.setDisable(currentPage <= 0);
        nextPageButton.setDisable(currentPage >= totalPages - 1);
        if (totalElements > 0) {
            pageInfoLabel.setText("Page " + (currentPage + 1) + " of " + totalPages
                    + " (" + totalElements + " products)");
        } else {
            pageInfoLabel.setText("No products found");
        }
    }

    @FXML
    private void handleHomeLogoClick() {
        currentPage = 0;
        searchField.clear();
        if (categoryComboBox.getItems() != null && !categoryComboBox.getItems().isEmpty()) {
            categoryComboBox.getSelectionModel().selectFirst();
        }
        loadProductsPage();
    }

    @FXML
    private void openAdminPanel() {
        NavigationManager.getInstance().showAdmin();
    }

    @FXML
    private void openCart() {
        NavigationManager.getInstance().showCart();
    }

    @FXML
    private void handleLogout() {
        UserSession.getInstance().clearSession();
        NavigationManager.getInstance().showRoleSelect();
    }

    private void setLoading(boolean loading) {
        loadingIndicator.setVisible(loading);
        loadingIndicator.setManaged(loading);
        productGrid.setDisable(loading);
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
