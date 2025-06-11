package org.example.file_service.service.kafka;

import lombok.RequiredArgsConstructor;
import org.example.file_service.dto.CustomMultipartFile;
import org.example.file_service.dto.RequestResponse;

import org.example.file_service.dto.request.FileUploadRequest;
import org.example.file_service.dto.request.FileUploadResult;
import org.example.file_service.service.GeneralService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


@Service
@RequiredArgsConstructor
public class FileConsumer {
    @Autowired
    private  KafkaTemplate<String, FileUploadResult>kafkaTemplate;
    @Autowired
    private  GeneralService generalService;
    @KafkaListener(topics = "file-upload-topic",groupId = "file-service-group")
    public void handleFileUpload(FileUploadRequest fileUploadResult) {
        try {
            MultipartFile file = new CustomMultipartFile(
                    fileUploadResult.getFileBytes(),
                    fileUploadResult.getFileName(),
                    fileUploadResult.getContentType()
            );
            String path=generalService.saveFile(file,fileUploadResult.getPath());
            FileUploadResult result=new FileUploadResult(
                    fileUploadResult.getProductId(),
                    fileUploadResult.isMainImage(),
                    path
            );
            kafkaTemplate.send("file-upload-result-topic",result);

        }catch (Exception e) {
            System.err.println("❌ Lỗi khi gửi file qua Kafka: " + e.getMessage());

        }
    }
}
