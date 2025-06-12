package com.example.cartservice.model;

import lombok.Data;
import java.util.ArrayList;
import java.util.List;

@Data
public class Cart {
    private String userId;
    private List<CartItem> items = new ArrayList<>();
} 