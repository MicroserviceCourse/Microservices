package org.example.commonsecurity;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import java.util.List;

@Component
public class JwtService {
    @Value("${jwt.secret}")
    private String secret;
    @Value("${jwt.access-expiration}")
    private Long accessExpiration;
    @Value("${jwt.refresh-expiration}")
    private Long refreshExpiration;
    private Key getSignKey(){
        return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }
    public String generateAccessToken(String email, Long userId, List<String> role,Long shopId) {
        return buildToken(email,role , accessExpiration,userId,shopId);
    }
    public String generateRefreshToken(String email,Long userId,List<String> role,Long shopId){
        return buildToken(email, role,refreshExpiration,userId,shopId);
    }

    private String buildToken(String email,List<String> role,Long expiration,Long userId,Long shopId){
        return Jwts.builder()
                .setSubject(email)
                .claim("userId",userId)
                .claim("role",role)
                .claim("shopId",shopId)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis()+expiration))
                .signWith(getSignKey(), SignatureAlgorithm.HS256)
                .compact();
    }
    public String extractEmail(String token) {
        return extractClaims(token).getSubject();
    }
    public Long extractUserId(String token) {
        return extractClaims(token).get("id", Long.class);
    }
    public List<String> extractRole(String token) {
        Object roleObj = extractClaims(token).get("role");
        if (roleObj instanceof List<?>) {
            return ((List<?>) roleObj).stream()
                    .map(Object::toString)
                    .toList();
        }
        return List.of();
    }
    public Long getAccessExpiration() {
        return System.currentTimeMillis()+accessExpiration;
    }
    public Long getRefreshExpiration() {
        return System.currentTimeMillis()+refreshExpiration;
    }
    public boolean validateToken(String token, String emailValidate){
        final String email=extractEmail(token);
        return email.equals(emailValidate) && !isTokenExpired(token);
    }
    public boolean isTokenExpired(String token){
        return extractClaims(token).getExpiration().before(new Date());
    }
    public Claims extractClaims(String token){
        return Jwts.parserBuilder()
                .setSigningKey(getSignKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
