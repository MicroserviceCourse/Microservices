package org.example.authservice.dto.request;
import lombok.*;
@Data
@Getter
@Setter
public class LoginDTO {
private String email;
private String password;
}
