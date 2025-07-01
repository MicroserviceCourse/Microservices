package com.example.cartservice.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "authservice",url = "http://localhost:8585")
public interface AuthServiceClient {
    @GetMapping("/api/account/role")
    String getUserRole(@RequestParam("email")String email);
    @GetMapping("/api/account/id")
    Integer getUserId(@RequestParam("email")String email);
}
