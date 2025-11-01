package org.example.authservice.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TokenResponse {
    private String refreshToken;
    private String accessToken;
    private long accessTokenExpiryAt;
    private long refreshTokenExpiryAt;
    private List<String> role;
}
