package org.example.authservice.service;


import org.example.authservice.dto.request.UserRequest;
import org.example.authservice.dto.response.UserResponse;

public interface UserService {
    UserResponse updateUser(int id, UserRequest userRequest);
}
