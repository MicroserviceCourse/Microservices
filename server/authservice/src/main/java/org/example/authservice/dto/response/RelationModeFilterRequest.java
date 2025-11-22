package org.example.authservice.dto.response;

import lombok.Data;

import java.util.List;

@Data
public class RelationModeFilterRequest {
    private String relation;   // "roles"
    private String nested;     // "role"
    private String field;      // "id"
    private List<Long> values; // [1]
    private String mode = "NOT_IN";
}
