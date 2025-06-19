package org.example.authservice.service.impl;

import org.example.authservice.dto.request.UserRequest;
import org.example.authservice.dto.response.UserInfResponse;
import org.example.authservice.dto.response.UserResponse;
import org.example.authservice.entity.Account;
import org.example.authservice.entity.User;
import org.example.authservice.exception.ErrorHandler;
import org.example.authservice.mapper.AccountMapper;
import org.example.authservice.mapper.UserMapper;
import org.example.authservice.repository.AccountRepository;
import org.example.authservice.repository.UserRepository;
import org.example.authservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImplement implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserMapper userMapper;
    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private AccountMapper accountMapper;

    @Override
    public UserResponse updateUser(UserRequest userRequest) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentEmail = authentication.getName();

        Account account = accountRepository.findByEmail(currentEmail)
                .orElseThrow(() -> new RuntimeException("Người dùng không hợp lệ"));

        User user = userMapper.toUser(userRequest);
        user.setId(account.getUser().getId());
        return userMapper.toUserResponse(userRepository.save(user));
    }

    @Override
    public UserInfResponse getInf() {
        var context = SecurityContextHolder.getContext();
        String email = context.getAuthentication().getName();
        Account account = accountRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy thông tin người dùng này"));
        return accountMapper.toUserInf(account);
    }
}
