package org.microservice.userservice.service;

import org.microservice.userservice.dto.request.UserRequest;
import org.microservice.userservice.entity.User;

public interface UserService {
    void save(UserRequest request);
    User getUserByAuthId(Long authId);
}
