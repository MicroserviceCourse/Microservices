package org.webvibecourse.product_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import org.webvibecourse.product_service.entity.ProductVariant;
@Repository
public interface ProductVariantRepository extends
        JpaRepository<ProductVariant,Long>,
        JpaSpecificationExecutor<ProductVariant> {
}
