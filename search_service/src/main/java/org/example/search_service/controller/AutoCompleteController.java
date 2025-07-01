package org.example.search_service.controller;

import org.example.search_service.dto.RequestResponse;
import org.example.search_service.dto.request.ProductDTO;
import org.example.search_service.entity.ProductDocument;
import org.example.search_service.repository.ProductElasticRepository;
import org.example.search_service.service.kafka.ProductKafkaConsumer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/autocomplete")
public class AutoCompleteController {
    @Autowired
    private ProductElasticRepository repository;
    @GetMapping
    public ResponseEntity<?>autoComplete(@RequestParam String keyword) {
        try {
            List<ProductDocument>productDocuments=repository.findByTenSanPhamContainingIgnoreCase(keyword);
            return ResponseEntity.ok(new RequestResponse<>(productDocuments,"Gợi ý thành công"));
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
                    .body(new RequestResponse<>(List.of(),"Lỗi khi gọi product service"));
        }
    }
}
