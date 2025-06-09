package org.example.product_service.controller;

import lombok.RequiredArgsConstructor;
import org.example.product_service.Repository.ProductVariantRepository;
import org.example.product_service.dto.RequestResponse;
import org.example.product_service.dto.request.ProductVariantDTO;
import org.example.product_service.dto.response.PageResponse;
import org.example.product_service.entity.ProductVariant;
import org.example.product_service.exception.ErrorHandler;
import org.example.product_service.exception.ExceptionResponse;
import org.example.product_service.service.ProductVariantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/product-variant")
@RequiredArgsConstructor
public class ProductVariantController {
    @Autowired
    private ProductVariantService productVariantService;

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody ProductVariantDTO productVariantDTO) {
        try {
            productVariantService.create(productVariantDTO);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new RequestResponse("Product Variant created successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new RequestResponse("Đã xảy ra lỗi hệ thống"));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> get(@PathVariable int id) {
        try {
            ProductVariant productVariant = productVariantService.findById(id);
            ProductVariantDTO productVariantDTO = productVariantService.todo(productVariant);
            return ResponseEntity.ok(new RequestResponse(productVariantDTO, "Lấy thông tin product variant thành công"));
        } catch (ErrorHandler e) {
            return ResponseEntity.status(e.getStatus()).body(new RequestResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new RequestResponse("Đã xảy ra lỗi hệ thống"));
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAll(@RequestParam(defaultValue = "0") int page,
                                    @RequestParam(defaultValue = "10") int size) {
        try {
            Page<ProductVariant> productVariantPage = productVariantService.getAll(page, size);
            Page<ProductVariantDTO> dtoPage = productVariantPage.map(productVariantService::todo);
            PageResponse<ProductVariantDTO> response = new PageResponse<>(dtoPage);
            return ResponseEntity.ok(new RequestResponse(response, "Lấy danh sách product variant"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ExceptionResponse("Lỗi khi lấy product variant:" + e.getMessage()));
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable int id, @RequestBody ProductVariantDTO productVariantDTO) {
        try {
            productVariantService.update(id, productVariantDTO);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new RequestResponse("Product Variant updated successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new RequestResponse("Đã xảy ra lỗi hệ thống"));
        }
    }

}
