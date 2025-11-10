package org.example.authservice.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ModuleRequest {
    @NotNull(message = "Name is required")
    private String name;

}
