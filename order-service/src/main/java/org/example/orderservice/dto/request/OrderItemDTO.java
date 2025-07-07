package org.example.orderservice.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderItemDTO {
    private int id;
    private int productId;
    private int quantity;
    private BigDecimal price;
    private BigDecimal totalPrice;
}
