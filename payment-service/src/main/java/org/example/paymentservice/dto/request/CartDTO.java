package org.example.paymentservice.dto.request;

import lombok.Data;

import java.util.List;

@Data
public class CartDTO {
private int id;
private List<CartItemDTO> cartItems;
private Double totalPrice;
}
