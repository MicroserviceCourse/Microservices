package org.webvibecourse.media_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(
    scanBasePackages = {"org.webvibecourse.media_service", "org.example.commonsecurity"})
public class MediaServiceApplication {

  public static void main(String[] args) {
    SpringApplication.run(MediaServiceApplication.class, args);
  }
}
