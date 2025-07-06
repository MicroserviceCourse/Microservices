package org.example.authservice.service;


import jakarta.mail.MessagingException;
import org.springframework.mail.SimpleMailMessage;

import java.io.UnsupportedEncodingException;

public interface EmailService {

    void Sendmail(String from, String to, String text, String sub, String template) throws MessagingException, UnsupportedEncodingException;

    int generateCode();
}
