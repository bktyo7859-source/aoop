package com.shopx.frontend.controller;

import com.shopx.frontend.api.CartApi;
import com.shopx.frontend.api.CheckoutApi;
import com.shopx.frontend.model.CartItemDto;
import com.shopx.frontend.model.CustomerDto;
import com.shopx.frontend.model.OrderDto;
import com.shopx.frontend.model.UserSession;
import com.shopx.frontend.navigation.NavigationManager;
import com.shopx.frontend.util.CurrencyFormatter;
import com.shopx.frontend.util.UiUtils;
import javafx.beans.property.SimpleObjectProperty;
import javafx.beans.property.SimpleStringProperty;
import javafx.collections.FXCollections;
import javafx.fxml.FXML;
import javafx.scene.control.*;
import javafx.scene.layout.VBox;

import java.util.List;

public class CheckoutController {

    @FXML
    private Label customerNameLabel;

    @FXML
    private Label customerEmailLabel;

    @FXML
    private Label customerRoleLabel;

    @FXML
    private TableView<CartItemDto> checkoutItemsTable;

    @FXML
    private TableColumn<CartItemDto, String> itemCol;

    @FXML
    private TableColumn<CartItemDto, Integer> qtyCol;

    @FXML
    private TableColumn<CartItemDto, String> priceCol;

    @FXML
    private TableColumn<CartItemDto, String> subtotalCol;

    @FXML
    private Label summaryItemsCountLabel;

    @FXML
    private Label summaryTotalAmountLabel;

    @FXML
    private Button placeOrderButton;

    @FXML
    private Button backToCartButton;

    @FXML
    private ProgressIndicator progressIndicator;

    @FXML
    private Label errorLabel;

    private final CartApi cartApi = new CartApi();
    private final CheckoutApi checkoutApi = new CheckoutApi();

    @FXML
    public void initialize() {
        setupTableColumns();
        displayCustomerInfo();
        loadItemsForCheckout();
    }

    private void setupTableColumns() {
        itemCol.setCellValueFactory(cellData -> {
            if (cellData.getValue().getProduct() != null) {
                return new SimpleStringProperty(cellData.getValue().getProduct().getName());
            }
            return new SimpleStringProperty("Item #" + cellData.getValue().getId());
        });

        qtyCol.setCellValueFactory(cellData ->
                new SimpleObjectProperty<>(cellData.getValue().getQuantity())
        );

        priceCol.setCellValueFactory(cellData -> {
            if (cellData.getValue().getProduct() != null) {
                return new SimpleStringProperty(CurrencyFormatter.format(cellData.getValue().getProduct().getPrice()));
            }
            return new SimpleStringProperty("₹0.00");
        });

        subtotalCol.setCellValueFactory(cellData ->
                new SimpleStringProperty(CurrencyFormatter.format(cellData.getValue().getSubtotal()))
        );
    }

    private void displayCustomerInfo() {
        CustomerDto customer = UserSession.getInstance().getCurrentCustomer();
        if (customer != null) {
            customerNameLabel.setText(customer.getName());
            customerEmailLabel.setText(customer.getEmail());
            customerRoleLabel.setText(customer.getRole() != null ? customer.getRole() : "CUSTOMER");
        }
    }

    private void loadItemsForCheckout() {
        Long cartId = UserSession.getInstance().getActiveCartId();
        if (cartId == null) {
            showError("Active cart session not found.");
            placeOrderButton.setDisable(true);
            return;
        }

        setLoading(true);
        clearError();

        UiUtils.runAsync(
                () -> cartApi.getCartItems(cartId),
                items -> {
                    setLoading(false);
                    checkoutItemsTable.setItems(FXCollections.observableArrayList(items));

                    int totalQty = items.stream().mapToInt(CartItemDto::getQuantity).sum();
                    double grandTotal = items.stream().mapToDouble(CartItemDto::getSubtotal).sum();

                    summaryItemsCountLabel.setText(totalQty + " items");
                    summaryTotalAmountLabel.setText(CurrencyFormatter.format(grandTotal));

                    if (items.isEmpty()) {
                        showError("Cart is empty. Add products before placing an order.");
                        placeOrderButton.setDisable(true);
                    } else {
                        placeOrderButton.setDisable(false);
                    }
                },
                throwable -> {
                    setLoading(false);
                    showError("Failed to load checkout details: " + throwable.getMessage());
                    placeOrderButton.setDisable(true);
                }
        );
    }

    @FXML
    private void handlePlaceOrder() {
        Long cartId = UserSession.getInstance().getActiveCartId();
        if (cartId == null) {
            showError("Cannot place order: No active cart found.");
            return;
        }

        // Prevent duplicate requests by disabling button
        placeOrderButton.setDisable(true);
        backToCartButton.setDisable(true);
        setLoading(true);
        clearError();

        UiUtils.runAsync(
                () -> checkoutApi.checkout(cartId),
                confirmedOrder -> {
                    setLoading(false);
                    // Reset session cart count since backend cleared cart
                    UserSession.getInstance().setCartItemCount(0);

                    // Navigate to Order Confirmation screen
                    NavigationManager.getInstance().showOrderConfirmation(confirmedOrder);
                },
                throwable -> {
                    setLoading(false);
                    placeOrderButton.setDisable(false);
                    backToCartButton.setDisable(false);

                    String msg = throwable.getMessage();
                    if (msg != null && msg.toLowerCase().contains("insufficient stock")) {
                        msg = "Order failed: One or more items in your cart have insufficient stock.";
                    } else if (msg != null && msg.toLowerCase().contains("cart is empty")) {
                        msg = "Order failed: Your cart is empty.";
                    }
                    showError(msg);
                }
        );
    }

    @FXML
    private void backToCart() {
        NavigationManager.getInstance().showCart();
    }

    private void setLoading(boolean loading) {
        progressIndicator.setVisible(loading);
        progressIndicator.setManaged(loading);
    }

    private void showError(String message) {
        errorLabel.setText(message);
        errorLabel.setVisible(true);
        errorLabel.setManaged(true);
    }

    private void clearError() {
        errorLabel.setText("");
        errorLabel.setVisible(false);
        errorLabel.setManaged(false);
    }
}
