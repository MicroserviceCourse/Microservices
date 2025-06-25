package org.example.inventoryservice.service.impl;

import org.example.inventoryservice.dto.response.InventoryResponse;
import org.example.inventoryservice.entity.Inventory;
import org.example.inventoryservice.repositories.InventoryRepository;
import org.example.inventoryservice.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class InventoryServiceImpl implements InventoryService {
   @Autowired
    private InventoryRepository inventoryRepository;
    @Override
    public InventoryResponse checkStock(int productId) {
        Inventory inventory=inventoryRepository.findByProductId(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        return new InventoryResponse(productId,inventory.getQuantity()>=0,inventory.getQuantity());
    }

    @Override
    public void updateStock(int productId, int quantity) {
        Inventory inventory=inventoryRepository.findByProductId(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        int updatedQuantity=inventory.getQuantity()-quantity;
        if (updatedQuantity < 0) throw new RuntimeException("Insufficient stock");
        inventory.setQuantity(updatedQuantity);
        inventory.setUpdatedAt(Instant.now());
        inventoryRepository.save(inventory);
    }

    @Override
    public void restoreStock(int productId, int quantity) {
        Inventory inventory = inventoryRepository.findByProductId(productId)
                .orElseGet(() -> {
                    // Nếu chưa có thì tạo mới bản ghi
                    Inventory newInventory = new Inventory();
                    newInventory.setProductId(productId);
                    newInventory.setQuantity(0); // hoặc quantity nếu muốn cộng ngay
                    newInventory.setMinThreshold(5); // hoặc giá trị mặc định khác
                    newInventory.setUpdatedAt(Instant.now());
                    return newInventory;
                });

        inventory.setQuantity(inventory.getQuantity() + quantity);
        inventory.setUpdatedAt(Instant.now());
        inventoryRepository.save(inventory);
    }
}
