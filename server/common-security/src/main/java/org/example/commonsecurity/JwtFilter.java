package org.example.commonsecurity;

import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        // 🔹 Nếu không có token → bỏ qua luôn (cho phép API public hoạt động)
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        // 🔹 Cắt lấy token ra
        String token = authHeader.substring(7);

        try {
            String email = jwtService.extractEmail(token);

            // Nếu email hợp lệ và chưa có authentication trong context
            if (email != null && SecurityContextHolder.getContext().getAuthentication() == null
                    && jwtService.validateToken(token, email)) {

                Claims claims = jwtService.extractClaims(token);
                Object roleObj = claims.get("role");

                List<SimpleGrantedAuthority> authorities = new ArrayList<>();

                // Nếu role là chuỗi hoặc danh sách, đều xử lý được
                if (roleObj instanceof String roleStr) {
                    authorities.add(new SimpleGrantedAuthority("ROLE_" + roleStr));
                } else if (roleObj instanceof List<?> roleList) {
                    authorities.addAll(roleList.stream()
                            .map(Object::toString)
                            .map(r -> new SimpleGrantedAuthority("ROLE_" + r))
                            .collect(Collectors.toList()));
                }

                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(email, null, authorities);
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (Exception e) {
            // 🔴 Token sai hoặc hết hạn → trả về lỗi 401
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid or expired token");
            return;
        }

        // ✅ Cho phép request tiếp tục qua các filter khác
        filterChain.doFilter(request, response);
    }
}
