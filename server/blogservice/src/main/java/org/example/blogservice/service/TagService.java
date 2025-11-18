package org.example.blogservice.service;

import org.example.blogservice.dto.request.TagRequest;
import org.example.blogservice.dto.response.TagDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TagService {

    TagDto create(TagRequest request);

    TagDto update(Long id, TagRequest request);

    void delete(Long id);

    TagDto getById(Long id);

    Page<TagDto> getPage(Pageable pageable);
}
