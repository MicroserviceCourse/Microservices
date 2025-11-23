package org.example.authservice.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AuthUserResponse {
    private Long id;
    private String email;
    private String code;
    private Integer status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String fullName;
    private Integer gender;
    private LocalDate birthDate;
    private List<String> roles;
}
