package org.example.orderservice.exception;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;
@EqualsAndHashCode(callSuper = true)
@Data
public class ErrorHandler extends RuntimeException {
    private HttpStatus status;
    public ErrorHandler(HttpStatus status, String message) {
        super(message);
        this.status = status;
    }
}
