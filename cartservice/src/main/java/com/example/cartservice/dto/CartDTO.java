package com.example.cartservice.dto;

import org.springframework.beans.factory.annotation.Autowired;

import com.example.cartservice.client.ProductServiceClient;
import com.example.cartservice.entity.Cart;

import lombok.Data;

@Data
public class CartDTO {
    private Integer userId;
    private Integer productId;
    private Integer quantity;
    private String productName;
   
}
