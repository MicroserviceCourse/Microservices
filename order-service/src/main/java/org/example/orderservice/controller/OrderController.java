package org.example.orderservice.controller;

import org.example.orderservice.dto.RequestResponse;
import org.example.orderservice.dto.request.OrderDTO;
import org.example.orderservice.dto.response.PageResponse;
import org.example.orderservice.entity.Order;
import org.example.orderservice.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/order")
public class OrderController {
    @Autowired
    private OrderService orderService;
    @PostMapping("/create")
    public ResponseEntity<?>create(@RequestHeader("Authorization")String authHeader, @RequestBody OrderDTO orderDTO) {
        try {
            orderService.createOrder(authHeader, orderDTO);
            return ResponseEntity.ok(new RequestResponse<>("Tạo đơn hàng thành công"));
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
    @GetMapping("/all")
    public ResponseEntity<?>getAll(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size){
        try {
            Page<Order>orders = orderService.getAll(page, size);
            Page<OrderDTO>dtoPage=orders.map(orderService::getOrder);
            PageResponse<OrderDTO>response=new PageResponse<>(dtoPage);
            return ResponseEntity.ok(new RequestResponse<>(response,"Danh sách đơn hàng"));
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
