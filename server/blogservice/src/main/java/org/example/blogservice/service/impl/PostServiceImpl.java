package org.example.blogservice.service.impl;

import lombok.RequiredArgsConstructor;
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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
@Transactional
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private final CategoryRepository categoryRepository;
    private final TagRepository tagRepository;
    private final PostMapper postMapper;

    @Override
    public PostResponse create(PostRequest request) {
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new NoSuchElementException("Category not found: " + request.getCategoryId()));

        List<Tag> tags = request.getTagIds() == null || request.getTagIds().isEmpty()
                ? List.of()
                : tagRepository.findAllById(request.getTagIds());

        // 💡 MapStruct map các field cơ bản
        Post post = postMapper.toEntity(request);
        post.setCategory(category);
        post.setTags(tags);

        boolean publish = Boolean.TRUE.equals(request.getPublished());
        post.setPublished(publish);
        if (publish) {
            post.setPublishedAt(LocalDateTime.now());
        }

        // TODO: generate slug nếu cần
        // post.setSlug(slugUtils.toSlug(post.getTitle()));

        post = postRepository.save(post);
        return postMapper.toResponse(post);
    }

    // PostServiceImpl.java
    @Override
    public void update(Long id, PostRequest request) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        List<Tag> tags = request.getTagIds() == null
                ? List.of()
                : tagRepository.findAllById(request.getTagIds());

        // dùng mapper để map field từ request vào entity
        postMapper.update(post, request);

        post.setCategory(category);
        post.setTags(tags);

        boolean publish = Boolean.TRUE.equals(request.getPublished());
        post.setPublished(publish);
        if (publish && post.getPublishedAt() == null) {
            post.setPublishedAt(LocalDateTime.now());
        }

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
    @Transactional(readOnly = true)
    public Page<PostResponse> getPage(Pageable pageable) {
        return postRepository.findAll(pageable)
                .map(postMapper::toResponse);
    }
}
