package org.example.authservice.client;

import org.example.authservice.dto.UserRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;

import java.util.List;

@FeignClient(name = "userservice")
public interface UserClient {
    @GetMapping("/api/users")
    List<UserRequest> getAll();
}
