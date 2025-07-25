package org.example.authservice.repository;

import org.example.authservice.entity.InvalidateToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface InvalidateTokenrepository extends JpaRepository<InvalidateToken, Integer> {
    Optional<InvalidateToken> findByTokenId(String id);
}
