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
                .orElseThrow(() -> new RuntimeException("Category not found"));

        List<Tag> tags = request.getTagIds() == null
                ? List.of()
                : tagRepository.findAllById(request.getTagIds());

        Post post = Post.builder()
                .title(request.getTitle())
                .content(request.getContent())
                .thumbnailUrl(request.getThumbnailUrl())
                .metaTitle(request.getMetaTitle())
                .metaDescription(request.getMetaDescription())
                .category(category)
                .tags(tags)
                .published(Boolean.TRUE.equals(request.getPublished()))
                .publishedAt(Boolean.TRUE.equals(request.getPublished()) ? LocalDateTime.now() : null)
                .build();

        // TODO: generate slug if needed
        // post.setSlug(slugGenerator.generate(post.getTitle()));

        post = postRepository.save(post);
        return postMapper.toResponse(post);
    }

    @Override
    public PostResponse update(Long id, PostRequest request) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        List<Tag> tags = request.getTagIds() == null
                ? List.of()
                : tagRepository.findAllById(request.getTagIds());

        post.setTitle(request.getTitle());
        post.setContent(request.getContent());
        post.setThumbnailUrl(request.getThumbnailUrl());
        post.setMetaTitle(request.getMetaTitle());
        post.setMetaDescription(request.getMetaDescription());
        post.setCategory(category);
        post.setTags(tags);

        boolean publish = Boolean.TRUE.equals(request.getPublished());
        post.setPublished(publish);
        if (publish && post.getPublishedAt() == null) {
            post.setPublishedAt(LocalDateTime.now());
        }

        post = postRepository.save(post);
        return postMapper.toResponse(post);
    }

    @Override
    public void delete(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found"));
        postRepository.delete(post);
    }

    @Override
    @Transactional(readOnly = true)
    public PostResponse getById(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found"));
        return postMapper.toResponse(post);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<PostResponse> getPage(Pageable pageable) {
        return postRepository.findAll(pageable)
                .map(postMapper::toResponse);
    }
}
