package org.example.authservice.controller;

import lombok.RequiredArgsConstructor;
import org.example.authservice.client.ShopClient;
import org.example.authservice.dto.request.AuthRegisterRequest;
import org.example.authservice.dto.request.LoginRequest;
import org.example.authservice.dto.response.AuthUserResponse;
import org.example.authservice.dto.response.RelationModeFilterRequest;
import org.example.authservice.dto.response.TokenResponse;
import org.example.authservice.dto.response.client.ShopResponse;
import org.example.authservice.entity.AuthUser;
import org.example.authservice.entity.Role;
import org.example.authservice.service.AuthService;
import org.example.commonsecurity.JwtService;
import org.example.commonutils.api.ApiResponse;
import org.example.commonutils.api.PageResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

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
    @Autowired
    private ShopClient shopClient;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<TokenResponse>> login(@RequestBody LoginRequest loginDTO) {
        try {
            Authentication authentication =
                    authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                            loginDTO.getEmail(),
                            loginDTO.getPassword()
                    ));
            if (authentication.isAuthenticated()) {
                AuthUser account = (AuthUser) authentication.getPrincipal();
                List<String> roles =
                        account.getRoles().stream().map(authUserRole -> authUserRole.getRole().getName()).toList();
                ShopResponse shopInfo = null;

                if (roles.contains("SELLER")) {
                    shopInfo = shopClient.getShopById(account.getId()).getData();
                }
                String accessToken = jwtService.
                        generateAccessToken(
                                account.getEmail(),
                                account.getId(),
                                roles,
                                shopInfo!=null && shopInfo.getId()!=null?shopInfo.getId():null);
                String refreshToken = jwtService.
                        generateRefreshToken
                                (
                                        account.getEmail(),
                                        account.getId(),
                                        roles,
                                        shopInfo!=null && shopInfo.getId()!=null?shopInfo.getId():null
                                );
                long accessTokenExpiryAt = jwtService.getAccessExpiration();
                long refreshTokenExpiryAt = jwtService.getRefreshExpiration();
                List<String> extractedRoles = jwtService.extractRole(accessToken);
                return ResponseEntity.ok(ApiResponse.success(new TokenResponse(
                        accessToken, refreshToken,
                        accessTokenExpiryAt,
                        refreshTokenExpiryAt, extractedRoles,
                        shopInfo
                )));
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ApiResponse.error("Invalid email or " +
                                                                                             "password"));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ApiResponse.error("Invalid email or password"));
        }

    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<Void>> register(@RequestBody AuthRegisterRequest request) {
        try {
            authService.register(request);
            return ResponseEntity.ok(ApiResponse.success("register successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ApiResponse.error("register failed"));
        }
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<AuthUserResponse>>> getAll(
            @RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "id,desc") String sort, @RequestParam(required = false) String filter,
            @RequestParam(required = false) String searchField, @RequestParam(required = false) String searchValue,
            @RequestParam(defaultValue = "false") Boolean all, @RequestParam(required = false) String relation,
            @RequestParam(required = false) String nested, @RequestParam(required = false) String field,
            @RequestParam(required = false) List<Long> values,
            @RequestParam(required = false, defaultValue = "NOT_IN") String mode) {
        try {
            RelationModeFilterRequest filterNotIn = null;

            if (relation != null && nested != null && field != null && values != null) {
                filterNotIn = new RelationModeFilterRequest();
                filterNotIn.setRelation(relation);
                filterNotIn.setNested(nested);
                filterNotIn.setField(field);
                filterNotIn.setValues(values);
                filterNotIn.setMode(mode);
            }

            return ResponseEntity.ok(ApiResponse.success(new PageResponse<>(authService.getAll(
                    page, size, sort,
                    searchField,
                    searchValue, filter,
                    all, filterNotIn
                                                                                              ))));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ApiResponse.error("getAll failed"));
        }
    }
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/profile")
    public ResponseEntity<ApiResponse<AuthUserResponse>> profileAccount(){
        try {
            return ResponseEntity.ok(ApiResponse.success(authService.getProfile()));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ApiResponse.
                    error("load error profile account"));
        }
    }

    @GetMapping("/{id}/roles")
    public ResponseEntity<ApiResponse<List<Role>>> getRoles(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(ApiResponse.success(authService.getUserRoles(id)));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ApiResponse.error("getRoles failed"));
        }
    }

    @PostMapping("/{userId}/assign")
    public ResponseEntity<ApiResponse<Void>> assignUser(@PathVariable Long userId, @RequestBody List<Long> roleIds) {
        try {
            authService.assignUsersToRole(userId, roleIds);
            return ResponseEntity.ok(ApiResponse.success("assign users successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ApiResponse.error("assign user failed"));
        }
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<ApiResponse<Void>> changeUserStatus(@PathVariable Long id, @RequestParam Integer status) {
        try {
            authService.changeUserStatus(id, status);
            return ResponseEntity.ok(ApiResponse.success("change user status successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ApiResponse.error("changeUserStatus failed"));
        }
    }
}
