package org.webvibe.cart_service.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartResponse {

    private BigDecimal totalPrice;

    private List<CartItemResponse> cartItems;
}
