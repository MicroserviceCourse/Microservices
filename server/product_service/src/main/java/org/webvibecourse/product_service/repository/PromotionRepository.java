package org.webvibecourse.product_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.webvibecourse.product_service.entity.Promotion;

public interface PromotionRepository extends
        JpaRepository<Promotion,Long>,
        JpaSpecificationExecutor<Promotion> {
}
