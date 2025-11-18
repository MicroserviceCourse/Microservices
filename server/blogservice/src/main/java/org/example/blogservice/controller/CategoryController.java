package org.example.blogservice.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.blogservice.dto.request.CategoryRequest;
import org.example.blogservice.dto.response.CategoryResponse;
import org.example.blogservice.service.CategoryService;
import org.example.commonutils.api.ApiResponse;
import org.example.commonutils.api.PageResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @PostMapping
    public ResponseEntity<ApiResponse<CategoryResponse>> create(@Valid @RequestBody CategoryRequest request) {
        CategoryResponse data = categoryService.create(request);
        return ResponseEntity.ok(ApiResponse.success(data));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<CategoryResponse>> update(@PathVariable Long id,
                                                                @Valid @RequestBody CategoryRequest request) {
        CategoryResponse data = categoryService.update(id, request);
        return ResponseEntity.ok(ApiResponse.success(data));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        categoryService.delete(id);
        return ResponseEntity.ok(ApiResponse.success(null));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<CategoryResponse>> getById(@PathVariable Long id) {
        CategoryResponse data = categoryService.getById(id);
        return ResponseEntity.ok(ApiResponse.success(data));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<CategoryResponse>>> getPage(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        Page<CategoryResponse> resultPage = categoryService.getPage(PageRequest.of(page, size));
        PageResponse<CategoryResponse> body = new PageResponse<>(resultPage);
        return ResponseEntity.ok(ApiResponse.success(body));
    }
}
