package org.example.orderservice.controller;

import org.example.orderservice.dto.RequestResponse;
import org.example.orderservice.dto.request.FindOrderRequest;
import org.example.orderservice.dto.request.OrderDTO;
import org.example.orderservice.dto.request.StatisticOrderRequest;
import org.example.orderservice.dto.response.OrderStatisticResponse;
import org.example.orderservice.dto.response.PageResponse;
import org.example.orderservice.dto.response.TopProductResponse;
import org.example.orderservice.entity.Order;
import org.example.orderservice.exception.ExceptionResponse;
import org.example.orderservice.repository.OrderRepository;
import org.example.orderservice.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping(value = "/api/order")
public class OrderController {
    @Autowired
    private OrderService orderService;
    @Autowired
    private OrderRepository orderRepository;

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestHeader("Authorization") String authHeader, @RequestBody OrderDTO orderDTO) {
        try {
            orderService.createOrder(authHeader, orderDTO);
            return ResponseEntity.ok(new RequestResponse<>("Tạo đơn hàng thành công"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
    @GetMapping("/getByUser")
    public ResponseEntity<?>getByUser(@RequestHeader("Authorization") String authHeader,@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        try {
            Page<Order>orders=orderService.getByUserId(authHeader, page, size);
            Page<OrderDTO>dtoPage=orders.map(orderService::getOrder);
            PageResponse<OrderDTO>response=new PageResponse<>(dtoPage);
            return ResponseEntity.ok(new RequestResponse<>(response,"Lấy danh sách đơn hang theo user"));
        }catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAll(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        try {
            Page<Order> orders = orderService.getAll(page, size);
            Page<OrderDTO> dtoPage = orders.map(orderService::getOrder);
            PageResponse<OrderDTO> response = new PageResponse<>(dtoPage);
            return ResponseEntity.ok(new RequestResponse<>(response, "Danh sách đơn hàng"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/find-order")
    public ResponseEntity<?> findOrder(@RequestParam int userId, @RequestParam int productId) {
        try {
            List<Order> orders = orderRepository.findOrder(userId, productId);
            boolean exist = false;
            if (orders.isEmpty()) {
                exist = false;
            } else {
                exist = true;
            }
            return ResponseEntity.ok(new RequestResponse<>(exist, "Tồn tại đơn hàng :" + exist));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PostMapping(value = "/statistic-order", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> statisticUser(@RequestParam String label, @RequestParam String orderStatus,
                                           @RequestBody StatisticOrderRequest statisticUserRequest) {
        try {
            List<Object[]> rawResult;
            switch (label.toLowerCase()) {
                case "day" -> rawResult = orderRepository.getOrderStatsByDay(orderStatus,
                        statisticUserRequest.getTimeStart(),
                        statisticUserRequest.getTimeEnd()
                );
                case "month" -> rawResult = orderRepository.getOrderStatsByMonth(orderStatus,
                        statisticUserRequest.getTimeStart(),
                        statisticUserRequest.getTimeEnd()
                );
                case "year" -> rawResult = orderRepository.getOrderStatsByYear(orderStatus,
                        statisticUserRequest.getTimeStart(),
                        statisticUserRequest.getTimeEnd()
                );
                default -> {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                            .body(new ExceptionResponse("Label không hợp lệ: chỉ nhận 'day', 'month', hoặc 'year'"));
                }
            }
            List<OrderStatisticResponse> result = rawResult.stream()
                    .map(row -> new OrderStatisticResponse(
                            row[0].toString(),
                            ((Number) row[1]).longValue(),
                            new BigDecimal(row[2].toString())
                    ))
                    .toList();

            return ResponseEntity.status(HttpStatus.OK)
                    .body(new RequestResponse(result, "Thống kê người dùng thành công"));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ExceptionResponse("Đã xảy ra lỗi: " + e.getMessage()));
        }
    }


    @PostMapping("/top5-products")
    public ResponseEntity<?> getTop5BestSellingProducts(@RequestParam int top,
                                                        @RequestBody StatisticOrderRequest statisticOrderRequest) {
        List<Object[]> raw = orderRepository.findTopBestSellingProductsByTimeRange(
                statisticOrderRequest.getTimeStart(), statisticOrderRequest.getTimeEnd(), top);

        List<TopProductResponse> result = raw.stream()
                .map(row -> new TopProductResponse(
                        (int) row[0],
                        ((Number) row[1]).longValue(),
                        ((Number) row[2]).longValue()
                ))
                .toList();

        return ResponseEntity.ok(new RequestResponse(result, "Top 5 sản phẩm bán chạy nhất"));
    }

}
