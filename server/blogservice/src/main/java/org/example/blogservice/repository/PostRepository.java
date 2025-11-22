package org.example.blogservice.repository;

import org.example.blogservice.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {
    boolean existsBySlug(String slug);
}
