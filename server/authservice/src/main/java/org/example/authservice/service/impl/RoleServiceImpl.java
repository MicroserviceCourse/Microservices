package org.example.authservice.service.impl;

import io.github.perplexhub.rsql.RSQLJPASupport;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.authservice.dto.request.RoleRequest;
import org.example.authservice.entity.Role;
import org.example.authservice.mapper.RoleMapper;
import org.example.authservice.repository.RoleRepository;
import org.example.authservice.service.RoleService;
import org.example.commonsecurity.SecurityUtils;
import org.example.commonutils.util.SearchHelper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

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
            roleMapper.update(request, role,securityUtils.getCurrentUserId());
            roleRepository.save(role);
            log.info("role updated");
        }catch (EntityNotFoundException e) {
            log.error("Role with id {} not found", id);
        }
    }
}
