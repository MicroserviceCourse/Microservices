package org.example.authservice.controller;

import lombok.RequiredArgsConstructor;
import org.example.authservice.dto.request.LoginRequest;
import org.example.authservice.dto.response.TokenResponse;
import org.example.authservice.entity.AuthUser;
import org.example.authservice.entity.AuthUserRole;
import org.example.authservice.entity.Role;
import org.example.authservice.service.AuthService;
import org.example.commonsecurity.JwtService;
import org.example.commonutils.api.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@RequestMapping("/api/account")
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private AuthService authService;
    @Autowired
    private JwtService jwtService;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<TokenResponse>> login(@RequestBody LoginRequest loginDTO) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginDTO.getEmail(),
                            loginDTO.getPassword()
                    )
            );
            if (authentication.isAuthenticated()) {
                AuthUser account = (AuthUser) authentication.getPrincipal();
                List<String> roles = account.getRoles().stream()
                        .map(authUserRole -> authUserRole.getRole().getName())
                        .toList();

                String accessToken = jwtService.generateAccessToken(account.getEmail(), account.getId(), roles);
                String refreshToken = jwtService.generateRefreshToken(account.getEmail(), account.getId(), roles);
                long accessTokenExpiryAt = jwtService.getAccessExpiration();
                long refreshTokenExpiryAt = jwtService.getRefreshExpiration();
                List<String> extractedRoles = jwtService.extractRole(accessToken);
                return ResponseEntity.ok(ApiResponse.success(
                                new TokenResponse(accessToken, refreshToken, accessTokenExpiryAt, refreshTokenExpiryAt, extractedRoles)
                        )
                );
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(ApiResponse.error("Invalid email or password"));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error("Invalid email or password"));
        }

    }
}
