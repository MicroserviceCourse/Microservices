package org.example.authservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface ModuleRepository extends JpaRepository<org.example.authservice.entity.Module,Long>, JpaSpecificationExecutor<org.example.authservice.entity.Module> {

}
