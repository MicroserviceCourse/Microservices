package org.example.authservice.service.impl;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.github.perplexhub.rsql.RSQLJPASupport;
import lombok.extern.slf4j.Slf4j;
import org.example.authservice.client.UserClient;
import org.example.authservice.dto.request.AuthRegisterRequest;
import org.example.authservice.dto.request.client.UserProfileRequest;
import org.example.authservice.dto.response.AuthUserResponse;
import org.example.authservice.dto.response.RelationModeFilterRequest;
import org.example.authservice.entity.AuthUser;
import org.example.authservice.entity.AuthUserRole;
import org.example.authservice.entity.Role;
import org.example.authservice.mapper.AuthMapper;
import org.example.authservice.repository.AuthRepository;
import org.example.authservice.repository.AuthUserRoleRepository;
import org.example.authservice.repository.RoleRepository;
import org.example.authservice.service.AuthService;
import org.example.commonsecurity.JwtService;
import org.example.commonsecurity.SecurityUtils;
import org.example.commonsecurity.redis.RedisKey;
import org.example.commonsecurity.redis.RedisService;
import org.example.commonutils.util.SearchHelper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
public class AuthServiceImpl implements AuthService {
    private final AuthRepository authRepository;
    private final JwtService jwtService;
    private final AuthMapper authMapper;
    private final PasswordEncoder passwordEncoder;
    private final ObjectMapper objectMapper;
    private static final List<String> SEARCH_FIELDS = List.of("code", "email");
    private final SecurityUtils securityUtils;
    private final RoleRepository roleRepository;
    private final UserClient userClient;
    private final AuthUserRoleRepository authUserRoleRepository;
    private final RedisService redisService;

