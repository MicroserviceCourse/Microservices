package org.example.paymentservice.controller;

import com.paypal.api.payments.Links;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;
import org.example.paymentservice.dto.RequestResponse;
import org.example.paymentservice.dto.request.PaypalPaymentRequest;
import org.example.paymentservice.exception.ExceptionResponse;
import org.example.paymentservice.service.PaypalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/pay-pal")
public class PayPayController {
    @Autowired
    private PaypalService paypalService;

    @PostMapping("/pay")
    public ResponseEntity<?> pay(@RequestBody PaypalPaymentRequest request) {
        try {
            Payment payment = paypalService.createPayment(
                    request.getTotal(),
                    request.getCurrency(),
                    request.getMethod(),
                    request.getIntent(),
                    request.getDescription(),
                    "http://localhost:8089/api/pay-pal/cancel",
                    "http://localhost:8089/api/pay-pal/success"
            );
            for (Links link : payment.getLinks()) {
                if (link.getRel().equals("approval_url")) {
                    return ResponseEntity.ok(new RequestResponse(link.getHref(), "Tạo thanh toán paypal thành công"));
                }
            }
            return ResponseEntity.badRequest().body(new ExceptionResponse("No redirect URL found."));
        } catch (PayPalRESTException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ExceptionResponse("lỗi: " + e.getMessage()));
        }
    }

    @GetMapping("/success")
    public ResponseEntity<?> success(@RequestParam String paymentId, @RequestParam String PayerID) {
        try {
            Payment payment = paypalService.executePayment(paymentId, PayerID);
            if (payment.getState().equals("approved")) {
                return ResponseEntity.ok(new RequestResponse("Thanh toán paypal thành công"));
            }
        } catch (PayPalRESTException e) {
            return ResponseEntity.status(500).body(new ExceptionResponse("Payment execution failed"));
        }
        return ResponseEntity.badRequest().body(new ExceptionResponse("Payment not Approved"));
    }

    @GetMapping("/cancel")
    public ResponseEntity<?> cancel() {
        return ResponseEntity.badRequest().body(new ExceptionResponse("Thanh toán paypal thất bại"));
    }
}
