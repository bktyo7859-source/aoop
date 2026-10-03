package com.shopx.frontend.api;

public class ApiException extends Exception {

    private final int statusCode;
    private final String rawResponseBody;

    public ApiException(String message) {
        super(message);
        this.statusCode = 0;
        this.rawResponseBody = null;
    }

    public ApiException(String message, Throwable cause) {
        super(message, cause);
        this.statusCode = 0;
        this.rawResponseBody = null;
    }

    public ApiException(int statusCode, String message, String rawResponseBody) {
        super(message);
        this.statusCode = statusCode;
        this.rawResponseBody = rawResponseBody;
    }

    public int getStatusCode() {
        return statusCode;
    }

    public String getRawResponseBody() {
        return rawResponseBody;
    }

    public boolean isNetworkError() {
        return statusCode == 0;
    }

    public boolean isNotFound() {
        return statusCode == 404;
    }

    public boolean isBadRequest() {
        return statusCode == 400;
    }

    public boolean isServerError() {
        return statusCode >= 500;
    }
}
