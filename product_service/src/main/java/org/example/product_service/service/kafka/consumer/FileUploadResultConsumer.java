package org.example.product_service.service.kafka.consumer;

import lombok.RequiredArgsConstructor;
import org.example.product_service.Repository.ProductImageRepository;
import org.example.product_service.Repository.ProductRepository;
import org.example.product_service.dto.request.FileUploadResult;
import org.example.product_service.entity.Product;
import org.example.product_service.entity.ProductImage;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FileUploadResultConsumer {
    private final ProductRepository productRepository;
    private final ProductImageRepository productImageRepository;

    @KafkaListener(topics = "file-upload-result-topic", groupId = "product-service")
    public void handleUploadResult(FileUploadResult result) {
        Product product = productRepository.findById(result.getProductId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm"));
        if (result.isMainImage()) {
            product.setMainImage(result.getFilePath());
            productRepository.save(product);
        } else {
            ProductImage image = new ProductImage();
            image.setProduct(product);
            image.setImageUrl(result.getFilePath());
            productImageRepository.save(image);
        }
    }
}
