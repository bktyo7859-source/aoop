package com.shopx.frontend.model;

import javafx.beans.property.IntegerProperty;
import javafx.beans.property.SimpleIntegerProperty;

/**
 * Singleton managing client-side session state for the active user.
 */
public class UserSession {

    private static UserSession instance;

    private CustomerDto currentCustomer;
    private Long activeCartId;
    private final IntegerProperty cartItemCount = new SimpleIntegerProperty(0);

    private UserSession() {
    }

    public static synchronized UserSession getInstance() {
        if (instance == null) {
            instance = new UserSession();
        }
        return instance;
    }

    public void startSession(CustomerDto customer, Long cartId) {
        this.currentCustomer = customer;
        this.activeCartId = cartId;
        this.cartItemCount.set(0);
    }

    public void clearSession() {
        this.currentCustomer = null;
        this.activeCartId = null;
        this.cartItemCount.set(0);
    }

    public boolean isLoggedIn() {
        return currentCustomer != null;
    }

    public boolean isAdmin() {
        return currentCustomer != null && "ADMIN".equalsIgnoreCase(currentCustomer.getRole());
    }

    public CustomerDto getCurrentCustomer() {
        return currentCustomer;
    }

    public void setCurrentCustomer(CustomerDto currentCustomer) {
        this.currentCustomer = currentCustomer;
    }

    public Long getActiveCartId() {
        return activeCartId;
    }

    public void setActiveCartId(Long activeCartId) {
        this.activeCartId = activeCartId;
    }

    public int getCartItemCount() {
        return cartItemCount.get();
    }

    public void setCartItemCount(int count) {
        this.cartItemCount.set(count);
    }

    public IntegerProperty cartItemCountProperty() {
        return cartItemCount;
    }
}
