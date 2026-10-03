package com.shopx.frontend.api;

import com.shopx.frontend.model.LoginRequestDto;
import com.shopx.frontend.model.LoginResponseDto;

public class AuthApi {

    private final ApiClient apiClient;

    public AuthApi() {
        this(ApiClient.getInstance());
    }

    public AuthApi(ApiClient apiClient) {
        this.apiClient = apiClient;
    }

    public LoginResponseDto login(String email, String password) throws ApiException {
        LoginRequestDto request = new LoginRequestDto(email, password);
        return apiClient.post("/api/auth/login", request, LoginResponseDto.class);
    }
}
