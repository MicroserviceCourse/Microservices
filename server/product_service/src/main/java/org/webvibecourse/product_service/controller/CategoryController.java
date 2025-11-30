package org.webvibecourse.product_service.controller;

import lombok.RequiredArgsConstructor;
import org.example.commonutils.api.ApiResponse;
import org.example.commonutils.api.PageResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.webvibecourse.product_service.dto.request.CategoryRequest;
import org.webvibecourse.product_service.dto.response.CategoryResponse;
import org.webvibecourse.product_service.service.CategoryService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/categories")
public class CategoryController {

    private final CategoryService service;

    @PostMapping
    public ResponseEntity<ApiResponse<Void>> create
            (@RequestBody CategoryRequest request) {
        service.create(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Category created successfully"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> update
            (@PathVariable Long id, @RequestBody CategoryRequest request) {
        service.update(id, request);

        return ResponseEntity.ok(ApiResponse.success("Category updated successfully"));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<CategoryResponse>> getCategoryById
            (@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(service.getCategoryById(id)));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<CategoryResponse>>> getCategories
            (
                    @RequestParam(defaultValue = "1") Integer page,
                    @RequestParam(defaultValue = "5") Integer size,
                    @RequestParam(defaultValue = "id,desc") String sort,
                    @RequestParam(required = false) String filter,
                    @RequestParam(required = false) String searchField,
                    @RequestParam(required = false) String searchValue,
                    @RequestParam(defaultValue = "false") Boolean all
            ) {
        return ResponseEntity.ok(
                ApiResponse.success
                        (new PageResponse<>(
                                service.getCategories(
                                        page,
                                        size,
                                        sort,
                                        searchField,
                                        searchValue,
                                        filter,
                                        all))));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<ApiResponse<Void>> updateStatus
            (@PathVariable Long id, @RequestParam Boolean staus) {
        service.changeStatus(id, staus);

        return ResponseEntity.ok(ApiResponse.success("Category status updated successfully"));
    }
}
