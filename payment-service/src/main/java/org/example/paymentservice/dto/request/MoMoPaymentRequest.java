package org.example.paymentservice.dto.request;

import lombok.Data;

@Data
public class MoMoPaymentRequest {
    private Long amount;
    private String orderId;
    private String orderInfo;
}
