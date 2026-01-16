package org.example.blogservice.mapper;

import org.example.blogservice.dto.request.TagRequest;
import org.example.blogservice.dto.response.TagDto;
import org.example.blogservice.entity.Tag;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface TagMapper {

    // Từ request -> entity mới
    Tag toEntity(TagRequest request);

    // Từ entity -> response


    // Update entity cũ
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void update(@MappingTarget Tag tag, TagRequest request);
    @Mapping(target = "code",source = "code")
    @Mapping(target = "isStatus",source = "isStatus")
    TagDto toResponse(Tag tag);
}
