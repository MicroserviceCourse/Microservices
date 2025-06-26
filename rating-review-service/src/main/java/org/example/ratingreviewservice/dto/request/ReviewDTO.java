package org.example.ratingreviewservice.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReviewDTO {
    private int id;
    private int productId;
    private String productName;
    private int rating;
    private String comment;
}
