package org.example.statistic_service.controller;

import com.netflix.discovery.converters.Auto;
import org.apache.catalina.User;
import org.example.statistic_service.client.OrderClient;
import org.example.statistic_service.client.UserClient;
import org.example.statistic_service.dto.RequestResponse;
import org.example.statistic_service.dto.StatisticOrderRequest;
import org.example.statistic_service.dto.StatisticUserRequest;
import org.example.statistic_service.dto.StatisticUserResponse;
import org.example.statistic_service.exception.ExceptionResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/statistic")
public class StatisticController {

    @Autowired
    private UserClient userClient;

    @Autowired
    private OrderClient orderClient;

    @PostMapping(value = "/statistic-user")
    public ResponseEntity<?> statisticUser( @RequestParam String label,
            @RequestBody StatisticUserRequest request) {
        try {
            return ResponseEntity
                    .ok()
                    .body(userClient.getUserStatistic(label,request));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ExceptionResponse("Đã xảy ra lỗi: " + e.getMessage()));
        }
    }

    @PostMapping(value = "/statistic-order", produces = MediaType.APPLICATION_JSON_VALUE)
    ResponseEntity<?> statisticUser(@RequestParam String label, @RequestParam String orderStatus,
                                    @RequestBody StatisticOrderRequest statisticUserRequest) {
        try {
            return ResponseEntity
                    .ok()
                    .body(orderClient.statisticOrder(label,orderStatus,statisticUserRequest).getBody());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ExceptionResponse("Đã xảy ra lỗi: " + e.getMessage()));
        }
    }

    @PostMapping("/top5-products")
    ResponseEntity<?> getTop5BestSellingProducts(@RequestParam int top,
                                                 @RequestBody StatisticOrderRequest statisticOrderRequest){
        try {
            return ResponseEntity
                    .ok()
                    .body(orderClient.getTop5BestSellingProducts(top, statisticOrderRequest).getBody());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ExceptionResponse("Đã xảy ra lỗi: " + e.getMessage()));
        }
    }
}
