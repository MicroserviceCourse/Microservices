package org.example.authservice.mapper;

import org.example.authservice.dto.request.UserRequest;
import org.example.authservice.dto.response.UserResponse;
import org.example.authservice.entity.User;
import org.mapstruct.Mapper;
import org.springframework.web.bind.annotation.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

    User toUser(UserRequest userRequest);

    UserResponse toUserResponse(User user);
}
