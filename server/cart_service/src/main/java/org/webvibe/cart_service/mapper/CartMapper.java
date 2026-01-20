package org.webvibe.cart_service.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.webvibe.cart_service.dto.response.CartResponse;
import org.webvibe.cart_service.entity.Cart;

@Mapper(componentModel = "spring",uses = {CartItemMapper.class})
public interface CartMapper {
    @Mapping(target = "cartItems",source = "cartItems")
    CartResponse toResponse(Cart cart);
}
