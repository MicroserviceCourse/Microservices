package org.example.ratingreviewservice.service;

import org.example.ratingreviewservice.dto.request.ReviewDTO;
import org.example.ratingreviewservice.entity.Review;
import org.springframework.data.domain.Page;

public interface ReviewService {
    Review createReview(String token, ReviewDTO reviewDTO);
    Page<Review>getAll(int page, int size);
    ReviewDTO todo(Review review);
}
