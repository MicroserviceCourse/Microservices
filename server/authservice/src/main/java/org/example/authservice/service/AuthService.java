package org.example.authservice.service;

import org.example.authservice.dto.request.LoginRequest;
import org.example.authservice.dto.response.TokenResponse;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.Map;

public interface AuthService extends UserDetailsService {
}
