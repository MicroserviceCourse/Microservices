package org.example.paymentservice.controller;

import org.example.paymentservice.dto.RequestResponse;
import org.example.paymentservice.dto.request.MoMoPaymentRequest;
import org.example.paymentservice.exception.ExceptionResponse;
import org.example.paymentservice.service.MoMoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/momo")
public class MoMoController {
    @Autowired
    private MoMoService moMoService;

    @PostMapping("/pay")
    public ResponseEntity<?> create(@RequestBody MoMoPaymentRequest request) {
        try {
            String payUrl = moMoService.createPayment(request);
            return ResponseEntity.ok(new RequestResponse<>(payUrl, "Tạo thanh toán momo thành công"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ExceptionResponse("Lỗi tạo thanh toán MoMo: " + e.getMessage()));
        }
    }

    @GetMapping("/return")
    public ResponseEntity<?> momoReturn(@RequestParam Map<String, String> params) {
        return ResponseEntity.ok(new RequestResponse<>("Thanh toán thành công"));
    }

    @GetMapping("/notify")
    public ResponseEntity<?> momoNotify(@RequestParam Map<String, String> params) {
        return ResponseEntity.ok(new RequestResponse<>("Thanh toán hoàn tất"));
    }
}
