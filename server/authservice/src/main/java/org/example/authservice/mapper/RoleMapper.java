package org.example.authservice.mapper;

import org.example.authservice.dto.request.RoleRequest;
import org.example.authservice.entity.Role;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface RoleMapper {
    @Mapping(target = "updatedBy",source = "userId")
    void update(RoleRequest request, @MappingTarget Role role,Long userId);
}
