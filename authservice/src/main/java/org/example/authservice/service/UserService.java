package org.example.authservice.service;


import org.example.authservice.dto.request.UserRequest;
import org.example.authservice.dto.response.UserInfResponse;
import org.example.authservice.dto.response.UserResponse;

public interface UserService {
    UserResponse updateUser(UserRequest userRequest);

    UserInfResponse getInf();
}
