package org.example.authservice.service;

import org.example.authservice.dto.request.RoleRequest;
import org.example.authservice.dto.response.PermissionGroupDto;
import org.example.authservice.entity.Role;
import org.springframework.data.domain.Page;

import java.util.List;

public interface RoleService {
    Page<Role> getAll(Integer page, Integer size, String sort, String searchField, String SearchValue, String filter, boolean all);

    void update(Long id, RoleRequest request);

    List<PermissionGroupDto> getRolePermissions(Long roleId);
}
