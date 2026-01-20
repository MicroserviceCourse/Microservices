package org.webvibe.cart_service.client;

import lombok.RequiredArgsConstructor;
import org.example.commonutils.api.ApiResponse;
import org.example.commonutils.api.PageResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.client.RestTemplate;
import org.webvibe.cart_service.dto.response.client.ProductResponse;

@FeignClient(name = "product-service")
public interface ProductClient {
    @GetMapping("/api/products/{id}")
   ApiResponse<ProductResponse>getProductById(@PathVariable Long id);
}
