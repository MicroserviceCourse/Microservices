package org.example.authservice.service.impl;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.thymeleaf.context.Context;
import org.example.authservice.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;

import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.Locale;

@Service
public class EmailServiceImplement implements EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private TemplateEngine templateEngine;

    @Override
    public void Sendmail(String from, String to, String text, String sub, String template) throws MessagingException, UnsupportedEncodingException {

        Context context = new Context(Locale.US);
        System.out.println("Text content: " + text);
        context.setVariable("data", text);

        String htmlContent = templateEngine.process(template, context);
        System.out.println("Processed HTML: " + htmlContent);

        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
        helper.setTo(to);
        helper.setFrom(from, "WISDOM-GALAXY");
        helper.setSubject(sub);
        helper.setSentDate(new Date());
        helper.setText(htmlContent, true);
        javaMailSender.send(mimeMessage);
    }

    @Override
    public int generateCode() {
        int code = (int) (Math.random() * 999999) + 1;
        return code;
    }

}
