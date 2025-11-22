package org.example.authservice.controller;

import lombok.RequiredArgsConstructor;
import org.example.authservice.dto.request.RoleRequest;
import org.example.authservice.dto.response.PermissionGroupDto;
import org.example.authservice.entity.Role;
import org.example.authservice.service.RoleService;
import org.example.commonutils.api.ApiResponse;
import org.example.commonutils.api.PageResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@RequestMapping("/api/roles")
public class RoleController {
    @Autowired
    private RoleService roleService;

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<Role>>> getAll(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "id,desc") String sort,
            @RequestParam(required = false) String filter,
            @RequestParam(required = false) String searchField,
            @RequestParam(required = false) String searchValue,
            @RequestParam(required = false) boolean all
    ) {
        try {
            return ResponseEntity.ok(ApiResponse.success(new PageResponse<>(roleService.getAll(page, size,sort,searchField,searchValue,filter,all))));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> update(@PathVariable Long id, @RequestBody RoleRequest roleRequest) {
        try {
            roleService.update(id, roleRequest);
            return ResponseEntity.ok(ApiResponse.success("role updated successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/{roleId}/permissions")
    public ResponseEntity<ApiResponse<List<PermissionGroupDto>>> getRolePermissions(
            @PathVariable Long roleId
    ) {
        try {
            return ResponseEntity.ok(ApiResponse.success(roleService.getRolePermissions(roleId)));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }
    @PostMapping("/{roleId}/assign")
    public ResponseEntity<ApiResponse<Void>>assignRole(@PathVariable Long roleId,@RequestBody List<Long> permissionIds) {
        try {
            roleService.assignPermissionsToRole(roleId, permissionIds);
            return ResponseEntity.ok(ApiResponse.success("role assigned successfully"));
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }
}
