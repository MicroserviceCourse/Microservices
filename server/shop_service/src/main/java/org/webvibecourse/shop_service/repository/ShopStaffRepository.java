package org.webvibecourse.shop_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.webvibecourse.shop_service.entity.ShopStaff;

public interface ShopStaffRepository extends
        JpaRepository<ShopStaff, Long> {
}
