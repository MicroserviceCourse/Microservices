package com.phucnghia.user.service;

import com.phucnghia.user.dto.request.UserRequest;
import com.phucnghia.user.entity.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;

import java.util.List;

public interface UserService {
    List<User> getAllUsers();
    User getUserById(Long id);
    User createUser(UserRequest request);
    void deleteUser(Long id);
    User updateUser(Long id, UserRequest request);

}

@FeignClient(name = "authservice")
interface AuthServiceClient {
    @PostMapping("/api/auth/validate")
    ResponseEntity<Boolean> validateToken(@RequestHeader("Authorization") String token);
}
