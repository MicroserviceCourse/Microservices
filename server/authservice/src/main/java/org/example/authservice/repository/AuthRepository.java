package org.example.authservice.repository;

import feign.Param;
import org.example.authservice.entity.AuthUser;
import org.example.authservice.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface AuthRepository extends JpaRepository<AuthUser,Long>, JpaSpecificationExecutor<AuthUser> {
    Optional<AuthUser>findByEmail(String email);

    @Query("SELECT  r.role from AuthUserRole r where r.auth.id = :userId")
    List<Role>findRoleByUserId(@Param("userId") Long userId);
}
