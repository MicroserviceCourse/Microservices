package org.example.paymentservice.service;

import org.example.paymentservice.dto.request.MoMoPaymentRequest;

public interface MoMoService {
    String createPayment(MoMoPaymentRequest request) throws Exception;
}
