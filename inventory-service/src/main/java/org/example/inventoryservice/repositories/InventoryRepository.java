package org.example.inventoryservice.repositories;

import org.example.inventoryservice.entity.Inventory;
import org.example.inventoryservice.generic.IRepository;

import java.util.Optional;
import java.util.UUID;

public interface InventoryRepository extends IRepository<Inventory, UUID> {
    Optional<Inventory>findByProductId(int productId);
}
