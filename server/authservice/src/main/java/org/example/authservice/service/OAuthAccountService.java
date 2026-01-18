package org.example.authservice.service;

import org.example.authservice.entity.AuthUser;

public interface OAuthAccountService {
    AuthUser getOrCreateAccount(String email, String fullName);
}
