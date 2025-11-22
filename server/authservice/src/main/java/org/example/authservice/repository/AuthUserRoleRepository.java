package org.example.authservice.repository;

import org.example.authservice.entity.AuthUserRole;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthUserRoleRepository extends JpaRepository<AuthUserRole,Long> {
    void deleteByAuthId(Long authId);
}
