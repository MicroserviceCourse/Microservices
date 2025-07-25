package org.example.orderservice.service.Impl;

import feign.FeignException;
import org.example.orderservice.client.AuthServiceClient;
import org.example.orderservice.client.CartServiceClient;
import org.example.orderservice.client.InventoryClient;
import org.example.orderservice.dto.RequestResponse;
import org.example.orderservice.dto.request.*;
import org.example.orderservice.entity.Order;
import org.example.orderservice.entity.OrderItem;
import org.example.orderservice.repository.OrderRepository;
import org.example.orderservice.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private InventoryClient inventoryClient;
    @Autowired
    private AuthServiceClient authServiceClient;
    @Autowired
    private CartServiceClient cartServiceClient;

    @Override
    public Order createOrder(String token, OrderDTO orderDTO) {
        try {
            RequestResponse<AccountDTO>getMyinfo= authServiceClient.getMyInfo(token);
            AccountDTO accountDTO=(AccountDTO) getMyinfo.getData();
            Order order = new Order();
            order.setOrderStatus(orderDTO.getStatus());
            order.setShippingFee(orderDTO.getShippingFee());
            order.setUserId(accountDTO.getId());
            List<OrderItem> orderItems = new ArrayList<OrderItem>();
            BigDecimal totalAmount=new BigDecimal(0);
            for (OrderItemDTO orderItemDTO : orderDTO.getOrderItems()) {
                try {
                    RequestResponse<CartItemDTO> cartItemDTORequestResponse = cartServiceClient.getCart(token, orderItemDTO.getProductId());
                    CartItemDTO cartItemDTO = (CartItemDTO) cartItemDTORequestResponse.getData();
                    OrderItem orderItem = new OrderItem();
                    orderItem.setProductId(cartItemDTO.getId());
                    orderItem.setOrder(order);
                    orderItem.setQuantity(cartItemDTO.getQuantity());
                    orderItem.setTotalPrice(BigDecimal.valueOf(cartItemDTO.getPrice() * cartItemDTO.getQuantity()));
                    orderItems.add(orderItem);
                    totalAmount=totalAmount.add(BigDecimal.valueOf(cartItemDTO.getPrice() * cartItemDTO.getQuantity()));
                } catch (FeignException.NotFound e) {
                    throw new RuntimeException("Order item not found");
                }
            }
            order.setItems(orderItems);
            order.setTotalAmount(totalAmount);
            Order savedOrder = orderRepository.save(order);
            for (OrderItem orderItem : savedOrder.getItems()) {
                InventoryRequest inventoryRequest = new InventoryRequest();
                inventoryRequest.setProductId(orderItem.getProductId());
                inventoryRequest.setQuantity(orderItem.getQuantity());
                inventoryClient.updateInventory(inventoryRequest);
            }
            return order;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public Page<Order> getAll(int page, int size) {
        return orderRepository.findAll(PageRequest.of(page, size));
    }

    @Override
    public OrderDTO getOrder(Order order) {
        OrderDTO orderDTO = new OrderDTO();
        orderDTO.setId(order.getId());
        orderDTO.setStatus(order.getOrderStatus());
        orderDTO.setShippingFee(order.getShippingFee());
        orderDTO.setUserId(order.getUserId());
        orderDTO.setTotalAmount(order.getTotalAmount());
        orderDTO.setOrderItems(new ArrayList<>());

        for (OrderItem orderItem : order.getItems()) {
            OrderItemDTO orderItemDTO = new OrderItemDTO();
            orderItemDTO.setId(orderItem.getId());
            orderItemDTO.setQuantity(orderItem.getQuantity());
            orderItemDTO.setProductId(orderItem.getProductId());
            orderItemDTO.setPrice(orderItem.getTotalPrice());
            orderItemDTO.setTotalPrice(orderItem.getTotalPrice());
            orderDTO.getOrderItems().add(orderItemDTO);
        }

        return orderDTO;
    }

    @Override
    public Page<Order> getByUserId(String token, int page, int size) {
        RequestResponse<AccountDTO>getMyinfo= authServiceClient.getMyInfo(token);
        AccountDTO accountDTO=(AccountDTO) getMyinfo.getData();
        return orderRepository.findByUserId(accountDTO.getId(), PageRequest.of(page, size));
    }
}
