package org.example.ratingreviewservice.dto.response;

import jakarta.persistence.*;
import lombok.*;
import org.example.ratingreviewservice.entity.ReviewImage;

import java.time.Instant;
import java.util.Set;

@Data
@Getter
@Setter
@Builder
public class ReviewResponse {

    private int productId;
    private int userId;
    private int rating;
    private String comment;
    private Instant createdAt;

    private Set<ReviewImageResponse> images;
}
