package org.webvibecourse.commission_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.webvibecourse.commission_service.entity.CommissionPayout;
@Repository
public interface CommissionPayoutRepository extends JpaRepository<CommissionPayout, Long> {
}
