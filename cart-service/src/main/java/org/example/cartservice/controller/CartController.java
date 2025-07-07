package org.example.cartservice.controller;

import lombok.RequiredArgsConstructor;
import org.example.cartservice.dto.RequestResponse;
import org.example.cartservice.dto.request.CartDTO;
import org.example.cartservice.dto.request.CartItemDTO;
import org.example.cartservice.dto.response.PageResponse;
import org.example.cartservice.entity.Cart;
import org.example.cartservice.entity.CartItem;
import org.example.cartservice.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {
    @Autowired
    private CartService cartService;

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestHeader("Authorization") String authHeader, @RequestBody CartDTO cartDTO) {
        try {
            cartService.createCart(authHeader, cartDTO);
            return ResponseEntity.ok(new RequestResponse<>("Thêm card"));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new RequestResponse<>("Đã xảy ra lỗi hệ thống"));
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@RequestHeader("Authorization") String authHeader, @RequestBody CartDTO cartDTO) {
        try {
            cartService.updateCart(authHeader, cartDTO);
            return ResponseEntity.ok(new RequestResponse<>("Cập nhật card"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new RequestResponse<>("Đã xảy ra lỗi hệ thống"));
        }
    }

    @DeleteMapping("/removeItem/{id}")
    public ResponseEntity<?> removeItem(@RequestHeader("Authorization") String authHeader, @PathVariable("id") int id) {
        try {
            cartService.removeItemFromCart(authHeader, id);
            return ResponseEntity.ok(new RequestResponse<>("xóa card Item thành công"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new RequestResponse<>("Đã xảy ra lỗi"));
        }
    }

    @GetMapping("/myCart")
    public ResponseEntity<?> getMyCart(@RequestHeader("Authorization") String authHeader, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        try {
            Page<Cart> carts = cartService.findCartByUser(authHeader, page, size);
            Page<CartDTO> dtoPage = carts.map(cartService::todo);
            PageResponse<CartDTO> response = new PageResponse<>(dtoPage);
            return ResponseEntity.ok(new RequestResponse<>(response, "Lấy danh sách card thành công"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new RequestResponse<>("Đã xảy ra lỗi"));
        }
    }

    @GetMapping("/getCartByUserIdAndProductId/{productId}")
    public ResponseEntity<?> getCartByUserIdAndProductId(@RequestHeader("Authorization") String authHeader, @PathVariable("productId") int productId) {
        try {
            CartItem cartItem = cartService.getCartByUserIdAndProductId(authHeader, productId);
            CartItemDTO cartItemDTO = cartService.todoCartItem(cartItem);
            return ResponseEntity.ok(new RequestResponse<>(cartItemDTO, "Lấy danh sách order theo user"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new RequestResponse<>("Đã xảy ra lỗi"));
        }
    }
}
