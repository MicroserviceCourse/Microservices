package org.example.paymentservice.dto.request;

import lombok.Data;

@Data
public class PaypalPaymentRequest {
    private String currency;
    private double total;
    private String method;
    private String intent;
    private String description;
}
