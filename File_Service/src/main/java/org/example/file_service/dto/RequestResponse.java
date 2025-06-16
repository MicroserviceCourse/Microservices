package org.example.file_service.dto;

import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 * DTO dùng để phản hồi các request với thông tin trạng thái, thời gian và thông báo.
 */
@Getter
@Setter
public class RequestResponse {

    private String status;
    private String timestamp;
    private String message;

    /**
     * Tạo phản hồi với thông điệp tùy chọn. Mặc định trạng thái là "success" và timestamp là thời gian hiện tại.
     * @param message thông điệp phản hồi
     */
    public RequestResponse(String message) {
        this.status = "success";
        this.timestamp = LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME);
        this.message = message != null ? message : "";
    }
}
