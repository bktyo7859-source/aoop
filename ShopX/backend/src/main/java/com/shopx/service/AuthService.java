package com.shopx.service;

import com.shopx.dto.LoginRequest;
import com.shopx.dto.LoginResponse;
import com.shopx.model.Customer;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final CustomerService customerService;

    public AuthService(CustomerService customerService) {
        this.customerService = customerService;
    }

    public LoginResponse login(LoginRequest request) {

        Customer customer = customerService
        .getByEmail(request.getEmail())
        .orElseThrow(() ->
                new RuntimeException("Invalid email or password"));

        if (!customer.getPassword().equals(request.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        return new LoginResponse(
                customer.getId(),
                customer.getName(),
                customer.getEmail(),
                customer.getRole(),
                "Login successful"
        );
    }
}