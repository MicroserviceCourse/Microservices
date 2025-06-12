package org.example.file_service.service;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class KafkaConsumerService {

    @KafkaListener(topics = "product-created", groupId = "file-service-group")
    public void listen(String message) {
        System.out.println("Received message from Kafka: " + message);
        // Parse JSON và xử lý theo nhu cầu
    }
}

