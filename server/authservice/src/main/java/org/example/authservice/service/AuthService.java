package org.example.authservice.service;

import org.example.authservice.dto.request.AuthRegisterRequest;
import org.example.authservice.dto.response.AuthUserResponse;
import org.example.authservice.dto.response.RelationModeFilterRequest;
import org.example.authservice.entity.Role;
import org.springframework.data.domain.Page;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface AuthService extends UserDetailsService {
    void register(AuthRegisterRequest request);

    Page<AuthUserResponse>getAll(Integer page, Integer size, String sort, String searchField, String SearchValue, String filter, boolean all, RelationModeFilterRequest filterNotIn);

    void assignUsersToRole(Long userId, List<Long> roleIds);

    List<Role>getUserRoles(Long userId);
}
