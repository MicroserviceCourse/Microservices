package org.webvibe.cart_service.controller;

import lombok.RequiredArgsConstructor;
import org.example.commonutils.api.ApiResponse;
import org.example.commonutils.api.PageResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.webvibe.cart_service.dto.request.CartItemRequest;
import org.webvibe.cart_service.dto.request.UpdateQuantityCartRequest;
import org.webvibe.cart_service.dto.response.CartResponse;
import org.webvibe.cart_service.service.CartService;

import java.util.List;

@RestController
@RequestMapping("/api/carts")
@RequiredArgsConstructor
public class CartController {

    private final CartService service;

    @PostMapping
    public ResponseEntity<ApiResponse<Void>>add(@RequestBody CartItemRequest request){
        try {
            service.addCart(request);
            return ResponseEntity.ok(ApiResponse.success("Add cart successfully"));
        }catch (Exception e){
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<ApiResponse<CartResponse>> getMyCart(

    ){
        return ResponseEntity.ok(ApiResponse.success(service.getCartByUserId()));
    }

    @PatchMapping
    public ResponseEntity<ApiResponse<Void>>updateQuantity(@RequestBody List<UpdateQuantityCartRequest> request){
        try {
            service.updateQuantity(request);
            return ResponseEntity.ok(ApiResponse.success("Update Cart successfully"));
        }catch (ResponseStatusException e){
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error(e.getReason()));
        } catch (Exception e){
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/count")
    public ResponseEntity<ApiResponse<Integer>>countCartItem(){
        try {
            return ResponseEntity.ok(ApiResponse.success(service.getCartItemCount()));
        }catch (Exception e){
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error(e.getMessage()));
        }
    }

    @DeleteMapping
    public ResponseEntity<ApiResponse<Void>> removeItem(@RequestBody List<Long> id){
        try {
            service.removeCart(id);
            return ResponseEntity.ok(ApiResponse.success("remove item successfully"));
        }catch (Exception e){
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error(e.getMessage()));
        }
    }


}
