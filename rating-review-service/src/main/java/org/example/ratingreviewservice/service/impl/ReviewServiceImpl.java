package org.example.ratingreviewservice.service.impl;

import feign.FeignException;
import org.example.ratingreviewservice.client.AuthServiceClient;
import org.example.ratingreviewservice.client.FileServiceClient;
import org.example.ratingreviewservice.client.OrderServiceClient;
import org.example.ratingreviewservice.client.ProductServiceClient;
import org.example.ratingreviewservice.dto.RequestResponse;
import org.example.ratingreviewservice.dto.request.AccountDTO;
import org.example.ratingreviewservice.dto.request.ProductDTO;
import org.example.ratingreviewservice.dto.request.ReviewDTO;
import org.example.ratingreviewservice.dto.response.ReviewResponse;
import org.example.ratingreviewservice.entity.Review;
import org.example.ratingreviewservice.entity.ReviewImage;
import org.example.ratingreviewservice.exception.ErrorHandler;
import org.example.ratingreviewservice.mapper.ReviewMapper;
import org.example.ratingreviewservice.repository.ReviewRepository;
import org.example.ratingreviewservice.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReviewServiceImpl implements ReviewService {
    @Autowired
    private AuthServiceClient authServiceClient;
    @Autowired
    private ProductServiceClient productServiceClient;
    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private OrderServiceClient orderServiceClient;

    @Autowired
    private FileServiceClient fileServiceClient;

    @Autowired
    private KafkaTemplate<String, Object> kafkaTemplate;

    @Autowired
    private ReviewMapper reviewMapper;


    @Override
    public Review createReview(String token, ReviewDTO reviewDTO, List<MultipartFile> images) {
        AccountDTO account;
        try {
            RequestResponse<AccountDTO> response = authServiceClient.getMyInfo(token);
            account = response.getData();
        } catch (FeignException e) {
            throw new ErrorHandler(HttpStatus.UNAUTHORIZED, "Bạn không có quyền thực hiện hành động này");
        }
        try {
            productServiceClient.getProduct(reviewDTO.getProductId());
        } catch (FeignException e) {
            if (e.status() == 400) {
                throw new ErrorHandler(HttpStatus.NOT_FOUND, "Sản phẩm không tồn tại");
            } else {
                throw new ErrorHandler(HttpStatus.BAD_REQUEST, "Lỗi ProductService: " + e.contentUTF8());
            }
        }
        Review review = Review.builder()
                .comment(reviewDTO.getComment())
                .createdAt(Instant.now())
                .productId(reviewDTO.getProductId())
                .rating(reviewDTO.getRating())
                .userId(account.getId())
                .build();

        List<ReviewImage> reviewImages = new ArrayList<>();
        if (images != null && !images.isEmpty()) {
            for (MultipartFile file : images) {
                String uploadedPath = fileServiceClient.uploadFile(file, "review/");
                ReviewImage img = new ReviewImage();
                img.setImageUrl(uploadedPath);
                img.setReview(review);
                reviewImages.add(img);
            }
        }
        review.setImages(reviewImages);

        Review newReview = reviewRepository.save(review);
        kafkaTemplate.send("review-topic", newReview);

        return newReview;
    }

    @Override
    public Page<ReviewResponse> getAll(int productId, int page, int size) {
        Page<Review> existingReviews = reviewRepository.findByProductId(productId, PageRequest.of(page, size));

        if (existingReviews.isEmpty()) {
            throw new ErrorHandler(HttpStatus.NOT_FOUND, "Không tìm thấy đánh giá cho sản phẩm với id = " + productId);
        }

        return existingReviews.map(reviewMapper::toReviewResponse);
    }
}
