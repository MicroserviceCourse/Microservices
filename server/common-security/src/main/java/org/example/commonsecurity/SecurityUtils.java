package org.example.commonsecurity;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class SecurityUtils {

    /**
     * 🔹 Lấy userId từ JWT đã xác thực
     */
    public Long getCurrentUserId() {
        Jwt jwt = getJwtToken();
        return jwt != null ? jwt.getClaim("userId") : null;
    }

    public Long getCurrentShopId() {
        Jwt jwt = getJwtToken();
        return jwt != null ? jwt.getClaim("shopId") : null;
    }

    /**
     * 🔹 Lấy email (subject) từ JWT
     */
    public String getCurrentUserEmail() {
        Jwt jwt = getJwtToken();
        return jwt != null ? jwt.getSubject() : null;
    }

    /**
     * 🔹 Lấy danh sách role từ JWT
     */
    public List<String> getCurrentUserRoles() {
        Jwt jwt = getJwtToken();
        if (jwt == null) return List.of();

        Object roleObj = jwt.getClaim("role");
        if (roleObj instanceof List<?>) {
            return ((List<?>) roleObj).stream()
                    .map(Object::toString)
                    .toList();
        } else if (roleObj instanceof String roleStr) {
            return List.of(roleStr);
        }
        return List.of();
    }

    /**
     * 🔹 Lấy đối tượng Jwt từ SecurityContext hiện tại
     */
    private Jwt getJwtToken() {
        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        if (authentication instanceof JwtAuthenticationToken jwtAuth) {
            return jwtAuth.getToken();
        }
        return null;
    }
}
