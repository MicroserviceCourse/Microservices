package com.phucnghia.user.service;

import com.phucnghia.user.dto.request.UserRequest;
import com.phucnghia.user.entity.User;

import java.util.List;

public interface UserService {
    List<User> getAllUsers();
    User getUserById(Long id);
    User createUser(UserRequest request);
    void deleteUser(Long id);
    User updateUser(Long id, UserRequest request);

}
