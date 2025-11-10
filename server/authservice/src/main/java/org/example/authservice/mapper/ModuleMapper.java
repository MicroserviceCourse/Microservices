package org.example.authservice.mapper;

import org.example.authservice.dto.request.ModuleRequest;
import org.example.authservice.dto.response.ModuleResponse;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface ModuleMapper {
    @Mapping(target = "createdBy",source = "userId")
    @Mapping(target = "updatedBy",source = "userId")
    org.example.authservice.entity.Module toEntity(ModuleRequest request,Long userId);
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "id",ignore = true)
    @Mapping(target = "updatedBy",source = "userId")
    void update(ModuleRequest request, @MappingTarget org.example.authservice.entity.Module module,Long userId);
    ModuleResponse toResponse(org.example.authservice.entity.Module module);
}
