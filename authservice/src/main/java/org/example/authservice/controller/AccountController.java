package org.example.authservice.controller;

import com.netflix.discovery.converters.Auto;
import lombok.RequiredArgsConstructor;
import org.example.authservice.config.JwtService;
import org.example.authservice.dto.*;
import org.example.authservice.dto.request.AccountDTO;
import org.example.authservice.dto.request.AuthCodeRequest;
import org.example.authservice.dto.request.LoginDTO;
import org.example.authservice.dto.response.RequestResponse;
import org.example.authservice.entity.Account;
import org.example.authservice.exception.ExceptionResponse;
import org.example.authservice.service.AccountService;
import org.example.authservice.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/account")
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
public class AccountController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private AccountService accountService;
    @Autowired
    private EmailService emailService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody LoginDTO accountDTO) {
        try {
            accountService.save(accountDTO);
            return ResponseEntity.ok(new RequestResponse("Mã xác thực đã được gửi đến email đăng kí của bạn."));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ExceptionResponse("An error occurred: " + e.getMessage()));
        }
    }

    @PostMapping("/verify-account")
    public ResponseEntity<?> verifyAccount(@RequestBody AuthCodeRequest authCodeRequest){
        try{
            accountService.verifyAuthCode(authCodeRequest);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new RequestResponse("Xác minh tài khoản thành công"));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ExceptionResponse("An error occurred: "+ e.getMessage()));
        }
    }

    @GetMapping("/role")
    public ResponseEntity<?> getUserRole(@RequestParam("email") String email) {
        try {
            Account account = accountService.findByEmail(email);
            if (account == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new ExceptionResponse("User not found"));
            }

            // Get the single role of the account
            String role = accountService.getRolesForUser(account);

            return ResponseEntity.ok(role);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ExceptionResponse("An error occurred: " + e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginDTO.getEmail(),
                            loginDTO.getPassword()
                    )
            );
            if (authentication.isAuthenticated()) {
                // Lấy thông tin Account từ đối tượng xác thực
                Account account = (Account) authentication.getPrincipal();
                if (!account.is_Active()){
                    throw new RuntimeException("Tài khoản này chưa được xác minh, vui lòng đăng kí lại");
                }

                // Tạo JWT token
                String token = jwtService.generateToken(account.getEmail(), account.getRole().getRoleName().toString());

                // Trả về token và role
                return ResponseEntity.ok(
                        new RequestResponse(
                                new TokenWithRole(token, account.getRole().getRoleName().toString())
                        )
                );
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(new ExceptionResponse("Invalid username or password"));
            }
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ExceptionResponse("Username not found"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ExceptionResponse("An error occurred: " + e.getMessage()));
        }
    }


    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestParam String email) {
        try {
            accountService.generateResetPasswordUrl(email);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new RequestResponse("Hãy kiểm tra email của bạn để đặt lại mật khẩu"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ExceptionResponse("An error occurred: " + e.getMessage()));
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(
            @RequestParam String reset_key, @RequestBody LoginDTO loginDTO) {

        try {
            accountService.resetPassword(reset_key, loginDTO);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new RequestResponse("Đổi mật khẩu thành công"));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ExceptionResponse("An error occurred: " + e.getMessage()));
        }
    }
}
