package org.example.authservice.service.impl;

import org.example.authservice.dto.request.LoginRequest;
import org.example.authservice.dto.response.TokenResponse;
import org.example.authservice.entity.AuthUser;
import org.example.authservice.repository.AuthRepository;
import org.example.authservice.service.AuthService;
import org.example.commonsecurity.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthServiceImpl implements AuthService {
    private final AuthRepository authRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    @Autowired
    public AuthServiceImpl(AuthRepository authRepository,JwtService jwtService,PasswordEncoder passwordEncoder) {
        this.authRepository = authRepository;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<AuthUser> user = authRepository.findByEmail(email);
        return user.orElseThrow(()->new UsernameNotFoundException("User not found"));
    }
}
