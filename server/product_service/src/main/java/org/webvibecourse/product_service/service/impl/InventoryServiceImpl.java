package org.webvibecourse.product_service.service.impl;

import lombok.RequiredArgsConstructor;
import org.example.commonutils.Enum.InventoryAction;
import org.springframework.stereotype.Service;
import org.webvibecourse.product_service.dto.request.InventoryRequest;
import org.webvibecourse.product_service.dto.request.ProductInventoryRequest;
import org.webvibecourse.product_service.entity.Inventory;
import org.webvibecourse.product_service.entity.InventoryLog;
import org.webvibecourse.product_service.repository.InventoryLogRepository;
import org.webvibecourse.product_service.repository.InventoryRepository;
import org.webvibecourse.product_service.repository.ProductRepository;
import org.webvibecourse.product_service.service.InventoryService;
@Service
@RequiredArgsConstructor
public class InventoryServiceImpl implements InventoryService {

    private final ProductRepository productRepository;

    private final InventoryRepository inventoryRepository;

    private final InventoryLogRepository inventoryLogRepository;
    @Override
    public void save(InventoryRequest request) {
        for (ProductInventoryRequest req : request.getProductInventories()){
            if(!productRepository.existsById(req.getProductId())){
                throw new IllegalArgumentException(
                        "Product Not found with id: " + req.getProductId()
                );
            }
            Inventory inventory = inventoryRepository
                    .findById(req.getProductId())
                    .orElseGet(()->{
                        Inventory inv = new Inventory();
                        inv.setProductId(req.getProductId());
                        inv.setQuantity(0);
                        return inv;
                    });
            inventory.setQuantity(
                    inventory.getQuantity()+req.getQuantity()
            );
            inventoryRepository.save(inventory);

            InventoryLog log = new InventoryLog();
            log.setProductId(req.getProductId());
            log.setChargeQuantity(req.getQuantity());
            log.setNote(request.getNote());
            log.setAction(InventoryAction.IMPORT.getValue());

            inventoryLogRepository.save(log);
        }
    }
}
