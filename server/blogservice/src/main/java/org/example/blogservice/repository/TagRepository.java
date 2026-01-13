package org.example.blogservice.repository;

import org.example.blogservice.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface TagRepository extends JpaRepository<Tag,Long>,
        JpaSpecificationExecutor<Tag> {
}
