package org.example.paymentservice.controller;

import org.example.paymentservice.dto.RequestResponse;
import org.example.paymentservice.dto.request.VietQRRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@RestController
@RequestMapping("/api/vietqr")
public class VietQRController {
    @PostMapping("/generate")
    public ResponseEntity<?> generateQr(@RequestBody VietQRRequest request) {
        String qrImageUrl = String.format(
                "https://img.vietqr.io/image/%s-%s-print.png?accountName=%s&amount=%d&addInfo=%s",
                request.getAcqId(),
                request.getAccountNo(),
                URLEncoder.encode(request.getAccountName(), StandardCharsets.UTF_8),
                request.getAmount(),
                URLEncoder.encode(request.getAddInfo(), StandardCharsets.UTF_8)
        );

        return ResponseEntity.ok(new RequestResponse(qrImageUrl, "Tạo QR thanh toán"));
    }
}
