package org.example.blogservice.mapper;

import org.example.blogservice.dto.request.TagRequest;
import org.example.blogservice.dto.response.TagDto;
import org.example.blogservice.entity.Tag;
import org.mapstruct.BeanMapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Mapper;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface TagMapper {

    // Từ request -> entity mới
    Tag toEntity(TagRequest request);

    // Từ entity -> response
    TagDto toResponse(Tag tag);

    // Update entity cũ
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void update(@MappingTarget Tag tag, TagRequest request);
}
