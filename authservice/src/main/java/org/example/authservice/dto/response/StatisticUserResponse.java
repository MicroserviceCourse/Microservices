package org.example.authservice.dto.response;

import lombok.Getter;
import lombok.Setter;

public interface StatisticUserResponse {
    Long getUsers_on_input();
    Long getTotal_users();
}

