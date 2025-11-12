package org.example.authservice.mapper;

import org.example.authservice.dto.response.PermissionGroupDto;
import org.example.authservice.dto.response.PermissionItemDto;
import org.example.authservice.entity.Permission;
import org.example.authservice.entity.RolePermission;
import org.example.authservice.mapper.common.CommonMapper;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface PermissionAssignMapper extends CommonMapper {
    @Mapping(target = "id",source = "permission.id")
    @Mapping(target = "permissionKey", source = "permission.permissionKey")
    @Mapping(target = "description",source = "permission.description")
    @Mapping(
            target = "checked",
            expression = "java(assignedPermissionIds.contains(permission.getId()))"
    )
    PermissionItemDto toPermissionItemDto(
            Permission permission,
            @Context Set<Long> assignedPermissionIds
    );
    default List<PermissionGroupDto> toPermissionGroups(
            List<Permission> allPermissions,
            List<RolePermission> rolePermissions
    ) {
        Set<Long>assignedIds = rolePermissions.stream()
                .map(rp->rp.getPermission().getId())
                .collect(Collectors.toSet());
        Map<String, List<PermissionItemDto>> grouped = allPermissions.stream()
                .collect(Collectors.groupingBy(
                        p -> p.getModule().getName(),      
                        Collectors.mapping(
                                p -> toPermissionItemDto(p, assignedIds),
                                Collectors.toList()
                        )
                ));
        return grouped.entrySet().stream()
                .map(e -> new PermissionGroupDto(e.getKey(), e.getValue()))
                .sorted(Comparator.comparing(PermissionGroupDto::getModule))
                .toList();
    }
}
