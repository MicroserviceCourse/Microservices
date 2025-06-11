package org.example.product_service.service.kafka.Producer;

import lombok.RequiredArgsConstructor;
import org.example.product_service.dto.request.FileUploadRequest;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class FileProducer {
    private final KafkaTemplate<String, FileUploadRequest>kafkaTemplate;
    public void sendFileToKafka(MultipartFile file,String path,int productId, boolean isMainImage) {
        try {
            FileUploadRequest request = new FileUploadRequest(
                    file.getBytes(),
                    file.getOriginalFilename(),
                    file.getContentType(),
                    path,
                    productId,
                    isMainImage
            );
            kafkaTemplate.send("file-upload-topic", request);
        }catch (IOException e){
            throw new RuntimeException("Không thể đọc file ảnh để gửi Kafka", e);
        }
    }
}
