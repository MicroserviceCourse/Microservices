package org.example.authservice.service.impl;

import lombok.RequiredArgsConstructor;
import org.example.authservice.entity.AuthUser;
import org.example.authservice.entity.AuthUserRole;
import org.example.authservice.entity.Role;
import org.example.authservice.repository.AuthRepository;
import org.example.authservice.repository.AuthUserRoleRepository;
import org.example.authservice.repository.RoleRepository;
import org.example.authservice.service.OAuthAccountService;
import org.example.commonutils.util.GenerateUtils;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OAuthAccountServiceImpl implements OAuthAccountService {
    private final AuthRepository authRepository;
    private final RoleRepository roleRepository;
    private final AuthUserRoleRepository authUserRoleRepository;
    private final GenerateUtils generateUtils;

    @Override
    public AuthUser getOrCreateAccount(String email, String fullName) {
        return authRepository.findByEmailWithRoles(email)
                .orElseGet(() -> createNewAccount(email, fullName));
    }
    private AuthUser createNewAccount(String email, String fullName) {

        AuthUser authUser = new AuthUser();
        String password = generateUtils.generateRandomPassword(8);

        authUser.setEmail(email);
        authUser.setPassword(password);
        authUser.setStatus(1);

        authUser = authRepository.save(authUser);

        Role role = roleRepository.findById(4L)
                .orElseThrow(() -> new UsernameNotFoundException("Role not found"));

        AuthUserRole authUserRole = new AuthUserRole();
        authUserRole.setRole(role);
        authUserRole.setAuth(authUser);
        authUserRole.setAssignedBy(authUser.getId().toString());

        authUserRoleRepository.save(authUserRole);

        authUser.setRoles(List.of(authUserRole));

        return authUser;
    }
}
