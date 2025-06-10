package org.example.product_service.controller;

import lombok.RequiredArgsConstructor;
import org.example.product_service.dto.RequestResponse;
import org.example.product_service.dto.request.CategoryDTO;
import org.example.product_service.dto.request.VariantOptionDTO;
import org.example.product_service.dto.response.PageResponse;
import org.example.product_service.entity.Category;
import org.example.product_service.entity.VariantOption;
import org.example.product_service.exception.ErrorHandler;
import org.example.product_service.exception.ExceptionResponse;
import org.example.product_service.service.VariantOptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/variant")
@RequiredArgsConstructor
public class VariantOptionController {
    @Autowired
    private VariantOptionService variantOptionService;

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody VariantOptionDTO variantOptionDTO) {
        try {
            variantOptionService.create(variantOptionDTO);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new RequestResponse("Variant Option created successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new RequestResponse("Đã xảy ra lỗi hệ thống"));
        }
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?>delete(@PathVariable int id) {
        try {
            variantOptionService.deleteVariantOptionById(id);
            return ResponseEntity.ok(new RequestResponse("Variant Option deleted successfully"));
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new RequestResponse("Đã xảy ra lỗi hệ thống"));
        }
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable int id, @RequestBody VariantOptionDTO variantOptionDTO) {
        try {
            variantOptionService.update(id, variantOptionDTO);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new RequestResponse("Variant Option updated successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new RequestResponse("Đã xảy ra lỗi hệ thống"));
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAll(@RequestParam(defaultValue = "0") int page,
                                    @RequestParam(defaultValue = "10") int size) {
        try {
            Page<VariantOption> variantOptionPage = variantOptionService.findAll(page, size);
            Page<VariantOptionDTO> dtoPage = variantOptionPage.map(variantOptionService::todo);
            PageResponse<VariantOptionDTO> response = new PageResponse<>(dtoPage);
            return ResponseEntity.ok(new RequestResponse(response, "Lấy danh sách thuộc tính sản phẩm thành công"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ExceptionResponse("Lỗi khi lấy thuộc tính sản phẩm:" + e.getMessage()));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> get(@PathVariable int id) {
        try {
            VariantOption variantOption = variantOptionService.findById(id);
            VariantOptionDTO variantOptionDTO = variantOptionService.todo(variantOption);
            return ResponseEntity.ok(new RequestResponse(variantOptionDTO, "lấy thông tin thuộc tính sản phẩm"));
        } catch (ErrorHandler e) {
            return ResponseEntity.status(e.getStatus()).body(new RequestResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new RequestResponse("Đã xảy ra lỗi hệ thống"));
        }
    }
}
