package org.example.blogservice.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.blogservice.dto.request.TagRequest;
import org.example.blogservice.dto.response.TagDto;
import org.example.blogservice.entity.Tag;
import org.example.blogservice.mapper.TagMapper;
import org.example.blogservice.repository.TagRepository;
import org.example.blogservice.service.TagService;
import org.example.commonutils.util.GenericSpecBuilder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
@Slf4j
public class TagServiceImpl implements TagService {

    private final TagRepository tagRepository;
    private final TagMapper tagMapper;
    private static final List<String> SEARCH_FIELDS =
            List.of("name");
    @Override
    public void create(TagRequest request) {
        Tag tag = tagMapper.toEntity(request);
        tagRepository.save(tag);
    }

    @Override
    public void update(Long id, TagRequest request) {
        Tag tag = tagRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Tag not found: " + id));

        tagMapper.update(tag, request);
        tag = tagRepository.save(tag);
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
    public Page<TagDto> getPage(Integer page,
                                Integer size,
                                String sort,
                                String filter,
                                String searchField,
                                String searchValue,
                                boolean all) {
        log.info("start get tag");

        Pageable pageable = all
                ? Pageable.unpaged()
                : PageRequest.of(page-1,size);

        Specification<Tag> spec = GenericSpecBuilder.
                build(sort,filter,searchField,searchValue,SEARCH_FIELDS);

        return tagRepository.findAll(spec,pageable)
                .map(tagMapper::toResponse);
    }
}
