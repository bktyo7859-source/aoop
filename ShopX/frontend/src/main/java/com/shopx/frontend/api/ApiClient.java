package com.shopx.frontend.api;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;

/**
 * Base HTTP API client using Java 21 HttpClient and Jackson JSON processing.
 */
public class ApiClient {

    private static final String DEFAULT_BASE_URL = "http://localhost:8080";
    private static ApiClient instance;

    private final String baseUrl;
    private final HttpClient httpClient;
    private final ObjectMapper objectMapper;

    public ApiClient() {
        this(DEFAULT_BASE_URL);
    }

    public ApiClient(String baseUrl) {
        this.baseUrl = baseUrl.endsWith("/") ? baseUrl.substring(0, baseUrl.length() - 1) : baseUrl;
        this.httpClient = HttpClient.newBuilder()
                .connectTimeout(Duration.ofSeconds(5))
                .build();
        this.objectMapper = new ObjectMapper()
                .registerModule(new JavaTimeModule())
                .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
    }

    public static synchronized ApiClient getInstance() {
        if (instance == null) {
            instance = new ApiClient();
        }
        return instance;
    }

    public ObjectMapper getObjectMapper() {
        return objectMapper;
    }

    public <T> T get(String path, Class<T> responseType) throws ApiException {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(baseUrl + path))
                .timeout(Duration.ofSeconds(10))
                .header("Accept", "application/json")
                .GET()
                .build();

        return sendRequest(request, responseType);
    }

    public <T> T get(String path, TypeReference<T> typeRef) throws ApiException {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(baseUrl + path))
                .timeout(Duration.ofSeconds(10))
                .header("Accept", "application/json")
                .GET()
                .build();

        return sendRequest(request, typeRef);
    }

    public <T> T post(String path, Object body, Class<T> responseType) throws ApiException {
        try {
            String json = body != null ? objectMapper.writeValueAsString(body) : "";
            HttpRequest.Builder builder = HttpRequest.newBuilder()
                    .uri(URI.create(baseUrl + path))
                    .timeout(Duration.ofSeconds(10))
                    .header("Accept", "application/json")
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(json));

            return sendRequest(builder.build(), responseType);
        } catch (IOException e) {
            throw new ApiException("Failed to serialize request body: " + e.getMessage(), e);
        }
    }

    public <T> T post(String path, Object body, TypeReference<T> typeRef) throws ApiException {
        try {
            String json = body != null ? objectMapper.writeValueAsString(body) : "";
            HttpRequest.Builder builder = HttpRequest.newBuilder()
                    .uri(URI.create(baseUrl + path))
                    .timeout(Duration.ofSeconds(10))
                    .header("Accept", "application/json")
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(json));

            return sendRequest(builder.build(), typeRef);
        } catch (IOException e) {
            throw new ApiException("Failed to serialize request body: " + e.getMessage(), e);
        }
    }

    public void delete(String path) throws ApiException {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(baseUrl + path))
                .timeout(Duration.ofSeconds(10))
                .header("Accept", "application/json")
                .DELETE()
                .build();

        try {
            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
            int code = response.statusCode();
            if (code >= 400) {
                throw buildApiException(code, response.body());
            }
        } catch (IOException | InterruptedException e) {
            if (e instanceof InterruptedException) {
                Thread.currentThread().interrupt();
            }
            throw new ApiException("Backend connection error: Could not reach " + baseUrl + ". Is the Spring Boot server running?", e);
        }
    }

    private <T> T sendRequest(HttpRequest request, Class<T> responseType) throws ApiException {
        try {
            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
            int code = response.statusCode();

            if (code >= 200 && code < 300) {
                if (responseType == Void.class || response.body() == null || response.body().isBlank()) {
                    return null;
                }
                return objectMapper.readValue(response.body(), responseType);
            } else {
                throw buildApiException(code, response.body());
            }
        } catch (IOException | InterruptedException e) {
            if (e instanceof InterruptedException) {
                Thread.currentThread().interrupt();
            }
            throw new ApiException("Backend connection error: Could not reach " + baseUrl + ". Is the Spring Boot server running?", e);
        }
    }

    private <T> T sendRequest(HttpRequest request, TypeReference<T> typeRef) throws ApiException {
        try {
            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
            int code = response.statusCode();

            if (code >= 200 && code < 300) {
                if (response.body() == null || response.body().isBlank()) {
                    return null;
                }
                return objectMapper.readValue(response.body(), typeRef);
            } else {
                throw buildApiException(code, response.body());
            }
        } catch (IOException | InterruptedException e) {
            if (e instanceof InterruptedException) {
                Thread.currentThread().interrupt();
            }
            throw new ApiException("Backend connection error: Could not reach " + baseUrl + ". Is the Spring Boot server running?", e);
        }
    }

    private ApiException buildApiException(int code, String body) {
        String message = "HTTP error " + code;
        if (body != null && !body.isBlank()) {
            try {
                JsonNode node = objectMapper.readTree(body);
                if (node.has("message") && !node.get("message").asText().isBlank()) {
                    message = node.get("message").asText();
                } else if (node.has("error") && !node.get("error").asText().isBlank()) {
                    message = node.get("error").asText();
                }
            } catch (Exception ignored) {
                // If not JSON, use body text if brief
                if (body.length() < 120) {
                    message = body.trim();
                }
            }
        }
        return new ApiException(code, message, body);
    }
}
