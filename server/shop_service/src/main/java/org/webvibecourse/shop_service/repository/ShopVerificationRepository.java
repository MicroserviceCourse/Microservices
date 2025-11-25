package org.webvibecourse.shop_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.webvibecourse.shop_service.entity.ShopVerification;

public interface ShopVerificationRepository extends
        JpaRepository<ShopVerification, Long> {
}
