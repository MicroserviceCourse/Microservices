package org.example.orderservice.dto.request;

import lombok.Data;

@Data
public class InventoryRequest {
    private int productId;
    private int quantity;
}
