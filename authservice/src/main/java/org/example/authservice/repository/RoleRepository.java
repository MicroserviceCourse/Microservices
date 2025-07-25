package org.example.authservice.repository;

import org.example.authservice.entity.Role;
import org.example.authservice.entity.enu.RoleUser;
import org.example.authservice.generic.IRepository;

public interface RoleRepository extends IRepository<Role, Integer> {

    Role findByRoleName(RoleUser name);
}
