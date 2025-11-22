package org.example.blogservice.mapper;

import org.example.blogservice.dto.request.PostRequest;
import org.example.blogservice.dto.response.PostResponse;
import org.example.blogservice.entity.Post;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring", uses = TagMapper.class)
public interface PostMapper {

    // Entity -> Response
    @Mapping(source = "category.id",   target = "categoryId")
    @Mapping(source = "category.name", target = "categoryName")
    PostResponse toResponse(Post post);

    // Request -> Entity (dùng cho create)
    @Mapping(target = "id",          ignore = true)
    @Mapping(target = "slug",        ignore = true)
    @Mapping(target = "publishedAt", ignore = true)
    @Mapping(target = "category",    ignore = true)
    @Mapping(target = "tags",        ignore = true)
    Post toEntity(PostRequest request);

    // Update từ Request vào Entity đã có (dùng cho update)
    @Mapping(target = "id",          ignore = true)
    @Mapping(target = "slug",        ignore = true)
    @Mapping(target = "publishedAt", ignore = true)
    @Mapping(target = "category",    ignore = true)
    @Mapping(target = "tags",        ignore = true)
    void update(@MappingTarget Post post, PostRequest request);
}
