package org.example.authservice.dto.request;

import lombok.Data;
import lombok.Getter;

@Data
@Getter
public class UserRequest {

    private String userName;

    private long phoneNumber;

    private String address;


}
