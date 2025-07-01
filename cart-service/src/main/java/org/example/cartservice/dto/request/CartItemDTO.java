package org.example.cartservice.dto.request;

import lombok.Data;

@Data
public class CartItemDTO {
    private int id;
    private int quantity;
    private Double price;
    private String productName;
}
