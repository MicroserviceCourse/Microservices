package org.example.authservice.mapper;

import org.example.authservice.dto.request.AuthRegisterRequest;
import org.example.authservice.dto.request.client.UserProfileRequest;
import org.example.authservice.dto.response.AuthUserResponse;
import org.example.authservice.entity.AuthUser;
import org.example.authservice.mapper.common.CommonMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface AuthMapper extends CommonMapper {
    @Mapping(target = "roles", expression = "java(mapRoles(user.getRoles()))")
    AuthUserResponse toResponse(AuthUser user);
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "roles",ignore = true)
    @Mapping(target = "status",constant = "1")
    @Mapping(target = "createdBy", source = "userId")
    @Mapping(target = "updatedBy", source = "userId")

    AuthUser toEntity(AuthRegisterRequest request,Long userId);
    UserProfileRequest toProfileRequest(AuthRegisterRequest request);
}
