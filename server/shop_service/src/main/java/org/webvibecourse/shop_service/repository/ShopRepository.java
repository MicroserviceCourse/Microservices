package org.webvibecourse.shop_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.webvibecourse.shop_service.entity.Shop;

import java.util.Optional;

public interface ShopRepository extends
        JpaRepository<Shop, Long>,
        JpaSpecificationExecutor<Shop> {

    Optional<Shop> findByOwnerId(Long id);
}
