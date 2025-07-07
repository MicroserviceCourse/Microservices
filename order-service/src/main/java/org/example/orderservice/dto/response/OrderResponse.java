package org.example.orderservice.dto.response;

import lombok.Data;
import org.example.orderservice.Enum.OrderStatus;

import java.math.BigDecimal;

@Data
public class OrderResponse {
    private int id;
    private int userId;
    private OrderStatus status;
    private BigDecimal shippingFee;
    private BigDecimal totalAmount;
}
