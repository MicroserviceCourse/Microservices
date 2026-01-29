package org.example.authservice.dto.request.client;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserProfileRequest {
    private String fullName;
    private Integer gender;
    private LocalDate birthDate;
    private Long authId;
    private String phone;
}
