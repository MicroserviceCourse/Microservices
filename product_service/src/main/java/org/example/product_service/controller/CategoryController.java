package org.example.product_service.controller;

import lombok.RequiredArgsConstructor;
import org.example.product_service.dto.RequestResponse;
import org.example.product_service.dto.request.CategoryDTO;
import org.example.product_service.dto.response.PageResponse;
import org.example.product_service.entity.Category;
import org.example.product_service.exception.ErrorHandler;
import org.example.product_service.exception.ExceptionResponse;
import org.example.product_service.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/category")
@RequiredArgsConstructor
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody CategoryDTO categoryDTO) {
        try {
            categoryService.createCategory(categoryDTO);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new RequestResponse("Category created successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new RequestResponse("Đã xảy ra lỗi hệ thống"));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable int id) {
        try {
            Category category = categoryService.findById(id);
            CategoryDTO categoryDTO = categoryService.todo(category);
            return ResponseEntity.ok(new RequestResponse(categoryDTO, "lấy thông tin danh mục"));
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
            Page<Category> categoryPage = categoryService.findAll(page, size);
            Page<CategoryDTO> dtoPage = categoryPage.map(categoryService::todo);
            PageResponse<CategoryDTO> response = new PageResponse<>(dtoPage);
            return ResponseEntity.ok(new RequestResponse(response, "Lấy danh sách danh mục thành công"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ExceptionResponse("Lỗi khi lấy danh muc:" + e.getMessage()));
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable int id, @RequestBody CategoryDTO categoryDTO) {
        try {
            categoryService.updateCategory(id, categoryDTO);
            return ResponseEntity.ok(new RequestResponse("Category updated successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new RequestResponse("Đã xảy ra lỗi hệ thống"));
        }
    }
}
