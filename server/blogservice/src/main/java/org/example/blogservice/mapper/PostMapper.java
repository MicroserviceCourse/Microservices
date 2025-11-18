package org.example.blogservice.mapper;

import org.example.blogservice.dto.response.PostResponse;
import org.example.blogservice.entity.Post;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface PostMapper {

    @Mapping(source = "category.id", target = "categoryId")
    @Mapping(source = "category.name", target = "categoryName")
    PostResponse toResponse(Post post);
}
