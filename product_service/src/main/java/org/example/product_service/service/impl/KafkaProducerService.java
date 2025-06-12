package org.example.product_service.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class KafkaProducerService {
    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    private final String TOPIC = "product-created";

    public void sendProductCreatedMessage(String message) {
        kafkaTemplate.send(TOPIC, message);
    }
}

