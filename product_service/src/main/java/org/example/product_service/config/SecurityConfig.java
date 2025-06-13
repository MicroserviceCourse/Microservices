package org.example.product_service.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    private final JwtAuthorizationFilter jwtAuthorizationFilter;
    public SecurityConfig(final JwtAuthorizationFilter jwtAuthorizationFilter) {
        this.jwtAuthorizationFilter = jwtAuthorizationFilter;
    }
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        .requestMatchers(HttpMethod.POST,APIURL.URL_ADMIN_POST).hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, APIURL.URL_ADMIN_DELETE).hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, APIURL.URL_ADMIN_PUT).hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET,APIURL.URL_ANONYMOUS_GET).permitAll()
                        .anyRequest().authenticated()
                )
                .addFilterAfter(jwtAuthorizationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
