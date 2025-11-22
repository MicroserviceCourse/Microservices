package org.example.blogservice;

import org.example.commonsecurity.JwtService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Import;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication(scanBasePackages = {
        "org.example.blogservice",
        "org.example.authservice",
        "org.example.commonsecurity"
})
@EnableFeignClients

public class BlogserviceApplication {

	public static void main(String[] args) {
		SpringApplication.run(BlogserviceApplication.class, args);
	}

}
