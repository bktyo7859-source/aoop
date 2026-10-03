package com.shopx.frontend.util;

import javafx.application.Platform;
import javafx.scene.control.Alert;
import javafx.scene.control.ButtonType;

import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.function.Consumer;

/**
 * UI threading and alert utility to prevent blocking the JavaFX Application Thread during HTTP requests.
 */
public class UiUtils {

    private static final ExecutorService EXECUTOR = Executors.newFixedThreadPool(4, runnable -> {
        Thread thread = new Thread(runnable);
        thread.setDaemon(true);
        thread.setName("ShopX-Async-Worker");
        return thread;
    });

    /**
     * Executes a background task asynchronously and delivers the result or error back to the JavaFX Application Thread.
     */
    public static <T> void runAsync(Callable<T> task, Consumer<T> onSuccess, Consumer<Throwable> onError) {
        EXECUTOR.submit(() -> {
            try {
                T result = task.call();
                Platform.runLater(() -> {
                    if (onSuccess != null) {
                        onSuccess.accept(result);
                    }
                });
            } catch (Throwable throwable) {
                Platform.runLater(() -> {
                    if (onError != null) {
                        onError.accept(throwable);
                    }
                });
            }
        });
    }

    public static void runAsync(Runnable task, Runnable onSuccess, Consumer<Throwable> onError) {
        EXECUTOR.submit(() -> {
            try {
                task.run();
                Platform.runLater(() -> {
                    if (onSuccess != null) {
                        onSuccess.run();
                    }
                });
            } catch (Throwable throwable) {
                Platform.runLater(() -> {
                    if (onError != null) {
                        onError.accept(throwable);
                    }
                });
            }
        });
    }

    public static void showErrorAlert(String title, String message) {
        Alert alert = new Alert(Alert.AlertType.ERROR, message, ButtonType.OK);
        alert.setTitle(title);
        alert.setHeaderText(null);
        alert.showAndWait();
    }

    public static void showInfoAlert(String title, String message) {
        Alert alert = new Alert(Alert.AlertType.INFORMATION, message, ButtonType.OK);
        alert.setTitle(title);
        alert.setHeaderText(null);
        alert.showAndWait();
    }
}
