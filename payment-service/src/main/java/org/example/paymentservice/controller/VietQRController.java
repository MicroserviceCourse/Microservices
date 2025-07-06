package org.example.paymentservice.controller;

import feign.FeignException;
import org.example.paymentservice.client.CartServiceClient;
import org.example.paymentservice.dto.RequestResponse;
import org.example.paymentservice.dto.request.CartDTO;
import org.example.paymentservice.dto.request.VietQRRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@RestController
@RequestMapping("/api/vietqr")
public class VietQRController {
    @Autowired
    private CartServiceClient cartService;
    @PostMapping("/generate")
    public ResponseEntity<?> generateQr(@RequestBody VietQRRequest request) {
        try {
            CartDTO cartDTO=cartService.getMyCart().getData();
            String qrImageUrl = String.format(
                    "https://img.vietqr.io/image/%s-%s-print.png?accountName=%s&amount=%d&addInfo=%s",
                    request.getAcqId(),
                    request.getAccountNo(),
                    URLEncoder.encode(request.getAccountName(), StandardCharsets.UTF_8),
                    cartDTO.getTotalPrice().longValue(),
                    URLEncoder.encode(request.getAddInfo(), StandardCharsets.UTF_8)
            );

            return ResponseEntity.ok(new RequestResponse<>(qrImageUrl, "Tạo QR thanh toán"));
        }catch (FeignException e){
            throw new RuntimeException("Không thể xem product");
        }

    }
}
