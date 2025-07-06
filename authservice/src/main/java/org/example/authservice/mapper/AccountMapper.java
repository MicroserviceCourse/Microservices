package org.example.authservice.mapper;

import org.example.authservice.dto.response.UserInfResponse;
import org.example.authservice.entity.Account;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface AccountMapper {


    @Mapping(source = "email", target = "email")
    @Mapping(source = "user.userName", target = "userName")
    @Mapping(source = "user.phoneNumber", target = "phoneNumber")
    @Mapping(source = "user.address", target = "address")
    UserInfResponse toUserInf(Account account);
}
