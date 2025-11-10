package org.example.authservice.mapper.common;

import jdk.jfr.Name;
import org.example.authservice.entity.Module;
import org.mapstruct.Named;

public interface CommonMapper {
    @Named("mapModuleFromId")
    default Module mapModuleFromId(Long id){
        if(id==null) return null;
        Module module = new Module();
        module.setId(id);
        return module;
    }
}
