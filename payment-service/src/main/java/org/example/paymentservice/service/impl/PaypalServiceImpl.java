package org.example.paymentservice.service.impl;

import com.paypal.api.payments.*;
import com.paypal.base.rest.PayPalRESTException;
import com.paypal.base.rest.APIContext;
import feign.FeignException;
import org.example.paymentservice.client.CartServiceClient;
import org.example.paymentservice.dto.request.CartDTO;
import org.example.paymentservice.service.PaypalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Locale;

@Service
public class PaypalServiceImpl implements PaypalService {
    @Autowired
    private APIContext apiContext;
    @Autowired
    private CartServiceClient cartServiceClient;

    @Override
    public Payment createPayment(Double total, String currency, String method, String intent, String description, String cancelUrl, String successUrl) throws PayPalRESTException {
        try {
            CartDTO cartDTO=cartServiceClient.getMyCart().getData();

            Amount amount = new Amount();
            amount.setCurrency(currency);
            amount.setTotal(String.format(Locale.US, "%.2f", cartDTO.getTotalPrice()));
            Transaction transaction = new Transaction();
            transaction.setAmount(amount);
            List<Transaction> transactions = List.of(transaction);
            Payer payer = new Payer();
            payer.setPaymentMethod(method.toUpperCase());
            Payment payment = new Payment();
            payment.setIntent(intent);
            payment.setPayer(payer);
            payment.setTransactions(transactions);
            RedirectUrls redirectUrls = new RedirectUrls();
            redirectUrls.setCancelUrl(cancelUrl);
            redirectUrls.setReturnUrl(successUrl);
            payment.setRedirectUrls(redirectUrls);

            return payment.create(apiContext);
        }catch (FeignException e){
            throw new RuntimeException("Không có cart");
        }
    }

    @Override
    public Payment executePayment(String paymentId, String payerId) throws PayPalRESTException {
        Payment payment = new Payment();
        payment.setId(paymentId);
        PaymentExecution execution = new PaymentExecution();
        execution.setPayerId(payerId);
        return payment.execute(apiContext, execution);
    }
}
