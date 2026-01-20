package org.webvibe.cart_service.mapper;

import org.mapstruct.Mapper;
import org.webvibe.cart_service.dto.response.CartItemResponse;
import org.webvibe.cart_service.entity.CartItem;

@Mapper(componentModel = "spring")
public interface CartItemMapper {
    CartItemResponse toResponse(CartItem cartItem);
}
