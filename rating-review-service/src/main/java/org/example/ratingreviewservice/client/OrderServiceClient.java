package org.example.ratingreviewservice.client;

import org.example.ratingreviewservice.dto.RequestResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "order-service", url = "http://localhost:8085/api/order")
public interface OrderServiceClient {
    @GetMapping("find-order")
    RequestResponse<?> hasUserPurchasedProduct(@RequestParam("userId") int userId, @RequestParam("productId") int productId);
}
