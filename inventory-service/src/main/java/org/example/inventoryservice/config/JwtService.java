package org.example.inventoryservice.config;

import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;

@Component
public class JwtService {
    private final String key="HarlestXakasjdhh12sadadwqdasdeascfasddacxajkasdjndhwnas";
    private final long MINUTE_EXPIRATION = 60;
    private final long JWT_EXPIRATION = 1000 * 60 * MINUTE_EXPIRATION;
    private Key getSignKey(){
        byte[] keyBytes = Decoders.BASE64.decode(key);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
