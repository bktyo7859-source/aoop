package com.shopx.frontend.controller;

import com.shopx.frontend.api.OrderApi;
import com.shopx.frontend.model.OrderDto;
import com.shopx.frontend.model.OrderItemDto;
import com.shopx.frontend.navigation.NavigationManager;
import com.shopx.frontend.util.CurrencyFormatter;
import com.shopx.frontend.util.UiUtils;
import javafx.beans.property.SimpleObjectProperty;
import javafx.beans.property.SimpleStringProperty;
import javafx.collections.FXCollections;
import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.TableColumn;
import javafx.scene.control.TableView;

import java.util.List;

public class OrderConfirmationController {

    @FXML
    private Label orderIdLabel;

    @FXML
    private Label customerNameLabel;

    @FXML
    private Label orderStatusLabel;

    @FXML
    private Label totalAmountLabel;

    @FXML
    private TableView<OrderItemDto> orderItemsTable;

    @FXML
    private TableColumn<OrderItemDto, String> itemCol;

    @FXML
    private TableColumn<OrderItemDto, Integer> qtyCol;

    @FXML
    private TableColumn<OrderItemDto, String> priceCol;

    @FXML
    private TableColumn<OrderItemDto, String> subtotalCol;

    @FXML
    private Button continueShoppingButton;

    private final OrderApi orderApi = new OrderApi();

    @FXML
    public void initialize() {
        setupTableColumns();
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

        priceCol.setCellValueFactory(cellData ->
                new SimpleStringProperty(CurrencyFormatter.format(cellData.getValue().getPrice()))
        );

        subtotalCol.setCellValueFactory(cellData ->
                new SimpleStringProperty(CurrencyFormatter.format(cellData.getValue().getSubtotal()))
        );
    }

    public void setOrder(OrderDto order) {
        if (order == null) return;

        orderIdLabel.setText("Order #" + order.getId());
        orderStatusLabel.setText(order.getStatus());

        if (order.getCustomer() != null && order.getCustomer().getName() != null) {
            customerNameLabel.setText(order.getCustomer().getName());
        } else {
            customerNameLabel.setText("Valued Customer");
        }

        totalAmountLabel.setText(CurrencyFormatter.format(order.getTotalAmount()));

        // Load items placed in this order from the backend
        if (order.getId() != null) {
            UiUtils.runAsync(
                    () -> orderApi.getOrderItems(order.getId()),
                    items -> orderItemsTable.setItems(FXCollections.observableArrayList(items)),
                    throwable -> System.err.println("Could not load order items: " + throwable.getMessage())
            );
        }
    }

    @FXML
    private void continueShopping() {
        NavigationManager.getInstance().showCatalog();
    }
}
