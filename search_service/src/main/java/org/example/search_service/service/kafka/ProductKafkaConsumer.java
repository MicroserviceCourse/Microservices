package org.example.search_service.service.kafka;

import org.example.search_service.dto.request.ProductDTO;
import org.example.search_service.entity.ProductDocument;
import org.example.search_service.repository.ProductElasticRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class ProductKafkaConsumer {
    @Autowired
    private ProductElasticRepository productElasticRepository;
    @KafkaListener(topics = "product-topic",groupId = "search-group",containerFactory = "kafkaListenerContainerFactory")
    public void consume(ProductDTO productDTO) {
        System.out.println("Nhận sản phẩm từ Kafka: " + productDTO);
        ProductDocument doc = new ProductDocument(
                productDTO.getId(),
                productDTO.getTenSanPham(),
                productDTO.getMoTa(),
                productDTO.getGia(),
                productDTO.getDanhMuc()
        );
        productElasticRepository.save(doc);
    }
}
