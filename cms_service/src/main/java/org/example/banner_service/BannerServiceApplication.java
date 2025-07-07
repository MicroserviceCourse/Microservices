package org.example.banner_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients(basePackages = "org.example.banner_service")
public class BannerServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(BannerServiceApplication.class, args);
	}

}
