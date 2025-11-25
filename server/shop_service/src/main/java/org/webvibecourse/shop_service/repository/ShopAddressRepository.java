package org.webvibecourse.shop_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.webvibecourse.shop_service.entity.ShopAddress;

public interface ShopAddressRepository extends
        JpaRepository<ShopAddress, Long> {
}
