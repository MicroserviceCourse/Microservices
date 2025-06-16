package org.example.paymentservice.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@Data
public class VnPayConfig {
    public String VNP_TMNCODE = "LKM7C1K2";
    public String VNP_HASH_SECRET = "GD3OERXPV17KKSNOK3AOEWOWPEFV6XF5";
    public String VNP_PAY_URL = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
    public String VNP_RETURN_URL = "http://localhost:8089/api/vnpay/payment-return";


}
