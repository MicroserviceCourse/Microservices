package org.example.ratingreviewservice.repository;

import org.example.ratingreviewservice.entity.Review;
import org.example.ratingreviewservice.generic.IRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ReviewRepository extends IRepository<Review,Integer> {

    Page<Review> findByProductId(int productId, Pageable pageable);
}
