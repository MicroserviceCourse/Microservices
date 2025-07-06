package org.example.banner_service.controller;

import org.example.banner_service.dto.RequestResponse;
import org.example.banner_service.dto.request.NewDTO;
import org.example.banner_service.dto.response.PageResponse;
import org.example.banner_service.entity.New;
import org.example.banner_service.exception.ExceptionResponse;
import org.example.banner_service.service.NewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/new")
public class NewController {
    @Autowired
    private NewService newService;

    @PostMapping("create")
    public ResponseEntity<?> create(@ModelAttribute NewDTO newDTO, @RequestParam(value = "file", required = false) MultipartFile file) {
        try {
            newService.createNew(file, newDTO);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new RequestResponse("Tạo tin tức thành công"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new RequestResponse("Đã xảy ra lỗi hệ thống"));
        }
    }

    @PutMapping("update/{id}")
    public ResponseEntity<?> update(@PathVariable("id") int id, @ModelAttribute NewDTO newDTO, @RequestParam(value = "file", required = false) MultipartFile file) {
        try {
            newService.updateNew(id, newDTO, file);
            return ResponseEntity.ok(new RequestResponse("Cập nhật tin tức thành công"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new RequestResponse("Đã xảy ra lỗi hệ thống"));
        }
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") int id) {
        try {
            newService.deleteNew(id);
            return ResponseEntity.ok(new RequestResponse("xóa tin tức thành công"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new RequestResponse("Đã xảy ra lỗi hệ thống"));
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAll(@RequestParam(defaultValue = "0") int page,
                                    @RequestParam(defaultValue = "10") int size) {
        try {
            Page<New> newsPage = newService.getAll(page, size);
            Page<NewDTO> dtoPage = newsPage.map(newService::todo);
            PageResponse<NewDTO> response = new PageResponse<>(dtoPage);
            return ResponseEntity.ok(new RequestResponse(response, "Lấy danh sách tin tức phân trang thành công"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ExceptionResponse(e.getMessage()));
        }
    }
}
