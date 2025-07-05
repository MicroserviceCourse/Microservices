package org.example.banner_service.exception;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper=false)
@Data
public class ErrorHandler extends RuntimeException {
    private HttpStatus status;
    public ErrorHandler(String message) {
        super(message);
    }
    public ErrorHandler(HttpStatus status, String message) {
        super(message);
        this.status = status;
    }
}
