package org.example.orderservice.dto.request;

import lombok.Getter;

@Getter
public class FindOrderRequest {
    private int userId;

    private int productId;
}
