package org.example.orderservice.dto.request;

import lombok.Data;

@Data
public class AccountDTO {
    private int id;
    private String email;
    private String password;
    private int idRole;
    private String role;
}
