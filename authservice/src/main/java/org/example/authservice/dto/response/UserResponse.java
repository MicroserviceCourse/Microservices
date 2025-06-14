package org.example.authservice.dto.response;

import lombok.Data;
import lombok.Getter;

@Data
@Getter
public class UserResponse {

    private String userName;

    private long phoneNumber;

    private String address;


}
