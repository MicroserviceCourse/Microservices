package org.example.paymentservice.controller;

import org.example.paymentservice.dto.RequestResponse;

import org.example.paymentservice.exception.ExceptionResponse;
import org.example.paymentservice.service.VnpayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;

import java.util.*;

@RestController
@RequestMapping("/api/vnpay")
public class VnPayController {
    @Autowired
    private VnpayService vnpayService;



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
