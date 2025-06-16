package org.example.paymentservice.controller;

import org.example.paymentservice.dto.RequestResponse;
import org.example.paymentservice.dto.request.VietQRRequest;
import org.example.paymentservice.exception.ExceptionResponse;
import org.example.paymentservice.service.VnpayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.*;

@RestController
@RequestMapping("/api/vnpay")
public class VnPayController {
    @Autowired
    private VnpayService vnpayService;

    @PostMapping("/vietqr")
    public ResponseEntity<?> generateQR(@RequestBody VietQRRequest request) {
        if (!"970448".equals(request.getAcqId())) {
            return ResponseEntity
                    .badRequest()
                    .body(new RequestResponse("Chỉ hỗ trợ tài khoản OCB (acqId = 970448)", "error"));
        }

        String qrImageUrl = String.format(
                "https://img.vietqr.io/image/%s-%s-print.png?accountName=%s&amount=%d&addInfo=%s",
                request.getAcqId(),
                request.getAccountNo(),
                URLEncoder.encode(request.getAccountName(), StandardCharsets.UTF_8),
                request.getAmount(),
                URLEncoder.encode(request.getAddInfo(), StandardCharsets.UTF_8)
        );

        return ResponseEntity.ok(new RequestResponse(qrImageUrl));
    }

    // 👉 VNPay Payment Endpoint
    @GetMapping("/create-payment")
    public ResponseEntity<?> createPayment(@RequestParam long amount, @RequestParam String info) throws Exception {
        try {
            String paymentUrl = vnpayService.createPaymentUrl(amount, info);
            return ResponseEntity.ok(new RequestResponse(paymentUrl, "Tạo thanh toán VNPAY thành công"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new RequestResponse("Tạo thanh toán VNPAY thất bại" + e.getMessage()));
        }
    }


    // 👉 VNPay Payment Return
    @GetMapping("/payment-return")
    public ResponseEntity<?> paymentReturn(@RequestParam Map<String, String> params) {
        if ("00".equals(params.get("vnp_ResponseCode"))) {
            return ResponseEntity.ok(new RequestResponse("Thanh toán thành công"));
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ExceptionResponse("Thanh toán thất bại hoặc không hợp lệ"));
        }
    }
}
