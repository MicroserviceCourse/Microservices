package org.example.authservice.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
@Configuration
@RequiredArgsConstructor
public class AuthWebSecurityConfig {
    private final OAuth2SuccessHandler oAuth2SuccessHandler;
    @Bean
    @Primary // 🔥 QUAN TRỌNG
    public SecurityFilterChain authSecurityFilterChain(HttpSecurity http) throws Exception {

        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/api/account/login",
                                "/api/account/register",
                                "/oauth2/**",
                                "/login/oauth2/**"
                        ).permitAll()
                        .anyRequest().authenticated()
                )
                // 🔥 OAUTH2 CLIENT (GOOGLE)
                .oauth2Login(oauth->oauth
                        .loginPage("/oauth2/authorization/google")
                        .successHandler(oAuth2SuccessHandler)
                );

        return http.build();
    }
}
