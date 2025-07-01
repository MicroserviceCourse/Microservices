package org.example.inventoryservice.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class InventoryResponse {
    private int productId;
    private boolean isInStock;
    private int quantity;
}
