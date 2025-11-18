package org.example.blogservice.repository;

import org.example.blogservice.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    boolean existsBySlug(String slug);
}

