package org.example.ratingreviewservice.mapper;

import org.example.ratingreviewservice.dto.request.ReviewDTO;
import org.example.ratingreviewservice.dto.response.ReviewImageResponse;
import org.example.ratingreviewservice.dto.response.ReviewResponse;
import org.example.ratingreviewservice.entity.Review;
import org.example.ratingreviewservice.entity.ReviewImage;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = ReviewImageResponse.class)
public interface ReviewMapper {

    Review toReview(ReviewDTO reviewDTO);

    ReviewResponse toReviewResponse(Review review);
}
