package org.microservice.userservice.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.commonsecurity.SecurityUtils;
import org.microservice.userservice.dto.request.UserRequest;
import org.microservice.userservice.entity.User;
import org.microservice.userservice.mapper.UserMapper;
import org.microservice.userservice.repository.UserRepository;
import org.microservice.userservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final SecurityUtils securityUtils;
    @Autowired
    public UserServiceImpl(UserRepository userRepository, UserMapper userMapper, SecurityUtils securityUtils) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.securityUtils = securityUtils;
    }
    @Override
    public void save(UserRequest request) {
        try {
            User user = userMapper.toEntity(request,securityUtils.getCurrentUserId());
            userRepository.save(user);
        }catch (Exception ex){
            log.error(ex.getMessage(),ex);
            throw new RuntimeException(ex);
        }
    }

    @Override
    public User getUserByAuthId(Long authId) {
        return userRepository.findByAuthId(authId)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
