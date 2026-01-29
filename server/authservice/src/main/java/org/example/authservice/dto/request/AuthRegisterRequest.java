package org.example.authservice.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthRegisterRequest {
    private String email;
    private String password;
    private List<Long>roleIds;
    private String fullName;
    private Integer gender;
    private String phone;
    private LocalDate birthDate;
}
