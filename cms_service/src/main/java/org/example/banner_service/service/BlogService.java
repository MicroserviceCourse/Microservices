package org.example.banner_service.service;

import org.example.banner_service.dto.request.BlogDTO;
import org.example.banner_service.entity.Blog;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

public interface BlogService {
    Blog create(MultipartFile file,BlogDTO blogDTO);
    Blog update(int id, MultipartFile file,BlogDTO blogDTO);
    void delete(int id);
    Page<Blog>findAll(int page, int size);
    BlogDTO todo(Blog blog);
}
