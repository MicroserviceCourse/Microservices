package org.example.ratingreviewservice.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.ratingreviewservice.entity.ReviewImage;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReviewDTO {
    private Long id;
    private int productId;
    private String productName;
    private int rating;
    private String comment;
}
