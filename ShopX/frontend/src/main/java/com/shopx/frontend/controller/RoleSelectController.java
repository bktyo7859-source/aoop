package com.shopx.frontend.controller;

import com.shopx.frontend.navigation.NavigationManager;
import javafx.fxml.FXML;

public class RoleSelectController {

    @FXML
    private void selectCustomerRole() {
        NavigationManager.getInstance().showCustomerLogin();
    }

    @FXML
    private void selectAdminRole() {
        NavigationManager.getInstance().showAdminLogin();
    }
}
