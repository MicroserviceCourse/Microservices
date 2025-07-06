package org.example.banner_service.controller;

import lombok.RequiredArgsConstructor;
import org.example.banner_service.dto.request.BannerDTO;
import org.example.banner_service.dto.RequestResponse;
import org.example.banner_service.dto.response.PageResponse;
import org.example.banner_service.entity.Banner;
import org.example.banner_service.exception.ExceptionResponse;
import org.example.banner_service.service.BannerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/banner")
@RequiredArgsConstructor
public class BannerController {
    @Autowired
    private BannerService bannerService;

    @PostMapping("/create")
    public ResponseEntity<?> create(@ModelAttribute BannerDTO bannerDTO, @RequestParam(value = "file", required = false) MultipartFile file) {
        try {
            bannerService.createBanner(bannerDTO, file);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new RequestResponse("Blog created successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new RequestResponse("Đã xảy ra lỗi hệ thống"));
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@ModelAttribute BannerDTO bannerDTO, @PathVariable("id") int id, @RequestParam(value = "file", required = false) MultipartFile file) {
        try {
            bannerService.updateBanner(id, bannerDTO, file);
            return ResponseEntity.ok(new RequestResponse("Blog updated successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new RequestResponse("Đã xảy ra lỗi hệ thống"));
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAll(@RequestParam(defaultValue = "0") int page,
                                    @RequestParam(defaultValue = "10") int size) {
        try {
            Page<Banner> bannerPage = bannerService.getBanners(page, size);
            Page<BannerDTO> dtoPage = bannerPage.map(bannerService::todo);
            PageResponse<BannerDTO> response = new PageResponse<>(dtoPage);
            return ResponseEntity.ok(new RequestResponse(response, "Lấy danh sách banner có phân trang"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ExceptionResponse("Lỗi khi lấy banner:" + e.getMessage()));
        }
    }

    @GetMapping("/danh-sach")
    public ResponseEntity<?> danhSach() {
        try {
            List<Banner> banners = bannerService.getAll();
            List<BannerDTO> bannerDTOS = banners.stream().map(bannerService::todo).collect(Collectors.toList());
            return ResponseEntity.ok(new RequestResponse(bannerDTOS, "Lấy danh sách banner không có phân trang"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ExceptionResponse("Lỗi khi lấy banner:" + e.getMessage()));
        }
    }
}
