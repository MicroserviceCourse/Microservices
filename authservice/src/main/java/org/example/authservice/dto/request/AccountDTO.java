package org.example.authservice.dto.request;
import lombok.*;
@Data
public class AccountDTO {
    private String email;
    private String password;
    private int idRole;
    private String role;
}