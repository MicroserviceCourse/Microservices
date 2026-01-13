package org.example.blogservice.mapper;

import org.example.blogservice.dto.request.PostRequest;
import org.example.blogservice.dto.response.PostResponse;
import org.example.blogservice.entity.Category;
import org.example.blogservice.entity.Post;
import org.example.blogservice.entity.Tag;
import org.example.commonutils.util.GenerateUtils;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring", uses = TagMapper.class)
public interface PostMapper {

    // Entity -> Response


    @Mapping(source = "category",target = "category")
    @Mapping(source = "tags",target = "tags")
    Post toEntity(PostRequest request, Category category, List<Tag> tags);

    void update(@MappingTarget Post post,
                PostRequest request,
                Category category,
                List<Tag> tags);

    @Mapping(source = "category.id",   target = "categoryId")
    @Mapping(source = "category.name", target = "categoryName")
    PostResponse toResponse(Post post);

    @AfterMapping
    default void updateSlug(@MappingTarget Post post, PostRequest request) {
        if (request.getTitle() != null &&
                !request.getTitle().equals(post.getTitle())) {
            post.setSlug(GenerateUtils.toSlug(request.getTitle()));
        }
    }
}
