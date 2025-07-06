package org.example.inventoryservice.controller;

import lombok.RequiredArgsConstructor;
import org.example.inventoryservice.dto.RequestResponse;
import org.example.inventoryservice.dto.request.InventoryRequest;
import org.example.inventoryservice.dto.response.InventoryResponse;
import org.example.inventoryservice.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/inventory")
@RequiredArgsConstructor
public class InventoryController {
    @Autowired
    private InventoryService inventoryService;
    @GetMapping("/{idProduct}")
    public ResponseEntity<?>isInStock(@PathVariable int idProduct) {
        try {
            InventoryResponse inventoryResponse=inventoryService.checkStock(idProduct);
            return ResponseEntity.ok(new RequestResponse<>(inventoryResponse,"Lấy hàng tồn kho thành công"));
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new RequestResponse("Đã xảy ra lỗi hệ thống"));
        }
    }
    @PostMapping("/update")
    public ResponseEntity<?> updateInventory(@RequestBody InventoryRequest inventoryRequest) {
        try {
            inventoryService.updateStock(inventoryRequest.getProductId(), inventoryRequest.getQuantity());
            return ResponseEntity.ok(new RequestResponse("cập nhật kho hàng"));
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new RequestResponse(e.getMessage()));
        }
    }
    @GetMapping("/has-sufficient-stock")
    public boolean hasSufficientStock(@RequestParam int productId,@RequestParam int quantity) {
       return inventoryService.hasSufficientStock(productId,quantity);
    }
    @PostMapping("/restore")
    public ResponseEntity<?> restoreInventory(@RequestBody InventoryRequest inventoryRequest) {
        try {
            inventoryService.restoreStock(inventoryRequest.getProductId(), inventoryRequest.getQuantity());
            return ResponseEntity.ok(new RequestResponse("Thêm hoặc tạo sản phẩm trong kho"));
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new RequestResponse(e.getMessage()));
        }
    }
}
