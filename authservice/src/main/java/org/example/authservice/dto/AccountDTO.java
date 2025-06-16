package org.example.authservice.dto;
import lombok.*;
@Data
public class AccountDTO {
    private String email;
    private String password;
    private int idRole;
    private String role;
}