package org.example.authservice.service.impl;

import org.example.authservice.dto.request.UserRequest;
import org.example.authservice.dto.response.UserResponse;
import org.example.authservice.entity.User;
import org.example.authservice.exception.ErrorHandler;
import org.example.authservice.mapper.UserMapper;
import org.example.authservice.repository.UserRepository;
import org.example.authservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImplement implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserMapper userMapper;

    @Override
    public UserResponse updateUser(int id, UserRequest userRequest) {

        if (!userRepository.existsById(id)) {
            throw new RuntimeException("Không tìm thấy thông tin người dùng này");
        }
        User user = userMapper.toUser(userRequest);
        user.setId(id);
        return userMapper.toUserResponse(userRepository.save(user));
    }
}
