package org.example.authservice.service.impl;

import org.example.authservice.dto.AccountDTO;
import org.example.authservice.entity.Account;
import org.example.authservice.entity.Role;
import org.example.authservice.exception.ErrorHandler;
import org.example.authservice.repository.AccountRepository;
import org.example.authservice.repository.RoleRepository;
import org.example.authservice.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class AccountServiceImplement implements AccountService {
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private RoleRepository roleRepository;


    @Override
    public void save(AccountDTO account) {
        try {
            Account account1=new Account();
            account1.setEmail(account.getEmail());
            account1.setPassword(passwordEncoder.encode(account.getPassword()));
            Role role=roleRepository.findById(account.getIdRole())
                    .orElseThrow(() -> new ErrorHandler(HttpStatus.BAD_REQUEST, "Role not found"));
            account1.setRole(role);
            accountRepository.save(account1);
        }catch (Exception e) {
            e.printStackTrace();
        }
    }



    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Account> account = accountRepository.findByEmail(username);
        return account.orElseThrow(() -> new ErrorHandler(HttpStatus.UNAUTHORIZED, "Account not exist"));
    }
}
