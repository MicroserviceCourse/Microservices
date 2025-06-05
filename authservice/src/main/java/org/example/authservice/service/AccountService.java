package org.example.authservice.service;

import org.example.authservice.dto.AccountDTO;

import org.springframework.security.core.userdetails.UserDetailsService;


public interface AccountService extends UserDetailsService {
    void save(AccountDTO account);

}
