package org.microservice.userservice.service;

import org.microservice.userservice.dto.request.UserRequest;

public interface UserService {
    void save(UserRequest request);
}
