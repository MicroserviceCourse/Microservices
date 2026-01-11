package org.webvibecourse.media_service.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.webvibecourse.media_service.dto.response.MediaResponse;
import org.webvibecourse.media_service.entity.Media;

@Mapper(componentModel = "spring")
public interface MediaMapper {
  /** Mapper responsible for converting between media and MediaResponse. */
  @Mapping(target = "createdAt", source = "createdAt")
  MediaResponse toResponse(Media media);
}
