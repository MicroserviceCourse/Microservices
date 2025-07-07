package org.example.ratingreviewservice.dto.response;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.example.ratingreviewservice.entity.Review;

@Data
@Getter
@Setter
public class ReviewImageResponse {

    private String imageUrl;
}
