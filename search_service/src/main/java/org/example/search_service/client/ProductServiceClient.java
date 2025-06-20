package org.example.search_service.client;

import org.example.search_service.dto.RequestResponse;
import org.example.search_service.dto.request.ProductDTO;
import org.example.search_service.dto.response.PageResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "product-service",url = "http://localhost:8583")
public interface ProductServiceClient {
    @GetMapping("/api/product/all")
    RequestResponse<PageResponse<ProductDTO>> getAllProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    );
}
