package org.example.statistic_service.client;

import org.example.statistic_service.dto.StatisticOrderRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "order-service", url = "http://localhost:8085/api/order")
public interface OrderClient {

    @PostMapping(value = "/statistic-order", produces = MediaType.APPLICATION_JSON_VALUE)
    ResponseEntity<?> statisticOrder(@RequestParam String label, @RequestParam String orderStatus,
                                           @RequestBody StatisticOrderRequest statisticUserRequest) ;


    @PostMapping("/top5-products")
    ResponseEntity<?> getTop5BestSellingProducts(@RequestParam int top, @RequestBody StatisticOrderRequest statisticOrderRequest);
}
