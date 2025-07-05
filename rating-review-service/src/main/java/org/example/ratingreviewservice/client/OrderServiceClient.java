package org.example.ratingreviewservice.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "order-service")
public interface OrderServiceClient {
    @GetMapping("/api/orders/has-product")
    boolean hasUserPurchasedProduct(@RequestParam("userId") int userId, @RequestParam("productId") int productId);
}
