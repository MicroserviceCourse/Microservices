package org.example.ratingreviewservice.service;

import org.example.ratingreviewservice.dto.request.ReviewDTO;
import org.example.ratingreviewservice.dto.response.ReviewResponse;
import org.example.ratingreviewservice.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ReviewService {
    Review createReview(String token, ReviewDTO reviewDTO, List<MultipartFile> images);
    Page<ReviewResponse>getAll(int productId, int page, int size);
}
