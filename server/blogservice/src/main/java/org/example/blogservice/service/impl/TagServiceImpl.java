package org.example.blogservice.service.impl;

import lombok.RequiredArgsConstructor;
import org.example.blogservice.dto.request.TagRequest;
import org.example.blogservice.dto.response.TagDto;
import org.example.blogservice.entity.Tag;
import org.example.blogservice.mapper.TagMapper;
import org.example.blogservice.repository.TagRepository;
import org.example.blogservice.service.TagService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class TagServiceImpl implements TagService {

    private final TagRepository tagRepository;
    private final TagMapper tagMapper;

    @Override
    public TagDto create(TagRequest request) {
        Tag tag = tagMapper.toEntity(request);
        tag = tagRepository.save(tag);
        return tagMapper.toResponse(tag);
    }

    @Override
    public TagDto update(Long id, TagRequest request) {
        Tag tag = tagRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Tag not found: " + id));

        tagMapper.update(tag, request); // hoặc set field bằng tay
        tag = tagRepository.save(tag);

        return tagMapper.toResponse(tag);
    }

    @Override
    public void delete(Long id) {
        if (!tagRepository.existsById(id)) {
            throw new NoSuchElementException("Tag not found: " + id);
        }
        tagRepository.deleteById(id);
    }

    @Override
    public TagDto getById(Long id) {
        Tag tag = tagRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Tag not found: " + id));
        return tagMapper.toResponse(tag);
    }

    @Override
    public Page<TagDto> getPage(Pageable pageable) {
        return tagRepository.findAll(pageable)
                .map(tagMapper::toResponse);
    }
}
