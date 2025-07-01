package org.example.ratingreviewservice.controller;

import lombok.RequiredArgsConstructor;
import org.example.ratingreviewservice.dto.RequestResponse;
import org.example.ratingreviewservice.dto.request.ReviewDTO;
import org.example.ratingreviewservice.dto.response.PageResponse;
import org.example.ratingreviewservice.entity.Review;
import org.example.ratingreviewservice.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/review")
@RequiredArgsConstructor
public class ReviewController {
    @Autowired
    private ReviewService reviewService;
    @PostMapping("/create")
    public ResponseEntity<?>create(@RequestHeader("Authorization") String authHeader, @RequestBody ReviewDTO reviewDTO) {
        try {
            reviewService.createReview(authHeader, reviewDTO);
            return ResponseEntity.ok(new RequestResponse<>("Đánh giá thành công"));
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new RequestResponse<>("Đã xảy ra lỗi hệ thống"));
        }
    }
    @GetMapping("/all")
    public ResponseEntity<?> getAll(@RequestParam(defaultValue = "0") int page,
                                    @RequestParam(defaultValue = "10") int size){
        try {
            Page<Review>reviewPage=reviewService.getAll(page,size);
            Page<ReviewDTO>dtoPage=reviewPage.map(reviewService::todo);
            PageResponse<ReviewDTO>response=new PageResponse<>(dtoPage);
            return ResponseEntity.ok(new RequestResponse<>(response,"lấy rating thành công"));
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new RequestResponse<>("Đã xảy ra lỗi hệ thống"));
        }
    }
}
