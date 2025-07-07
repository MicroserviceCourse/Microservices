package org.example.authservice.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserStatisticResponse {
    private String label;
    private long count;

    public UserStatisticResponse(String label, long count) {
        this.label = label;
        this.count = count;
    }
}
