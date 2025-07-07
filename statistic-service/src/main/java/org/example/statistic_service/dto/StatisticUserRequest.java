package org.example.statistic_service.dto;

import lombok.*;

import java.time.LocalDateTime;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StatisticUserRequest {
    private LocalDateTime timeStart;
    private LocalDateTime timeEnd;
}

