package org.webvibe.cart_service.service;

import org.springframework.data.domain.Page;
import org.webvibe.cart_service.dto.request.CartItemRequest;
import org.webvibe.cart_service.dto.request.UpdateQuantityCartRequest;
import org.webvibe.cart_service.dto.response.CartItemResponse;
import org.webvibe.cart_service.dto.response.CartResponse;

import java.util.List;

public interface CartService {

    void addCart(CartItemRequest request);

    void removeCart(List<Long> productIds);



    void updateQuantity(List<UpdateQuantityCartRequest> request);

    Integer getCartItemCount();

    CartResponse getCartByUserId();
}
