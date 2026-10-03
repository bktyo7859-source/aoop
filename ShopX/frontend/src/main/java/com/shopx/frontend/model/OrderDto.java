package com.shopx.frontend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class OrderDto {
    private Long id;
    private CustomerDto customer;
    private String status;
    private Double totalAmount;

    public OrderDto() {
    }

    public OrderDto(Long id, CustomerDto customer, String status, Double totalAmount) {
        this.id = id;
        this.customer = customer;
        this.status = status;
        this.totalAmount = totalAmount;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CustomerDto getCustomer() {
        return customer;
    }

    public void setCustomer(CustomerDto customer) {
        this.customer = customer;
    }

    public String getStatus() {
        return status != null ? status : "CONFIRMED";
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Double getTotalAmount() {
        return totalAmount != null ? totalAmount : 0.0;
    }

    public void setTotalAmount(Double totalAmount) {
        this.totalAmount = totalAmount;
    }
}
