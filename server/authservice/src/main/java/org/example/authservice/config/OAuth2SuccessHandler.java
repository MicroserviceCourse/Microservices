package org.example.authservice.config;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.example.authservice.entity.AuthUser;
import org.example.authservice.entity.AuthUserRole;
import org.example.authservice.entity.Role;
import org.example.authservice.repository.AuthRepository;
import org.example.authservice.repository.AuthUserRoleRepository;
import org.example.authservice.repository.RoleRepository;
import org.example.authservice.service.OAuthAccountService;
import org.example.commonsecurity.JwtService;
import org.example.commonutils.util.GenerateUtils;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.util.List;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final JwtService jwtService;
    private final AuthRepository authRepository;
    private final RoleRepository roleRepository;
    private final AuthUserRoleRepository authUserRoleRepository;
    private final GenerateUtils generateUtils;
    private final OAuthAccountService oAuthAccountService;
    @Value("${app.oauth2.redirect-uri}")
    private String redirectUri;

    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication)throws IOException, ServletException {
        OAuth2User principal = (OAuth2User) authentication.getPrincipal();
        String provider = ((org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken) authentication)
                .getAuthorizedClientRegistrationId()
                .toUpperCase();
        String email = principal.getAttribute("email");
        if (email == null) {
            email = principal.getAttribute("id") + "@facebook.com";
        }

        String fullName =principal.getAttribute("name");
        final String finalEmail = email;
        AuthUser account = oAuthAccountService.getOrCreateAccount(finalEmail, fullName);

        List<String> roles =
                account.getRoles().stream().map(authUserRole -> authUserRole.getRole().getName()).toList();
        String accessToken = jwtService.generateAccessToken(
                account.getEmail(),
                account.getId(),
                roles,
                null
        );

        String refreshToken = jwtService.generateRefreshToken(
                account.getEmail(),
                account.getId(),
                roles,
                null
        );
        long accessTokenExpiryAt = jwtService.getAccessExpiration();
        long refreshTokenExpiryAt = jwtService.getRefreshExpiration();
        String targetUrl = UriComponentsBuilder.fromUriString(redirectUri)
                .queryParam("accessToken", accessToken)
                .queryParam("refreshToken", refreshToken)
                .queryParam("accessTokenExpiryAt",accessTokenExpiryAt)
                .queryParam("refreshTokenExpiryAt",refreshTokenExpiryAt)
                .build()
                .toUriString();
        getRedirectStrategy().sendRedirect(request,response,targetUrl);
    }
}
