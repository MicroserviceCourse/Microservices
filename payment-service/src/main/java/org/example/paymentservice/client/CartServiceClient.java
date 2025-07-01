package org.example.paymentservice.client;

import org.example.paymentservice.dto.RequestResponse;
import org.example.paymentservice.dto.request.CartDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

@FeignClient(name = "cart-service",url = "http://localhost:8081")
public interface CartServiceClient {
    @GetMapping("/api/cart/myCart")
    RequestResponse<CartDTO>getMyCart();
}
