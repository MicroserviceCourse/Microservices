package org.example.orderservice.client;

import org.example.orderservice.dto.RequestResponse;
import org.example.orderservice.dto.request.InventoryRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "inventory-service",url = "http://localhost:7777")
public interface InventoryClient {
    RequestResponse<?>updateInventory(@RequestBody InventoryRequest inventoryRequest);
}
