package org.example.authservice.service;

import org.example.authservice.dto.request.AuthCodeRequest;
import org.example.authservice.dto.request.LoginDTO;
import org.example.authservice.entity.Account;
import org.springframework.security.core.userdetails.UserDetailsService;


public interface AccountService extends UserDetailsService {
    void save(LoginDTO account);

    void verifyAuthCode(AuthCodeRequest authCodeRequest);

    Account findByEmail(String email);
    String getRolesForUser(Account account);

    void generateResetPasswordUrl(String email);

    void resetPassword(String reset_key, LoginDTO loginDTO);
}
