package com.example.cartservice.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name="product-service")
public interface ProductServiceClient {
    @GetMapping("/api/product/getName/{id}")
    public String findNameById(@PathVariable int id);
}
