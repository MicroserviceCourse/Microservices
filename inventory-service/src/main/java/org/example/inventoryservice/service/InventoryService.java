package org.example.inventoryservice.service;

import org.example.inventoryservice.dto.response.InventoryResponse;
import org.example.inventoryservice.entity.Inventory;

public interface InventoryService {
    InventoryResponse checkStock(int productId);
    void updateStock(int productId, int quantity);
    void restoreStock(int productId, int quantity);
}
