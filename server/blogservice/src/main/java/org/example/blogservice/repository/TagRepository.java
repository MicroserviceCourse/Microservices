package org.example.blogservice.repository;

import org.example.blogservice.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TagRepository extends JpaRepository<Tag,Long> {
    boolean existsBySlug(String slug);
}
