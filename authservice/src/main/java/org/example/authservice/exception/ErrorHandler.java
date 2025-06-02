package org.example.authservice.exception;

import org.springframework.http.HttpStatus;
import lombok.*;
@EqualsAndHashCode(callSuper = true)
@Data
public class ErrorHandler extends RuntimeException {
    private HttpStatus status;
    public ErrorHandler(HttpStatus status, String message) {
        super(message);
        this.status = status;
    }
}
