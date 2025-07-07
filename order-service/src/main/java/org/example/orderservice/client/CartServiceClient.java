package org.example.orderservice.client;

import org.example.orderservice.dto.RequestResponse;
import org.example.orderservice.dto.request.CartItemDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name = "cart-service",url = "http://localhost:8081")
public interface CartServiceClient  {
    @GetMapping("/api/cart/getCartByUserIdAndProductId/{productId}")
    RequestResponse<CartItemDTO>getCart(@RequestHeader("Authorization") String authHeader, @PathVariable("productId") int productId);
}
