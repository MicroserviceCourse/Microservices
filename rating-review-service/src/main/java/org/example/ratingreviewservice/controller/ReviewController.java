package org.example.ratingreviewservice.controller;

import lombok.RequiredArgsConstructor;
import org.example.ratingreviewservice.dto.RequestResponse;
import org.example.ratingreviewservice.dto.request.ReviewDTO;
import org.example.ratingreviewservice.entity.Review;
import org.example.ratingreviewservice.exception.ErrorHandler;
import org.example.ratingreviewservice.exception.ExceptionResponse;
import org.example.ratingreviewservice.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/review")
@RequiredArgsConstructor
public class ReviewController {
    @Autowired
    private ReviewService reviewService;

    @PostMapping
    public ResponseEntity<?> create(@RequestHeader("Authorization") String authHeader, @ModelAttribute ReviewDTO reviewDTO
            , @RequestParam(value = "images", required = false) List<MultipartFile> images) {
        try {
            reviewService.createReview(authHeader, reviewDTO, images);
            return ResponseEntity.ok(new RequestResponse<>("Đánh giá thành công"));
        } catch (ErrorHandler e) {
            return ResponseEntity.status(e.getStatus()).body(new ExceptionResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ExceptionResponse("Đã xảy ra lỗi hệ thống: " + e.getMessage()));
        }
    }

    @GetMapping(value = "{id}")
    public ResponseEntity<?> getAll(@PathVariable int id,
                                    @RequestParam(defaultValue = "0") int page,
                                    @RequestParam(defaultValue = "10") int size) {
        try {
            return ResponseEntity.ok(new RequestResponse<>(reviewService.getAll(id, page, size), "lấy rating thành công"));
        } catch (ErrorHandler e) {
            return ResponseEntity.status(e.getStatus()).body(new ExceptionResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ExceptionResponse("Đã xảy ra lỗi hệ thống: " + e.getMessage()));
        }
    }
}
