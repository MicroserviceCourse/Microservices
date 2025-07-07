package org.example.orderservice.client;

import org.example.orderservice.dto.RequestResponse;
import org.example.orderservice.dto.request.AccountDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "authservice",url = "http://localhost:8585")
public interface AuthServiceClient {
    @GetMapping("/api/account/me")
    RequestResponse<AccountDTO>getMyInfo(@RequestHeader("Authorization")String authorization);
    @GetMapping("/api/account/role")
    String getUserRole(@RequestParam("email")String email);
}
