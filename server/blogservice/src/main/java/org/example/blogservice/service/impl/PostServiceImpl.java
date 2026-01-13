package org.example.blogservice.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.blogservice.dto.request.PostRequest;
import org.example.blogservice.dto.response.PostResponse;
import org.example.blogservice.entity.Category;
import org.example.blogservice.entity.Post;
import org.example.blogservice.entity.Tag;
import org.example.blogservice.mapper.PostMapper;
import org.example.blogservice.repository.CategoryRepository;
import org.example.blogservice.repository.PostRepository;
import org.example.blogservice.repository.TagRepository;
import org.example.blogservice.service.PostService;
import org.example.commonutils.util.GenericSpecBuilder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private final CategoryRepository categoryRepository;
    private final TagRepository tagRepository;
    private final PostMapper postMapper;

    private static final List<String> SEARCH_FIELDS =
            List.of("title","slug");

    @Override
    public void create(PostRequest request) {
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new NoSuchElementException(
                        "Category not found: " + request.getCategoryId()));

        List<Tag> tags = request.getTagIds() == null
                ? List.of()
                : tagRepository.findAllById(request.getTagIds());

        Post post = postMapper.toEntity(request,category,tags);

        postRepository.save(post);
    }

    // PostServiceImpl.java
    @Override
    public void update(Long id, PostRequest request) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(()->new RuntimeException("Post not found"));

        List<Tag> tags = request.getTagIds() == null
                ? List.of()
                : tagRepository.findAllById(request.getTagIds());

        postMapper.update(post,request,category,tags);

        postRepository.save(post);
    }


    @Override
    public void delete(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Post not found: " + id));
        postRepository.delete(post);
    }

    @Override
    @Transactional(readOnly = true)
    public PostResponse getById(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Post not found: " + id));
        return postMapper.toResponse(post);
    }

    @Override
    public Page<PostResponse> getPage(Integer page,
                                      Integer size,
                                      String sort,
                                      String filter,
                                      String searchField,
                                      String searchValue,
                                      boolean all) {
        log.info("start get post");

        Pageable pageable = all
                ? Pageable.unpaged()
                : PageRequest.of(page-1,size);

        Specification<Post> spec = GenericSpecBuilder.
                build(sort,filter,searchField,searchValue,SEARCH_FIELDS);

        return postRepository.findAll(spec,pageable)
                .map(postMapper::toResponse);
    }


}
