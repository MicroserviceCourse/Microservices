package org.example.ratingreviewservice.client;

import org.example.ratingreviewservice.dto.RequestResponse;
import org.example.ratingreviewservice.dto.request.AccountDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name = "authservice",url = "http://localhost:8585")
public interface AuthServiceClient {
    @GetMapping("/api/account/me")
    RequestResponse<AccountDTO> getMyInfo(@RequestHeader("Authorization") String authHeader);
}
