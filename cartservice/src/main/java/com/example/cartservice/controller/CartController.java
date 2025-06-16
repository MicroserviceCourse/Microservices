package com.example.cartservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.cartservice.dto.RequestResponse;
import com.example.cartservice.entity.MyCompositeKey;
import com.example.cartservice.exception.ExceptionResponse;
import com.example.cartservice.service.CartService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/cart")
public class CartController {
    @Autowired
    CartService service;
    @PostMapping("/save")
    public ResponseEntity<?> save(HttpServletRequest request,@RequestParam Integer productId,@RequestParam Integer quantity){
        try{
            return ResponseEntity.ok(new RequestResponse(service.save(request,productId,quantity)));
        }
        catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ExceptionResponse(e.getMessage()));
        }
    }
    @PutMapping("/update")
     public ResponseEntity<?> update(HttpServletRequest request,@RequestParam Integer productId,@RequestParam Integer quantity){
        try{
            return ResponseEntity.ok(new RequestResponse(service.save(request,productId,quantity)));
        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ExceptionResponse(e.getMessage()));
        }
    }
    @GetMapping("/findById")
    public ResponseEntity<?> findById(@ModelAttribute MyCompositeKey key){
        try{
            return ResponseEntity.ok(new RequestResponse(service.findById(key)));
        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ExceptionResponse(e.getMessage()));
        }
    }
    @GetMapping("/yourCart")
    public ResponseEntity<?> yourCart(HttpServletRequest request,Pageable pageable){
        try{
            return ResponseEntity.ok(new RequestResponse(service.yourCart(request,pageable)));
        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ExceptionResponse(e.getMessage()));
        }
    }
    @GetMapping("/findAll")
    public ResponseEntity<?> findAll(Pageable pageable){
        try{
            return ResponseEntity.ok(new RequestResponse(service.findAll(pageable)));
        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ExceptionResponse(e.getMessage()));
        }
    }
}
