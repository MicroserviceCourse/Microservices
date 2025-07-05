package org.example.orderservice.dto.request;

import lombok.Data;
import org.example.orderservice.Enum.OrderStatus;

import java.math.BigDecimal;
import java.util.List;

@Data
public class OrderDTO {
    private int id;
    private int userId;
    private OrderStatus status;
    private BigDecimal shippingFee;
    private BigDecimal totalAmount;
    private List<OrderItemDTO> orderItems;


}
