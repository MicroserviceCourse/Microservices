package org.example.inventoryservice.dto.request;

import lombok.Data;

@Data
public class InventoryRequest {
    private int productId;
    private int quantity;
}
