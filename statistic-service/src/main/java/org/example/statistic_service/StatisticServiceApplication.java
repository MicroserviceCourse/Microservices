package org.example.statistic_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients(basePackages = "org.example.statistic_service.client")
public class StatisticServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(StatisticServiceApplication.class, args);
    }

}
