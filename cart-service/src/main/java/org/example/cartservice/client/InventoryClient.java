package org.example.cartservice.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "inventory-service",url = "http://localhost:7777")
public interface InventoryClient {
    @GetMapping("/api/inventory/has-sufficient-stock")
    boolean hasSufficientStock(@RequestParam  int productId, @RequestParam  int quantity);

}
