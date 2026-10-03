package com.shopx.frontend.navigation;

import com.shopx.frontend.controller.OrderConfirmationController;
import com.shopx.frontend.model.OrderDto;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.stage.Stage;

import java.io.IOException;
import java.net.URL;

/**
 * Central navigation controller managing transitions between screens on the primary Stage.
 */
public class NavigationManager {

    private static NavigationManager instance;
    private Stage primaryStage;

    private NavigationManager() {
    }

    public static synchronized NavigationManager getInstance() {
        if (instance == null) {
            instance = new NavigationManager();
        }
        return instance;
    }

    public void init(Stage stage) {
        this.primaryStage = stage;
        this.primaryStage.setTitle("ShopX – E-Commerce Order & Inventory Management");
        this.primaryStage.setMinWidth(960);
        this.primaryStage.setMinHeight(640);
    }

    public void showRoleSelect() {
        loadView("/com/shopx/frontend/views/RoleSelectView.fxml", "ShopX – Select Portal", null);
    }

    public void showCustomerLogin() {
        loadView("/com/shopx/frontend/views/LoginView.fxml", "ShopX – Customer Sign In", controller -> {
            if (controller instanceof com.shopx.frontend.controller.LoginController loginController) {
                loginController.setTargetRole("CUSTOMER");
            }
        });
    }

    public void showAdminLogin() {
        loadView("/com/shopx/frontend/views/LoginView.fxml", "ShopX – Admin Sign In", controller -> {
            if (controller instanceof com.shopx.frontend.controller.LoginController loginController) {
                loginController.setTargetRole("ADMIN");
            }
        });
    }

    public void showLogin() {
        showRoleSelect();
    }

    public void showAdmin() {
        loadView("/com/shopx/frontend/views/AdminView.fxml", "ShopX – Admin & Seller Portal", null);
    }

    public void showCatalog() {
        loadView("/com/shopx/frontend/views/CatalogView.fxml", "ShopX – Product Catalog", null);
    }

    public void showCart() {
        loadView("/com/shopx/frontend/views/CartView.fxml", "ShopX – Shopping Cart", null);
    }

    public void showCheckout() {
        loadView("/com/shopx/frontend/views/CheckoutView.fxml", "ShopX – Checkout", null);
    }

    public void showOrderConfirmation(OrderDto order) {
        loadView("/com/shopx/frontend/views/OrderConfirmationView.fxml", "ShopX – Order Confirmation", controller -> {
            if (controller instanceof OrderConfirmationController confirmationController) {
                confirmationController.setOrder(order);
            }
        });
    }

    @FunctionalInterface
    public interface ControllerInitializer {
        void initialize(Object controller);
    }

    private void loadView(String fxmlPath, String title, ControllerInitializer initializer) {
        try {
            URL url = getClass().getResource(fxmlPath);
            if (url == null) {
                throw new IOException("Cannot find FXML view: " + fxmlPath);
            }

            FXMLLoader loader = new FXMLLoader(url);
            Parent root = loader.load();

            if (initializer != null) {
                initializer.initialize(loader.getController());
            }

            Scene scene = primaryStage.getScene();
            if (scene == null) {
                scene = new Scene(root, 1080, 720);
                primaryStage.setScene(scene);
            } else {
                scene.setRoot(root);
            }

            // Apply modern stylesheet
            URL cssUrl = getClass().getResource("/com/shopx/frontend/css/styles.css");
            if (cssUrl != null) {
                String css = cssUrl.toExternalForm();
                if (!scene.getStylesheets().contains(css)) {
                    scene.getStylesheets().add(css);
                }
            }

            primaryStage.setTitle(title);
            primaryStage.show();

        } catch (Exception e) {
            e.printStackTrace();
            System.err.println("Failed to navigate to view: " + fxmlPath + " - " + e.getMessage());
        }
    }
}
