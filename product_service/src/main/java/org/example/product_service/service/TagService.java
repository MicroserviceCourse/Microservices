package org.example.product_service.service;

import org.example.product_service.dto.request.TagDTO;
import org.example.product_service.entity.Tag;
import org.springframework.data.domain.Page;

public interface TagService {
    Tag create(TagDTO tagDTO);
    Tag update(int id, TagDTO tagDTO);
    Page<Tag>findAll(int page, int size);
    TagDTO todo(Tag tag);
    Tag findById(int id);
    void deleteTagById(int id);
}
