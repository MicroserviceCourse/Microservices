package org.example.product_service.controller;

import lombok.RequiredArgsConstructor;
import org.example.product_service.dto.RequestResponse;
import org.example.product_service.dto.request.TagDTO;
import org.example.product_service.dto.response.PageResponse;
import org.example.product_service.entity.Tag;
import org.example.product_service.exception.ErrorHandler;
import org.example.product_service.exception.ExceptionResponse;
import org.example.product_service.service.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tag")
@RequiredArgsConstructor
public class TagController {
    @Autowired
    private TagService tagService;

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody TagDTO tagDTO) {
        try {
            tagService.create(tagDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(new RequestResponse("Product Tag created successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new RequestResponse("Đã xảy ra lỗi hệ thống"));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> get(@PathVariable int id) {
        try {
            Tag tag = tagService.findById(id);
            TagDTO tagDTO = tagService.todo(tag);
            return ResponseEntity.ok(new RequestResponse(tagDTO, "Lấy thông tin thẻ sản phẩm"));
        } catch (ErrorHandler e) {
            return ResponseEntity.status(e.getStatus()).body(new RequestResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new RequestResponse("Đã xảy ra lỗi hệ thống"));
        }
    }

    @GetMapping("/delete/{id}")
    public ResponseEntity<?> deleteById(@PathVariable int id) {
        try {
            tagService.deleteTagById(id);
            return ResponseEntity.ok(new RequestResponse("Product Tag deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new RequestResponse("Đã xảy ra lỗi hệ thống"));
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAll(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        try {
            Page<Tag> tagPage = tagService.findAll(page, size);
            Page<TagDTO> dtoPage = tagPage.map(tagService::todo);
            PageResponse<TagDTO> response = new PageResponse<>(dtoPage);
            return ResponseEntity.ok(new RequestResponse(response, "Lấy danh sách thẻ sản phẩm thành công"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ExceptionResponse("Lỗi khi lấy danh sách thẻ sản phẩm:" + e.getMessage()));
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable int id, @RequestBody TagDTO tagDTO) {
        try {
            tagService.update(id, tagDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(new RequestResponse("Product Tag updated successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new RequestResponse("Đã xảy ra lỗi hệ thống"));
        }
    }

}
