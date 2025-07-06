package org.example.authservice.controller;

import com.netflix.discovery.converters.Auto;
import org.example.authservice.dto.request.StatisticUserRequest;
import org.example.authservice.dto.response.RequestResponse;
import org.example.authservice.dto.request.UserRequest;
import org.example.authservice.exception.ExceptionResponse;
import org.example.authservice.repository.AccountRepository;
import org.example.authservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private AccountRepository accountRepository;

    @PutMapping(value = "/update-inf")
    public ResponseEntity<?> updateUser(@RequestBody UserRequest userRequest) {
        try {
            userService.updateUser(userRequest);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new RequestResponse("Cập nhật thông tin người dùng thành công"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ExceptionResponse("Đã xảy ra lỗi: " + e.getMessage()));
        }
    }

    @GetMapping(value = "my-inf")
    public ResponseEntity<?> getMyInf() {
        try {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new RequestResponse(userService.getInf()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ExceptionResponse("An error occured: " + e.getMessage()));
        }
    }

    @PostMapping(value = "/statistic-user", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> statisticUser(@RequestBody StatisticUserRequest statisticUserRequest) {
        try {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new RequestResponse(
                            accountRepository.getStatisticUser(
                                    statisticUserRequest.getTimeStart(),
                                    statisticUserRequest.getTimeEnd()
                            ),
                            "Thống kê người dùng thành công"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ExceptionResponse("Đã xảy ra lỗi: " + e.getMessage()));
        }
    }

}
