package org.webvibecourse.product_service.controller;

import lombok.RequiredArgsConstructor;
import org.example.commonutils.api.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.webvibecourse.product_service.dto.request.InventoryRequest;
import org.webvibecourse.product_service.service.InventoryService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/inventories")
public class InventoryController {

    private final InventoryService service;

    @PostMapping
    public ResponseEntity<ApiResponse<Void>> ImportInventory(
            @RequestBody InventoryRequest request
    ) {
        service.save(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Inventory created successfully"));
    }

}
