package org.example.orderservice.service;

import org.example.orderservice.dto.request.OrderDTO;
import org.example.orderservice.entity.Order;
import org.springframework.data.domain.Page;

import java.util.List;

public interface OrderService {
    Order createOrder(String token,OrderDTO orderDTO);
    Page<Order> getAll(int page, int size);
    OrderDTO getOrder(Order order);
    Page<Order>getByUserId(String token, int page, int size);
}
