package org.example.authservice.dto.response;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.example.authservice.entity.enu.RoleUser;

@Data
@Getter
@Setter
public class Oauth2Response {

    private String token;

    private RoleUser role;
}
