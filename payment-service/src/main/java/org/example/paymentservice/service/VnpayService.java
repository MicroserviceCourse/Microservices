package org.example.paymentservice.service;

import java.util.Map;

public interface VnpayService {
    String createPaymentUrl(long amount, String orderInfo);

    String hmacSHA512(String key, String data);

}
