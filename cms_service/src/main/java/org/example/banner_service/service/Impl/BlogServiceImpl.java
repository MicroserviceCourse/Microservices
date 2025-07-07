package org.example.banner_service.service.Impl;

import org.example.banner_service.client.FileServiceClient;
import org.example.banner_service.dto.request.BlogDTO;
import org.example.banner_service.entity.Blog;
import org.example.banner_service.exception.ErrorHandler;
import org.example.banner_service.repository.BlogRepository;
import org.example.banner_service.service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@Service
public class BlogServiceImpl implements BlogService {
    @Autowired
    private FileServiceClient fileServiceClient;
    @Autowired
    private BlogRepository blogRepository;

    @Override
    public Blog create(MultipartFile file, BlogDTO blogDTO) {
        try {
            Blog blog = new Blog();
            if (file != null && !file.isEmpty()) {
                try {
                    String filePath = fileServiceClient.uploadFile(file, "blog/");
                    blog.setCoverImage(filePath);
                } catch (Exception e) {
                    throw new ErrorHandler(HttpStatus.INTERNAL_SERVER_ERROR, "Lỗi khi lưu hình ảnh blog");
                }
            }
            blog.setTitle(blogDTO.getTitle());
            blog.setSlug(blogDTO.getSlug());
            blog.setContent(blogDTO.getContent());
            blog.setStatus(blogDTO.getStatus());
            blog.setIdUser(blogDTO.getIdUser());
            blogDTO.setTagIds(blogDTO.getTagIds());
            return blogRepository.save(blog);
        } catch (Exception e) {
            throw new RuntimeException("Không thể thêm blog");
        }
    }

    @Override
    public Blog update(int id, MultipartFile file, BlogDTO blogDTO) {
        try {
            Optional<Blog> blogOptional = blogRepository.findById(id);
            if (blogOptional.isPresent()) {
                Blog blog = blogOptional.get();
                if (file != null && !file.isEmpty()) {
                    try {
                        String filePath = fileServiceClient.uploadFile(file, "blog/");
                        blog.setCoverImage(filePath);
                    } catch (Exception e) {
                        throw new RuntimeException("Upload file bị lỗi");
                    }
                }
                blog.setTitle(blogDTO.getTitle());
                blog.setSlug(blogDTO.getSlug());
                blog.setContent(blogDTO.getContent());
                blog.setStatus(blogDTO.getStatus());
                blog.setIdUser(blogDTO.getIdUser());
                blog.setTagIds(blogDTO.getTagIds());
                return blogRepository.save(blog);

            } else {
                throw new RuntimeException("Không thể tìm thấy  tin tức với id:" + id);
            }
        } catch (Exception e) {
            throw new RuntimeException("Không thể cập nhật blog");
        }
    }

    @Override
    public void delete(int id) {
        try {
            if (!blogRepository.existsById(id)) {
                throw new Exception("Không tìm thấy tin tức với id:" + id);
            }
            blogRepository.deleteById(id);
        } catch (Exception e) {
            throw new RuntimeException("Không thể xóa tin tức");
        }
    }

    @Override
    public Page<Blog> findAll(int page, int size) {
        return blogRepository.findAll(PageRequest.of(page, size));
    }

    @Override
    public BlogDTO todo(Blog blog) {
        BlogDTO blogDTO = new BlogDTO();
        blogDTO.setId(blog.getId());
        blogDTO.setTitle(blog.getTitle());
        blogDTO.setSlug(blog.getSlug());
        blogDTO.setContent(blog.getContent());
        blogDTO.setStatus(blog.getStatus());
        blogDTO.setIdUser(blog.getIdUser());
        blogDTO.setTagIds(blog.getTagIds());
        blog.setCoverImage("/api/file" + blog.getCoverImage());
        return blogDTO;

    }
}
