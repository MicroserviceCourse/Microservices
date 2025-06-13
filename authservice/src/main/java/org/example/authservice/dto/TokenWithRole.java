package org.example.authservice.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TokenWithRole {
    private String token;
    private String role;
}
