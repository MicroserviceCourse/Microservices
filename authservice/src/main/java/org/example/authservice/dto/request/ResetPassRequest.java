package org.example.authservice.dto.request;

import lombok.Getter;

@Getter
public class ResetPassRequest {
    private String email;
    private String newPassword;
    private String resetKey;
}
