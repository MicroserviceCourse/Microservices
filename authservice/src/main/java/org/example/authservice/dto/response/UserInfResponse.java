package org.example.authservice.dto.response;

import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserInfResponse {

    private String email;

    private String userName;

    private long phoneNumber;

    private String address;
}
