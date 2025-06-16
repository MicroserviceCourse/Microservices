package org.example.authservice.service.impl;

import org.example.authservice.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class EmailServiceImplement implements EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Override
    public SimpleMailMessage Sendmail( String from, String to, String text, String sub){
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setTo(to);
        simpleMailMessage.setText(text);
        simpleMailMessage.setFrom(from);
        simpleMailMessage.setSubject(sub);
        simpleMailMessage.setSentDate(new Date());

        javaMailSender.send(simpleMailMessage);
        return simpleMailMessage;
    }

    @Override
    public int generateCode() {
        int code = (int) (Math.random() * 999999) + 1;
        return code;
    }

}
