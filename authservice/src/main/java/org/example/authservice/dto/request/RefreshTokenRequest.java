package org.example.authservice.dto.request;

import lombok.Data;
import lombok.Getter;

@Getter
public class RefreshTokenRequest {
    private String expiredToken;
}
