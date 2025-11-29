package org.webvibecourse.commission_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(
        scanBasePackages = {
                "org.webvibecourse.commission_service",
                "org.example.commonsecurity"
        }
)
public class CommissionServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(CommissionServiceApplication.class, args);
    }

}
