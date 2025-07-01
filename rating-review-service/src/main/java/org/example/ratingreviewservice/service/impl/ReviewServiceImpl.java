package org.example.ratingreviewservice.service.impl;

import feign.FeignException;
import org.example.ratingreviewservice.client.AuthServiceClient;
import org.example.ratingreviewservice.client.ProductServiceClient;
import org.example.ratingreviewservice.dto.RequestResponse;
import org.example.ratingreviewservice.dto.request.AccountDTO;
import org.example.ratingreviewservice.dto.request.ProductDTO;
import org.example.ratingreviewservice.dto.request.ReviewDTO;
import org.example.ratingreviewservice.entity.Review;
import org.example.ratingreviewservice.repository.ReviewRepository;
import org.example.ratingreviewservice.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class ReviewServiceImpl implements ReviewService {
    @Autowired
    private AuthServiceClient authServiceClient;
    @Autowired
    private ProductServiceClient productServiceClient;
    @Autowired
    private ReviewRepository reviewRepository;
    @Override
    public Review createReview(String token, ReviewDTO reviewDTO) {
       try {
           RequestResponse<AccountDTO> response = authServiceClient.getMyInfo(token);
           AccountDTO account = response.getData();
           try {
            productServiceClient.getProduct(reviewDTO.getProductId());
           }catch (FeignException.NotFound e){
               throw new RuntimeException("Sản phẩm Không tồn tại");
           }
            Review review= Review.builder()
                    .comment(reviewDTO.getComment())
                    .createdAt(Instant.now())
                    .productId(reviewDTO.getProductId())
                    .rating(reviewDTO.getRating())
                    .userId(account.getId())
                    .build();
            return reviewRepository.save(review);
       }catch (Exception e) {
           throw new RuntimeException("Không thể thêm Review");
       }
    }

    @Override
    public Page<Review> getAll(int page, int size) {
        return reviewRepository.findAll(PageRequest.of(page, size));
    }

    @Override
    public ReviewDTO todo(Review review) {
        ReviewDTO reviewDTO = new ReviewDTO();
        reviewDTO.setId(review.getId());
        reviewDTO.setComment(review.getComment());
        reviewDTO.setProductId(review.getProductId());
        RequestResponse<ProductDTO>productDto=productServiceClient.getProduct(review.getProductId());
        ProductDTO productDTO=productDto.getData();
        reviewDTO.setProductName(productDTO.getTenSanPham());
        reviewDTO.setRating(review.getRating());
        return reviewDTO;
    }
}
