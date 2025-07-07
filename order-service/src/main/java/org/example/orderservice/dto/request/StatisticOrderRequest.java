package org.example.orderservice.dto.request;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class StatisticOrderRequest {

    private LocalDateTime timeStart;

    private LocalDateTime timeEnd;

}
