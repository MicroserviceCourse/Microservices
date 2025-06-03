package org.example.authservice.controller;

import lombok.RequiredArgsConstructor;
import org.example.authservice.client.UserClient;
import org.example.authservice.config.JwtService;
import org.example.authservice.dto.*;
import org.example.authservice.entity.Account;
import org.example.authservice.exception.ExceptionResponse;
import org.example.authservice.service.impl.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/account")
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
public class AccountController {
    @Autowired
    private  AuthenticationManager authenticationManager;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private AccountService accountService;
    @Autowired
    private UserClient userClient;
    @GetMapping("/users")
    public List<UserRequest>getUsers() {
        return userClient.getAll();
    }
    @PostMapping("/register")
    public ResponseEntity<?>register(@RequestBody AccountDTO accountDTO) {
        try {
            accountService.save(accountDTO);
            return ResponseEntity.ok(new RequestResponse("Account registered successfully."));
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ExceptionResponse("An error occurred: " + e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO) {
        try {
            Authentication authentication=authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginDTO.getEmail(),
                            loginDTO.getPassword()
                    )
            );
            if (authentication.isAuthenticated()) {
                // Lấy thông tin Account từ đối tượng xác thực
                Account account = (Account) authentication.getPrincipal();

                // Tạo JWT token
                String token = jwtService.generateToken(account.getUsername());

                // Trả về token và role
                return ResponseEntity.ok(
                        new RequestResponse(
                                new TokenWithRole(token, account.getRole().getRoleName())
                        )
                );
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(new ExceptionResponse("Invalid username or password"));
            }
        }catch (UsernameNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ExceptionResponse("Username not found"));
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ExceptionResponse("An error occurred: " + e.getMessage()));
        }
    }
}
