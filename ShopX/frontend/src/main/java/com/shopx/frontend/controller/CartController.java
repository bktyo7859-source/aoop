package com.shopx.frontend.controller;

import com.shopx.frontend.api.CartApi;
import com.shopx.frontend.model.CartItemDto;
import com.shopx.frontend.model.UserSession;
import com.shopx.frontend.navigation.NavigationManager;
import com.shopx.frontend.util.CurrencyFormatter;
import com.shopx.frontend.util.UiUtils;
import javafx.beans.property.SimpleObjectProperty;
import javafx.beans.property.SimpleStringProperty;
import javafx.collections.FXCollections;
import javafx.fxml.FXML;
import javafx.scene.control.*;
import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;

import java.util.List;

public class CartController {

    @FXML
    private TableView<CartItemDto> cartTable;

    @FXML
    private TableColumn<CartItemDto, String> productNameColumn;

    @FXML
    private TableColumn<CartItemDto, String> unitPriceColumn;

    @FXML
    private TableColumn<CartItemDto, Integer> quantityColumn;

    @FXML
    private TableColumn<CartItemDto, String> subtotalColumn;

    @FXML
    private TableColumn<CartItemDto, Void> actionColumn;

    @FXML
    private Label totalAmountLabel;

    @FXML
    private Label itemCountLabel;

    @FXML
    private Button checkoutButton;

    @FXML
    private Button clearCartButton;

    @FXML
    private ProgressIndicator loadingIndicator;

    @FXML
    private VBox emptyCartPane;

    @FXML
    private Label notificationLabel;

    private final CartApi cartApi = new CartApi();

    @FXML
    public void initialize() {
        setupTableColumns();
        loadCartItems();
    }

    private void setupTableColumns() {
        productNameColumn.setCellValueFactory(cellData -> {
            if (cellData.getValue().getProduct() != null) {
                return new SimpleStringProperty(cellData.getValue().getProduct().getName());
            }
            return new SimpleStringProperty("Product #" + cellData.getValue().getId());
        });

        unitPriceColumn.setCellValueFactory(cellData -> {
            if (cellData.getValue().getProduct() != null) {
                return new SimpleStringProperty(CurrencyFormatter.format(cellData.getValue().getProduct().getPrice()));
            }
            return new SimpleStringProperty("₹0.00");
        });

        quantityColumn.setCellValueFactory(cellData ->
                new SimpleObjectProperty<>(cellData.getValue().getQuantity())
        );

        subtotalColumn.setCellValueFactory(cellData ->
                new SimpleStringProperty(CurrencyFormatter.format(cellData.getValue().getSubtotal()))
        );

        // Action Column: Remove button
        actionColumn.setCellFactory(col -> new TableCell<>() {
            private final Button removeBtn = new Button("Remove");

            {
                removeBtn.getStyleClass().add("btn-danger-outline");
                removeBtn.setOnAction(e -> {
                    CartItemDto item = getTableView().getItems().get(getIndex());
                    handleRemoveItem(item);
                });
            }

            @Override
            protected void updateItem(Void item, boolean empty) {
                super.updateItem(item, empty);
                if (empty) {
                    setGraphic(null);
                } else {
                    setGraphic(removeBtn);
                }
            }
        });
    }

    @FXML
    public void loadCartItems() {
        Long cartId = UserSession.getInstance().getActiveCartId();
        if (cartId == null) {
            showNotification("No active cart session found. Please log in.", true);
            return;
        }

        setLoading(true);
        clearNotification();

        UiUtils.runAsync(
                () -> cartApi.getCartItems(cartId),
                items -> {
                    setLoading(false);
                    cartTable.setItems(FXCollections.observableArrayList(items));
                    updateSummary(items);
                },
                throwable -> {
                    setLoading(false);
                    showNotification("Failed to load cart: " + throwable.getMessage(), true);
                }
        );
    }

    private void updateSummary(List<CartItemDto> items) {
        int totalItems = 0;
        double grandTotal = 0.0;

        for (CartItemDto item : items) {
            totalItems += item.getQuantity();
            grandTotal += item.getSubtotal();
        }

        UserSession.getInstance().setCartItemCount(totalItems);

        itemCountLabel.setText(totalItems + " items");
        totalAmountLabel.setText(CurrencyFormatter.format(grandTotal));

        boolean isEmpty = items.isEmpty();
        checkoutButton.setDisable(isEmpty);
        clearCartButton.setDisable(isEmpty);

        cartTable.setVisible(!isEmpty);
        cartTable.setManaged(!isEmpty);
        emptyCartPane.setVisible(isEmpty);
        emptyCartPane.setManaged(isEmpty);
    }

    private void handleRemoveItem(CartItemDto item) {
        setLoading(true);
        UiUtils.runAsync(
                () -> {
                    cartApi.removeCartItem(item.getId());
                    return null;
                },
                result -> {
                    showNotification("Item removed from cart.", false);
                    loadCartItems();
                },
                throwable -> {
                    setLoading(false);
                    showNotification("Failed to remove item: " + throwable.getMessage(), true);
                }
        );
    }

    @FXML
    private void handleClearCart() {
        Long cartId = UserSession.getInstance().getActiveCartId();
        if (cartId == null) return;

        setLoading(true);
        UiUtils.runAsync(
                () -> {
                    cartApi.clearCart(cartId);
                    return null;
                },
                result -> {
                    showNotification("Cart cleared successfully.", false);
                    loadCartItems();
                },
                throwable -> {
                    setLoading(false);
                    showNotification("Failed to clear cart: " + throwable.getMessage(), true);
                }
        );
    }

    @FXML
    private void continueShopping() {
        NavigationManager.getInstance().showCatalog();
    }

    @FXML
    private void proceedToCheckout() {
        NavigationManager.getInstance().showCheckout();
    }

    private void setLoading(boolean loading) {
        loadingIndicator.setVisible(loading);
        loadingIndicator.setManaged(loading);
        cartTable.setDisable(loading);
        checkoutButton.setDisable(loading);
        clearCartButton.setDisable(loading);
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
