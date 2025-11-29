package org.example.authservice.client;

import org.example.authservice.dto.response.client.ShopResponse;
import org.example.commonutils.api.ApiResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "shop-service")
public interface ShopClient {

    @GetMapping("/api/shops/internal/owner/{ownerId}")
    ApiResponse<ShopResponse>getShopById(@PathVariable("ownerId") Long ownerId);
}
