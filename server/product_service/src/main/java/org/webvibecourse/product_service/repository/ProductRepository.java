package org.webvibecourse.product_service.repository;

import feign.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.webvibecourse.product_service.entity.Product;

import java.util.List;

@Repository
public interface ProductRepository extends
        JpaRepository<Product,Long>,
        JpaSpecificationExecutor<Product> {
    @Query("""
    SELECT v.product.id, COUNT(v)
    FROM ProductVariant v
    WHERE v.product.id IN :productIds
    GROUP BY v.product.id
""")
    List<Object[]> countByProductIds(@Param("productIds") List<Long> productIds);
}
