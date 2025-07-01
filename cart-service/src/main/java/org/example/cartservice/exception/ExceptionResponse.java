package org.example.cartservice.exception;

import lombok.Data;

import java.time.LocalDateTime;

/**
 * Lớp này đại diện cho phản hồi lỗi được gửi đến client khi có exception xảy ra.
 * Nó chứa thông tin về trạng thái lỗi, thời gian lỗi xảy ra và thông điệp lỗi.
 */
@Data
public class ExceptionResponse {
    private final String status = "error"; // Trạng thái cố định là "error" để báo lỗi
    private String timestamp; // Thời gian xảy ra lỗi
    private String message;
    private Integer code;

    /**
     * Constructor khởi tạo một phản hồi lỗi với message được cung cấp.
     *
     * @param message Thông báo lỗi (có thể là String hoặc một đối tượng JSON).
     */
    public ExceptionResponse(String message, Integer code) {
        this.timestamp = LocalDateTime.now().toString();
        this.message = message;
        this.code = code;
    }
    public ExceptionResponse(String message) {
        this(message, 400);
    }

}
