package org.webvibecourse.shop_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import org.webvibecourse.shop_service.entity.Category;
@Repository
public interface CategoryRepository extends JpaRepository<Category,Long>,
        JpaSpecificationExecutor<Category> {
}
