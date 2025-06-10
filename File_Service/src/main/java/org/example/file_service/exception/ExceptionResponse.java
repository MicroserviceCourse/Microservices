package org.example.file_service.exception;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ExceptionResponse {
    private final String status = "error"; // Trạng thái cố định là "error" để báo lỗi
    private String timestamp; // Thời gian xảy ra lỗi
    private String message;
    private Integer code;
    public ExceptionResponse(String message, Integer code) {
        this.timestamp = LocalDateTime.now().toString();
        this.message = message;
        this.code = code;
    }
    public ExceptionResponse(String message) {
        this(message, 400);
    }
}
