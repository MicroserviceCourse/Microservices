package org.example.authservice.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
@Configuration
@RequiredArgsConstructor
public class AuthWebSecurityConfig {
    private final OAuth2SuccessHandler oAuth2SuccessHandler;
    @Bean
    @Order(1)
    public SecurityFilterChain authSecurityFilterChain(HttpSecurity http) throws Exception {

        http
                .securityMatcher(
                        "/oauth2/**",
                        "/login/**",
                        "/api/account/login",
                        "/api/account/register"
                )
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth.anyRequest().permitAll())
                // 🔥 OAUTH2 CLIENT (GOOGLE)
                .oauth2Login(oauth -> oauth
                        .loginPage("/oauth2/authorization/google")
                        .successHandler(oAuth2SuccessHandler)
                );

        return http.build();
    }
}
