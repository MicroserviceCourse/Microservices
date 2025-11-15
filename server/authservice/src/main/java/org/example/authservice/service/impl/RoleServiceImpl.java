package org.example.authservice.service.impl;

import io.github.perplexhub.rsql.RSQLJPASupport;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.authservice.dto.request.RoleRequest;
import org.example.authservice.dto.response.PermissionGroupDto;
import org.example.authservice.entity.Permission;
import org.example.authservice.entity.Role;
import org.example.authservice.entity.RolePermission;
import org.example.authservice.mapper.PermissionAssignMapper;
import org.example.authservice.mapper.RoleMapper;
import org.example.authservice.repository.PermissionRepository;
import org.example.authservice.repository.RolePermissionRepository;
import org.example.authservice.repository.RoleRepository;
import org.example.authservice.service.RoleService;
import org.example.commonsecurity.SecurityUtils;
import org.example.commonutils.util.SearchHelper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Arrays;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class RoleServiceImpl implements RoleService {
    private static final List<String> SEARCH_FIELDS = Arrays.asList("name", "code");
    private final RoleRepository roleRepository;
    private final RoleMapper roleMapper;
    private final SecurityUtils securityUtils;
    private final PermissionAssignMapper permissionAssignMapper;
    private final PermissionRepository permissionRepository;
    private final RolePermissionRepository rolePermissionRepository;

    @Override
    public Page<Role> getAll(Integer page, Integer size, String sort, String searchField, String SearchValue, String filter, boolean all) {
        try {
            log.info("start find all role");
            Specification<Role> sortable = RSQLJPASupport.toSort(sort);
            Specification<Role> filterable = RSQLJPASupport.toSpecification(filter);
            Specification<Role> searchable = SearchHelper.buildSearchSpec(searchField, SearchValue, SEARCH_FIELDS);
            Pageable pageable = all ? Pageable.unpaged() : PageRequest.of(page - 1, size);
            return roleRepository.findAll(sortable.and(filterable).and(searchable.and(filterable)), pageable);
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public void update(Long id, RoleRequest request) {
        try {
            log.info("start update role");
            Role role = roleRepository.getReferenceById(id);
            roleMapper.update(request, role, securityUtils.getCurrentUserId());
            roleRepository.save(role);
            log.info("role updated");
        } catch (EntityNotFoundException e) {
            log.error("Role with id {} not found", id);
        }
    }

    @Override
    public List<PermissionGroupDto> getRolePermissions(Long roleId) {
        try {
            log.info("Start to get Permissions for roleId {}", roleId);
            List<Permission> allPermissions = permissionRepository.findAll();
            List<RolePermission> rolePermissions = rolePermissionRepository.findByRoleId(roleId);
            List<PermissionGroupDto> result =
                    permissionAssignMapper.toPermissionGroups(allPermissions, rolePermissions);
            log.info("Loaded {} modules with permissions for roleId {}", result.size(), roleId);
            return result;
        } catch (Exception e) {
            log.error("Failed to get permissions for roleId={}:{}", roleId, e.getMessage(), e);
            throw new RuntimeException("Failed to get role permissions", e);
        }
    }

    @Override
    @Transactional
    public void assignPermissionsToRole(Long roleId, List<Long> permissionIds) {
        try {
            log.info("Start to assign permissions for roleId {}", roleId);
            Role role = roleRepository.findById(roleId)
                    .orElseThrow(() -> new RuntimeException("Role not found"));
            rolePermissionRepository.deleteByRoleId(roleId);
            List<Permission> permissions = permissionRepository.findAllById(permissionIds);
            List<RolePermission> rolePermissions = permissions.stream()
                    .map(permission -> {
                        RolePermission rolePermission = new RolePermission();
                        rolePermission.setRole(role);
                        rolePermission.setPermission(permission);
                        rolePermission.setGrantedAt(Instant.now());
                        rolePermission.setGrantedBy(securityUtils.getCurrentUserId().toString());
                        return rolePermission;
                    }).toList();
            rolePermissionRepository.saveAll(rolePermissions);
            log.info("Assigned {} permissions for roleId {}", permissions.size(), roleId);
        } catch (Exception e) {
            log.error("Failed to assign permissions for roleId={}:{}", roleId, e.getMessage(), e);
            throw new RuntimeException("Failed to assign permissions for roleId=" + roleId, e);
        }
    }
}
