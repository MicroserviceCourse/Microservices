package org.webvibecourse.commission_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import org.webvibecourse.commission_service.entity.CommissionRule;
@Repository
public interface CommissionRuleRepository extends
        JpaRepository<CommissionRule, Long>,
        JpaSpecificationExecutor<CommissionRule> {
}
