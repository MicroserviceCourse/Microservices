package org.example.cartservice.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

@FeignClient(name = "inventory-service",url = "http://localhost:7777")
public interface InventoryClient {
    @GetMapping("/api/inventory/has-sufficient-stock")
    boolean hasSufficientStock(int productId, int quantity);

}
