package org.example.authservice.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PermissionItemDto {
    private Long id;
    private String permissionKey;
    private String description;
    boolean checked;
}
