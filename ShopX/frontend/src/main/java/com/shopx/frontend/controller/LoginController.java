package com.shopx.frontend.controller;

import com.shopx.frontend.api.ApiException;
import com.shopx.frontend.api.AuthApi;
import com.shopx.frontend.api.CartApi;
import com.shopx.frontend.model.CartDto;
import com.shopx.frontend.model.CustomerDto;
import com.shopx.frontend.model.LoginResponseDto;
import com.shopx.frontend.model.UserSession;
import com.shopx.frontend.navigation.NavigationManager;
import com.shopx.frontend.util.UiUtils;
import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.PasswordField;
import javafx.scene.control.ProgressIndicator;
import javafx.scene.control.TextField;

public class LoginController {

    @FXML
    private Label roleBadgeLabel;

    @FXML
    private Label portalSubtitleLabel;

    @FXML
    private TextField emailField;

    @FXML
    private PasswordField passwordField;

    @FXML
    private Button loginButton;

    @FXML
    private ProgressIndicator progressIndicator;

    @FXML
    private Label errorLabel;

    @FXML
    private Label hintTitleLabel;

    @FXML
    private Label hintCredsLabel;

    private final AuthApi authApi = new AuthApi();
    private final CartApi cartApi = new CartApi();

    private String targetRole = "CUSTOMER";

    @FXML
    public void initialize() {
        errorLabel.setVisible(false);
        errorLabel.setManaged(false);
        progressIndicator.setVisible(false);
        progressIndicator.setManaged(false);
    }

    public void setTargetRole(String role) {
        this.targetRole = role != null ? role.toUpperCase() : "CUSTOMER";
        applyRoleUi();
    }

    private void applyRoleUi() {
        if ("ADMIN".equalsIgnoreCase(targetRole)) {
            roleBadgeLabel.setText("ADMIN & SELLER LOGIN");
            roleBadgeLabel.setStyle("-fx-background-color: #dbeafe; -fx-text-fill: #1e40af;");
            portalSubtitleLabel.setText("Store Management & Inventory Access");
            loginButton.setText("Sign In to Admin Panel");
            loginButton.getStyleClass().removeAll("btn-primary");
            if (!loginButton.getStyleClass().contains("btn-admin")) {
                loginButton.getStyleClass().add("btn-admin");
            }
            hintTitleLabel.setText("Administrator Demo Account");
            hintCredsLabel.setText("Email: admin@shopx.local  |  Pass: Admin@123");
            emailField.setText("admin@shopx.local");
            passwordField.setText("Admin@123");
        } else {
            roleBadgeLabel.setText("CUSTOMER LOGIN");
            roleBadgeLabel.setStyle("-fx-background-color: #ede9fe; -fx-text-fill: #6d28d9;");
            portalSubtitleLabel.setText("Customer Order & Cart Access");
            loginButton.setText("Sign In to ShopX");
            loginButton.getStyleClass().removeAll("btn-admin");
            if (!loginButton.getStyleClass().contains("btn-primary")) {
                loginButton.getStyleClass().add("btn-primary");
            }
            hintTitleLabel.setText("Customer Demo Account");
            hintCredsLabel.setText("Email: shashank@shopx.local  |  Pass: ShopX@123");
            emailField.setText("shashank@shopx.local");
            passwordField.setText("ShopX@123");
        }
    }

    @FXML
    private void handleBackToRoleSelect() {
        NavigationManager.getInstance().showRoleSelect();
    }

    @FXML
    private void handleLogin() {
        String email = emailField.getText() != null ? emailField.getText().trim() : "";
        String password = passwordField.getText() != null ? passwordField.getText() : "";

        if (email.isEmpty() || password.isEmpty()) {
            showError("Please enter both email and password.");
            return;
        }

        setLoading(true);
        clearError();

        UiUtils.runAsync(
                () -> {
                    // Authenticate with existing backend API
                    LoginResponseDto loginResponse = authApi.login(email, password);

                    // Verify role matching if logging into Admin
                    String userRole = loginResponse.getRole() != null ? loginResponse.getRole().toUpperCase() : "CUSTOMER";
                    if ("ADMIN".equals(targetRole) && !"ADMIN".equals(userRole)) {
                        throw new ApiException("Access Denied: This account does not have Administrator privileges.");
                    }

                    // Resolve customer's cart
                    CartDto cart = cartApi.resolveCustomerCart(loginResponse.getCustomerId());

                    CustomerDto customer = new CustomerDto(
                            loginResponse.getCustomerId(),
                            loginResponse.getName(),
                            loginResponse.getEmail(),
                            loginResponse.getRole()
                    );

                    return new Object[]{customer, cart};
                },
                result -> {
                    setLoading(false);
                    CustomerDto customer = (CustomerDto) result[0];
                    CartDto cart = (CartDto) result[1];

                    // Save session state
                    UserSession.getInstance().startSession(customer, cart != null ? cart.getId() : customer.getId());

                    // Direct Admin to Admin Panel, Customer to Catalog
                    if ("ADMIN".equalsIgnoreCase(customer.getRole())) {
                        NavigationManager.getInstance().showAdmin();
                    } else {
                        NavigationManager.getInstance().showCatalog();
                    }
                },
                throwable -> {
                    setLoading(false);
                    String message = throwable.getMessage();
                    if (throwable instanceof ApiException apiEx) {
                        if (apiEx.getStatusCode() == 400 || apiEx.getStatusCode() == 401) {
                            message = "Invalid email or password. Please verify your credentials.";
                        }
                    }
                    showError(message);
                }
        );
    }

    private void setLoading(boolean loading) {
        loginButton.setDisable(loading);
        emailField.setDisable(loading);
        passwordField.setDisable(loading);
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
