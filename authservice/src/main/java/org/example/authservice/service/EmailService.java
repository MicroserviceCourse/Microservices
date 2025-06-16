package org.example.authservice.service;


import org.springframework.mail.SimpleMailMessage;

public interface EmailService {

    SimpleMailMessage Sendmail(String from, String to, String text, String sub);

    int generateCode();
}
