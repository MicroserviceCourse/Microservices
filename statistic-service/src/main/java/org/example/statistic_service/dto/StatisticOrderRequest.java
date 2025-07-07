package org.example.statistic_service.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class StatisticOrderRequest {

    private LocalDateTime timeStart;

    private LocalDateTime timeEnd;

}
