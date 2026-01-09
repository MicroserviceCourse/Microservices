package org.webvibecourse.product_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.webvibecourse.product_service.entity.Inventory;
@Repository
public interface InventoryRepository extends
        JpaRepository<Inventory,Long> {
}
