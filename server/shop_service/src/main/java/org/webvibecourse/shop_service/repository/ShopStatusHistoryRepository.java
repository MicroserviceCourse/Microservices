package org.webvibecourse.shop_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.webvibecourse.shop_service.entity.ShopStatusHistory;

public interface ShopStatusHistoryRepository extends
        JpaRepository<ShopStatusHistory, Long>,
        JpaSpecificationExecutor<ShopStatusHistory> {
}
