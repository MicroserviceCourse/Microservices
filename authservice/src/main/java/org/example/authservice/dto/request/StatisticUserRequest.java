package org.example.authservice.dto.request;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class StatisticUserRequest {

    private LocalDateTime timeStart;

    private LocalDateTime timeEnd;

}
