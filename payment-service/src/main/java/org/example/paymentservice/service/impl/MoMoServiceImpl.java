package org.example.paymentservice.service.impl;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.codec.binary.Hex;
import org.example.paymentservice.config.MoMoConfig;
import org.example.paymentservice.dto.request.MoMoPaymentRequest;
import org.example.paymentservice.service.MoMoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class MoMoServiceImpl implements MoMoService {
    @Autowired
    private MoMoConfig momoConfig;

    @Override
    public String createPayment(MoMoPaymentRequest request) throws Exception {
        String requestId = UUID.randomUUID().toString();
        String orderId = request.getOrderId();
        String requestType = "captureWallet";
        String rawHash = "accessKey=" + momoConfig.getAccessKey()
                + "&amount=" + request.getAmount()
                + "&extraData="
                + "&ipnUrl=" + momoConfig.getNotifyUrl()
                + "&orderId=" + orderId
                + "&orderInfo=" + request.getOrderInfo()
                + "&partnerCode=" + momoConfig.getPartnerCode()
                + "&redirectUrl=" + momoConfig.getReturnUrl()
                + "&requestId=" + requestId
                + "&requestType=" + requestType;
        String signature = hmacSHA256(rawHash, momoConfig.getSecretKey());

        Map<String, Object> payload = new HashMap<>();
        payload.put("partnerCode", momoConfig.getPartnerCode());
        payload.put("accessKey", momoConfig.getAccessKey());
        payload.put("requestId", requestId);
        payload.put("amount", request.getAmount());
        payload.put("orderId", orderId);
        payload.put("orderInfo", request.getOrderInfo());
        payload.put("redirectUrl", momoConfig.getReturnUrl());
        payload.put("ipnUrl", momoConfig.getNotifyUrl());
        payload.put("extraData", "");
        payload.put("requestType", requestType);
        payload.put("signature", signature);
        payload.put("lang", "vi");
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest httpRequest = HttpRequest.newBuilder()
                .uri(URI.create(momoConfig.getEndpoint()))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(new ObjectMapper().writeValueAsString(payload)))
                .build();

        HttpResponse<String> response = client.send(httpRequest, HttpResponse.BodyHandlers.ofString());
        JsonNode jsonNode = new ObjectMapper().readTree(response.body());

        return jsonNode.get("payUrl").asText();
    }

    private String hmacSHA256(String data, String key) throws Exception {
        Mac hmac = Mac.getInstance("HmacSHA256");
        SecretKeySpec secretKeySpec = new SecretKeySpec(key.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
        hmac.init(secretKeySpec);
        byte[] bytes = hmac.doFinal(data.getBytes(StandardCharsets.UTF_8));
        return Hex.encodeHexString(bytes);
    }
}
