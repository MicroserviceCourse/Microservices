package org.example.authservice.client;

import org.example.authservice.dto.request.client.UserProfileRequest;
import org.example.authservice.dto.response.client.UserResponse;
import org.example.commonutils.api.ApiResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "user-service")
public interface UserClient {
    @PostMapping("/api/users")
    ApiResponse<Void> createProfile(@RequestBody UserProfileRequest userProfileRequest);

    @GetMapping("/api/users/{authId}")
    ApiResponse<UserResponse> getUserByAuthId(@PathVariable("authId") Long authId);
}
