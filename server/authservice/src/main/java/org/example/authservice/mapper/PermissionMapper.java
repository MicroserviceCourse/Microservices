package org.example.authservice.mapper;

import org.example.authservice.dto.request.PermissionRequest;
import org.example.authservice.dto.response.PermissionResponse;
import org.example.authservice.entity.Permission;
import org.example.authservice.mapper.common.CommonMapper;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface PermissionMapper extends CommonMapper {
    @Mapping(target = "module", source = "request.idModule", qualifiedByName = "mapModuleFromId")
    @Mapping(target = "createdBy",source = "userId")
    @Mapping(target = "updatedBy",source = "userId")
    Permission toEntity(PermissionRequest request,Long userId);
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "module", source = "request.idModule", qualifiedByName = "mapModuleFromId")
    @Mapping(target = "updatedBy",source = "userId")
    void update(PermissionRequest request, @MappingTarget Permission permission,Long userId);
    @Mapping(target = "moduleName",source = "module.name")
    @Mapping(target = "moduleId",source = "module.id")
    PermissionResponse toResponse(Permission permission);
}
