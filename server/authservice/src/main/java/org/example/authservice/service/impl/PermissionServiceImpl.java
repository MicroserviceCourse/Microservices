package org.example.authservice.service.impl;

import io.github.perplexhub.rsql.RSQLJPASupport;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.authservice.dto.request.PermissionRequest;
import org.example.authservice.dto.response.PermissionResponse;
import org.example.authservice.entity.Permission;
import org.example.authservice.mapper.PermissionMapper;
import org.example.authservice.repository.PermissionRepository;
import org.example.authservice.service.PermissionService;
import org.example.commonsecurity.SecurityUtils;
import org.example.commonutils.util.SearchHelper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class PermissionServiceImpl implements PermissionService {
    private final PermissionRepository repository;
    private final PermissionMapper mapper;
    private final SecurityUtils securityUtils;
    private static final List<String> SEARCH_FIELDS = List.of("code", "permissionKey");

    @Override
    public void create(PermissionRequest request) {
        log.info("permission create:{}", request);
        try {
            Permission permission = mapper.toEntity(request, securityUtils.getCurrentUserId());
            repository.save(permission);
            log.info("permission created:{}", permission);
        } catch (Exception e) {
            log.error("Failed to create permission:{}", e.getMessage(), e);
            throw new RuntimeException("Failed to create permission", e);
        }
    }

    @Override
    public void update(Long id, PermissionRequest request) {
        try {
            log.info("permission update:{}", request);
            Permission permission = repository.getReferenceById(id);
            mapper.update(request, permission, securityUtils.getCurrentUserId());
            repository.save(permission);
            log.info("permission updated:{}", permission);
        } catch (EntityNotFoundException e) {
            log.warn("permission with id:{} not found: {}", id, e.getMessage());
            throw new RuntimeException("Failed to update permission", e);
        }
    }

    @Override
    public Page<PermissionResponse> getAll(Integer page, Integer size, String sort, String searchField, String searchValue, String filter, boolean all) {
        try {
            log.info("start to get all permissions");
            Specification<Permission> sortable = RSQLJPASupport.toSort(sort);
            Specification<Permission> filterable = RSQLJPASupport.toSpecification(filter);
            Specification<Permission> searchable = SearchHelper.buildSearchSpec(searchField, searchValue, SEARCH_FIELDS);
            Pageable pageable = all ? Pageable.unpaged() : PageRequest.of(page - 1, size);
            return repository.findAll(sortable.and(filterable).and(searchable.and(filterable)), pageable).map(mapper::toResponse);
        } catch (Exception e) {
            log.error("Failed to get permissions:{}", e.getMessage(), e);
            throw new RuntimeException("Failed to get permissions", e);
        }
    }

    @Override
    public void updateStatus(Long id, Boolean status) {
        try {
            log.info("start to update permission:{}", id);
            Permission permission = repository.getReferenceById(id);
            permission.setIsActive(status);
            repository.save(permission);
            log.info("permission updated:{}", permission);
        } catch (Exception e) {
            log.error("Failed to update status permission:{}", e.getMessage(), e);
            throw new RuntimeException("Failed to update status permission", e);
        }
    }
}
