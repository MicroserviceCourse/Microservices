package org.example.authservice.mapper.common;
import org.example.authservice.entity.AuthUserRole;
import org.example.authservice.entity.Module;

import org.mapstruct.Named;

import java.util.List;


public interface CommonMapper {
    @Named("mapModuleFromId")
    default Module mapModuleFromId(Long id) {
        if (id == null) return null;
        Module module = new Module();
        module.setId(id);
        return module;
    }
    @Named("mapRoles")
    default List<String> mapRoles(List<AuthUserRole> roles) {
        if (roles == null) return null;
        return roles.stream()
                .map(r -> r.getRole().getName())
                .toList();
    }
}
