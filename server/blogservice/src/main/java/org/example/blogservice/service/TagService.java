package org.example.blogservice.service;

import org.example.blogservice.dto.request.TagRequest;
import org.example.blogservice.dto.response.TagDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TagService {

    void create(TagRequest request);

    void update(Long id, TagRequest request);

    void delete(Long id);

    TagDto getById(Long id);

    Page<TagDto> getPage(Integer page,
                         Integer size,
                         String sort,
                         String filter,
                         String searchField,
                         String searchValue,
                         boolean all);

    void changeStatus(Long id,Boolean status);
}
