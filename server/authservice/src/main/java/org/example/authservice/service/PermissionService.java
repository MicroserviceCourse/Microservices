package org.example.authservice.service;

import org.example.authservice.dto.request.PermissionRequest;
import org.example.authservice.dto.response.PermissionResponse;
import org.springframework.data.domain.Page;

public interface PermissionService {
    void create(PermissionRequest request);

    void update(Long id, PermissionRequest request);

    Page<PermissionResponse> getAll(Integer page, Integer size, String sort, String searchField, String searchValue, String filter, boolean all);

    void updateStatus(Long id,Boolean status);
}
