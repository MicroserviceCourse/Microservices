package org.example.ratingreviewservice.mapper;

import org.example.ratingreviewservice.dto.response.ReviewImageResponse;
import org.example.ratingreviewservice.entity.ReviewImage;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ReviewImageMapper {

    ReviewImageResponse toReviewImageResponse(ReviewImage reviewImage);
}
