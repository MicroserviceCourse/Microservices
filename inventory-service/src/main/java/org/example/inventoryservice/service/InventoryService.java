package org.example.inventoryservice.service;

import org.example.inventoryservice.dto.response.InventoryResponse;
import org.example.inventoryservice.entity.Inventory;

public interface InventoryService {
    InventoryResponse checkStock(int productId);
    void updateStock(int productId, int quantity);
    void restoreStock(int productId, int quantity);
    /**
     * Kiểm tra xem sản phẩm có đủ số lượng tồn kho không.
     *
     * @param productId ID sản phẩm
     * @param quantity Số lượng cần kiểm tra
     * @return true nếu tồn kho đủ, ngược lại false
     */
    boolean hasSufficientStock(int productId, int quantity);
}
