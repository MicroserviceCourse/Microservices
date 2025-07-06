package org.example.banner_service.controller;

import lombok.RequiredArgsConstructor;
import org.example.banner_service.dto.RequestResponse;
import org.example.banner_service.dto.request.BlogDTO;
import org.example.banner_service.dto.response.PageResponse;
import org.example.banner_service.entity.Blog;
import org.example.banner_service.exception.ExceptionResponse;
import org.example.banner_service.service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/blog")
@RequiredArgsConstructor
public class BlogController {
    @Autowired
    private BlogService blogService;

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody BlogDTO blogDTO, @RequestParam(value = "file", required = false) MultipartFile file) {
        try {
            blogService.create(file, blogDTO);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new RequestResponse("Banner created successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new RequestResponse("Đã xảy ra lỗi hệ thống"));
        }

    }

    @GetMapping("/all")
    public ResponseEntity<?> getAll(@RequestParam(defaultValue = "0") int page,
                                    @RequestParam(defaultValue = "10") int size) {
        try {
            Page<Blog> blogPage = blogService.findAll(page, size);
            Page<BlogDTO> dtoPage = blogPage.map(blogService::todo);
            PageResponse<BlogDTO> response = new PageResponse<>(dtoPage);
            return ResponseEntity.ok(new RequestResponse(response, "Lấy danh dách blog thành công"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ExceptionResponse("Lỗi khi lấy blog:" + e.getMessage()));
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") int id) {
        try {
            blogService.delete(id);
            return ResponseEntity.ok(new RequestResponse("Banner deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new RequestResponse("Đã xảy ra lỗi hệ thống"));
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable("id") int id, @RequestBody BlogDTO blogDTO, @RequestParam(value = "file", required = false) MultipartFile file) {
        try {
            blogService.update(id, file, blogDTO);
            return ResponseEntity.ok(new RequestResponse("Banner updated successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new RequestResponse("Đã xảy ra lỗi"));
        }
    }
}
