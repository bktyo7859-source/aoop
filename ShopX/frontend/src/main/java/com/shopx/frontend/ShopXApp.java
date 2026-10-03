package com.shopx.frontend;

import com.shopx.frontend.navigation.NavigationManager;
import javafx.application.Application;
import javafx.stage.Stage;

/**
 * ShopX JavaFX Desktop Application Entry Point.
 */
public class ShopXApp extends Application {

    @Override
    public void start(Stage primaryStage) {
        // Initialize central navigation manager
        NavigationManager navigation = NavigationManager.getInstance();
        navigation.init(primaryStage);

        // Start with Login Screen
        navigation.showLogin();
    }

    public static void main(String[] args) {
        launch(args);
    }
}
