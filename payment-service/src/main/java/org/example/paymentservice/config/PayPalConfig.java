package org.example.paymentservice.config;

import com.paypal.base.rest.APIContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class PayPalConfig {
    private static final String PAYPAL_CLIENT_ID = "AW0TVjvf0CnmXAgcA8R_4WvR188yiYKzv1vHy7DnyyqTMnPa9051afLMhGxzR026mAd6jqo9hFyJAJFE";
    private static final String PAYPAL_CLIENT_SECRET = "ECt98nfwcq2bTC8S96D2UXV8vG-4zHNlwE2vPGnT3lDPSWKcZgrDSem3fIRDdwuDaJHajB7HWf52qgYq";
    private static final String MODE = "sandbox";

    @Bean
    public APIContext apiContext() {
        APIContext context = new APIContext(PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET, MODE);
        return context;
    }
}
