package org.example.authservice.service;

import org.example.authservice.dto.AccountDTO;

import org.example.authservice.entity.Account;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;


public interface AccountService extends UserDetailsService {
    void save(AccountDTO account);
    Account findByEmail(String email);
    String getRolesForUser(Account account);
}
