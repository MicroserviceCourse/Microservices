package org.example.authservice.dto.request;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class AuthCodeRequest {
    private String email;
    private int code;
}