    @Autowired
    public AuthServiceImpl(
            AuthRepository authRepository, JwtService jwtService, AuthMapper authMapper,
            PasswordEncoder passwordEncoder, SecurityUtils securityUtils, RoleRepository roleRepository,
            UserClient userClient, AuthUserRoleRepository authUserRoleRepository, ObjectMapper objectMapper,
            RedisService redisService
                          ) {
        this.authRepository = authRepository;
        this.authMapper = authMapper;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
        this.securityUtils = securityUtils;
        this.roleRepository = roleRepository;
        this.userClient = userClient;
        this.authUserRoleRepository = authUserRoleRepository;
        this.redisService = redisService;
        this.objectMapper = objectMapper;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<AuthUser> user = authRepository.findByEmail(email);
        return user.orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public void register(AuthRegisterRequest request) {
        try {
            AuthUser user = authMapper.toEntity(request, securityUtils.getCurrentUserId());
            user.setPassword(passwordEncoder.encode(request.getPassword()));

            AuthUser savedUser = authRepository.save(user);

            if (request.getRoleIds() != null) {

                for (Long roleId : request.getRoleIds()) {

                    Role role = roleRepository.findById(roleId).orElseThrow(() -> new UsernameNotFoundException(
                            "Role not found"));

                    AuthUserRole authUserRole = new AuthUserRole();
                    authUserRole.setRole(role);
                    authUserRole.setAuth(savedUser);
                    authUserRole.setAssignedBy(securityUtils.getCurrentUserId().toString());

                    authUserRoleRepository.save(authUserRole);

                }
            }

            UserProfileRequest userProfileRequest = authMapper.toProfileRequest(request);
            userProfileRequest.setAuthId(savedUser.getId());

            userClient.createProfile(userProfileRequest);

        } catch (Exception e) {
            log.error(e.getMessage());
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public Page<AuthUserResponse> getAll(
            Integer page, Integer size, String sort, String searchField, String SearchValue, String filter, boolean all,
            RelationModeFilterRequest relationFilter
                                        ) {
        try {
            log.info("start find all auth");

            // == CACHE KEY ==
            String key = RedisKey.ACCOUNT_INFORMATION + "|" + page + "|" + size + "|" + sort + "|" + searchField +
                         "|" + SearchValue + "|" + filter + "|" + (
                    relationFilter != null ? relationFilter.toString() : ""
            );

            // == CHECK CACHE ==
            if (redisService.exists(key)) {
                Map<String, Object> cache = objectMapper.convertValue(
                        redisService.get(key), new TypeReference<Map<String, Object>>() {
                        }
                                                                     );

                // Lấy content
                List<AuthUserResponse> content = objectMapper.convertValue(
                        cache.get("content"), new TypeReference<List<AuthUserResponse>>() {
                        }
                                                                          );

                // lấy pageable info
                Map<String, Object> pageableMap = (Map<String, Object>) cache.get("pageable");

                int pageNumber = (int) pageableMap.get("pageNumber");
                int pageSize = (int) pageableMap.get("pageSize");

                long total = ((Number) cache.get("totalElements")).longValue();

                return new PageImpl<>(content, PageRequest.of(pageNumber, pageSize), total);

            }

            // == BUILD SPEC ==
            Specification<AuthUser> spec = Specification.where(null);

            if (sort != null && !sort.isEmpty())
                spec = spec.and(RSQLJPASupport.toSort(sort));

            if (filter != null && !filter.isEmpty())
                spec = spec.and(RSQLJPASupport.toSpecification(filter));

            if (SearchValue != null)
                spec = spec.and(SearchHelper.buildSearchSpec(searchField, SearchValue, SEARCH_FIELDS));

            if (relationFilter != null) {

                boolean isNotIn = !"IN".equalsIgnoreCase(relationFilter.getMode());

                spec = spec.and(SearchHelper.relationFieldInOrNotIn(
                        relationFilter.getRelation(),
                        relationFilter.getNested(),
                        relationFilter.getField(),
                        relationFilter.getValues(),
                        isNotIn
                                                                   ));
            }
            Pageable pageable = all ? Pageable.unpaged() : PageRequest.of(page - 1, size);

            Page<AuthUser> pages = authRepository.findAll(spec, pageable);

            List<AuthUserResponse> mapped = pages.stream().map(user -> {
                AuthUserResponse dto = authMapper.toResponse(user);

                try {
                    var profile = userClient.getUserByAuthId(user.getId());
                    if (profile.getData() != null) {
                        dto.setFullName(profile.getData().getFullName());
                        dto.setGender(profile.getData().getGender());
                        dto.setBirthDate(profile.getData().getBirthDate());
                    }
                } catch (Exception ignored) {
                }
                return dto;
            }).collect(Collectors.toList());
            if (SearchValue != null && !SearchValue.isBlank()) {
                List<AuthUserResponse> filtered = mapped.stream().filter(dto -> matchProfile(dto, SearchValue)).collect(
                        Collectors.toList());
                if (!filtered.isEmpty()) {
                    mapped = filtered;
                }
            }


            if (sort != null && !sort.isEmpty()) {
                mapped = sortProfile(mapped, sort);
            }

            Page<AuthUserResponse> finalPage = new PageImpl<>(mapped, pageable, pages.getTotalElements());

            redisService.set(key, finalPage, RedisKey.ACCOUNT_INFORMATION_TTL);

            return finalPage;
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    @Transactional
    public void assignUsersToRole(Long userId, List<Long> roleIds) {
        try {
            log.info("start assign roles for userId {}", userId);

            AuthUser user = authRepository.findById(userId).orElseThrow(() -> new RuntimeException("user not found"));

            authUserRoleRepository.deleteByAuthId(userId);

            List<Role> roles = roleRepository.findAllById(roleIds);

            List<AuthUserRole> authUserRoles = roles.stream().map(role -> {
                AuthUserRole authUserRole = new AuthUserRole();
                authUserRole.setAuth(user);
                authUserRole.setRole(role);
                authUserRole.setAssignedAt(Instant.now());
                authUserRole.setAssignedBy(securityUtils.getCurrentUserId().toString());
                return authUserRole;
            }).toList();

            authUserRoleRepository.saveAll(authUserRoles);

        } catch (Exception e) {
            log.info("Cannot assign roles to user {}:{}", userId, e.getMessage());
            throw new RuntimeException("Failed to assign roles to userId " + userId);
        }
    }

    @Override
    public List<Role> getUserRoles(Long userId) {
        return authRepository.findRoleByUserId(userId);
    }

    @Override
    public void changeUserStatus(Long userId, Integer status) {
        try {
            log.info("start change user status for userId {}", userId);

            AuthUser user = authRepository.getReferenceById(userId);
            user.setStatus(status);
            authRepository.save(user);

            redisService.deleteByPrefix(RedisKey.ACCOUNT_INFORMATION);

            log.info("Cache cleared for prefix {}",
                     RedisKey.ACCOUNT_INFORMATION);

        } catch (Exception e) {
            log.error("Cannot change user status to {}:{}",
                      userId, e.getMessage());
            throw new RuntimeException(
                    "Failed to change user status to " + userId);
        }
    }

    private boolean matchProfile(AuthUserResponse dto, String value) {
        if (value == null || value.isEmpty())
            return true;

        String normalized = value.toLowerCase();

        // fullName
        if (dto.getFullName() != null && dto.getFullName().toLowerCase().contains(normalized)) {
            return true;
        }

        // gender (int)
        if (dto.getGender() != null && dto.getGender().toString().toLowerCase().contains(normalized)) {
            return true;
        }

        // birthDate (LocalDate)
        if (dto.getBirthDate() != null && dto.getBirthDate().toString().contains(value)) {
            return true;
        }

        return false;
    }

    private List<AuthUserResponse> sortProfile(List<AuthUserResponse> list, String sort) {
        boolean asc = !sort.startsWith("-");
        String field = asc ? sort : sort.substring(1);

        Comparator<AuthUserResponse> comparator;

        switch (field) {
            case "fullName":
                comparator = Comparator.comparing(
                        AuthUserResponse::getFullName,
                        Comparator.nullsLast(String.CASE_INSENSITIVE_ORDER)
                                                 );
                break;

            case "gender":
                comparator = Comparator.comparing(AuthUserResponse::getGender, Comparator.nullsLast(Integer::compare));
                break;

            case "birthDate":
                comparator = Comparator.comparing(
                        AuthUserResponse::getBirthDate,
                        Comparator.nullsLast(LocalDate::compareTo)
                                                 );
                break;

            default:
                return list;
        }

        if (!asc) {
            comparator = comparator.reversed();
        }

        return list.stream().sorted(comparator).toList();
    }
}
