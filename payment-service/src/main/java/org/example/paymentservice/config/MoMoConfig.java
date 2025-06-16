package org.example.paymentservice.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

@Component
@Data
@Configuration
public class MoMoConfig {
    private String partnerCode = "MOMOOJOI20210710";
    private String accessKey = "iPXneGmrJH0G8FOP";
    private String secretKey = "sFcbSGRSJjwGxwhhcEktCHWYUuTuPNDB";
    private String returnUrl = "http://localhost:4040/api/momo/return";
    private String notifyUrl = "http://localhost:4040/api/momo/notify";
    private String endpoint = "https://test-payment.momo.vn/v2/gateway/api/create";
}
