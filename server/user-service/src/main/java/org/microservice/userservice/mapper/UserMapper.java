package org.microservice.userservice.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.microservice.userservice.dto.request.UserRequest;
import org.microservice.userservice.entity.User;

@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mapping(target = "createdBy",source = "userId")
    @Mapping(target = "updatedBy",source = "userId")
    User toEntity(UserRequest request,Long userId);
}
