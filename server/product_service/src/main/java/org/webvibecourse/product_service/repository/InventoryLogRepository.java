package org.webvibecourse.product_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.webvibecourse.product_service.entity.InventoryLog;
@Repository
public interface InventoryLogRepository extends
        JpaRepository<InventoryLog,Long> {
}
