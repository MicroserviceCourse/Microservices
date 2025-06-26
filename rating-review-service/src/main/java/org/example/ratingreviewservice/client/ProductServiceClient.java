package org.example.ratingreviewservice.client;

import org.example.ratingreviewservice.dto.RequestResponse;
import org.example.ratingreviewservice.dto.request.ProductDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "product-service",url = "http://localhost:8583")
public interface ProductServiceClient {
    @GetMapping("/api/product/{id}")
    RequestResponse<ProductDTO> getProduct(@PathVariable("id") int id);
}
