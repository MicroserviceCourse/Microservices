package org.webvibe.cart_service.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartItemRequest {

    private Long productId;

    private Integer quantity;

    private BigDecimal price;
}
