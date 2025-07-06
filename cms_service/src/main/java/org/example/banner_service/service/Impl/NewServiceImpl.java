package org.example.banner_service.service.Impl;

import org.example.banner_service.client.FileServiceClient;
import org.example.banner_service.dto.request.NewDTO;
import org.example.banner_service.entity.CategoryNews;
import org.example.banner_service.entity.New;
import org.example.banner_service.exception.ErrorHandler;
import org.example.banner_service.repository.CategoryNewRepository;
import org.example.banner_service.repository.NewRepository;
import org.example.banner_service.service.NewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@Service
public class NewServiceImpl implements NewService {
    @Autowired
    private NewRepository newRepository;
    @Autowired
    private CategoryNewRepository categoryNewRepository;
    @Autowired
    private FileServiceClient fileServiceClient;

    @Override
    public New createNew(MultipartFile file, NewDTO newDTO) {
        try {
            New newEntity = new New();
            CategoryNews categoryNews = categoryNewRepository.findById(newDTO.getCategoryId())
                    .orElseThrow(() -> new ErrorHandler("Category Not Found"));
            if (file != null && !file.isEmpty()) {
                try {
                    String filePath = fileServiceClient.uploadFile(file, "new/");
                    newEntity.setThumbnail(filePath);
                } catch (Exception e) {
                    throw new ErrorHandler(HttpStatus.INTERNAL_SERVER_ERROR, "Lỗi khi lưu hình ảnh:" + e.getMessage());
                }
            }
            newEntity.setCategory(categoryNews);
            newEntity.setSlug(newDTO.getSlug());
            newEntity.setContent(newDTO.getContent());
            newEntity.setSummary(newDTO.getSummary());
            newEntity.setTitle(newDTO.getTitle());
            newEntity.setIdUser(newDTO.getIdUser());
            newEntity.setTagIds(newDTO.getTagIds());
            newEntity.setStatus(newDTO.getNewsStatus());
            return newRepository.save(newEntity);
        } catch (Exception e) {
            throw new RuntimeException("Không thể thêm tin tức");
        }
    }

    @Override
    public New updateNew(int id, NewDTO newDTO, MultipartFile file) {
        try {
            Optional<New> optionalNew = newRepository.findById(id);
            if (optionalNew.isPresent()) {
                New newEntity = optionalNew.get();
                CategoryNews categoryNews = categoryNewRepository.findById(newDTO.getId())
                        .orElseThrow(() -> new ErrorHandler("Category Not Found"));
                if (file != null && !file.isEmpty()) {
                    String filePath = fileServiceClient.uploadFile(file, "new/");
                    newEntity.setThumbnail(filePath);
                }
                newEntity.setSlug(newDTO.getSlug());
                newEntity.setContent(newDTO.getContent());
                newEntity.setCategory(categoryNews);
                newEntity.setSummary(newDTO.getSummary());
                newEntity.setTitle(newDTO.getTitle());
                return newRepository.save(newEntity);
            } else {
                throw new RuntimeException("Không thể tìm thấy tin tức với id:" + id);
            }
        } catch (Exception e) {
            throw new RuntimeException("Không thể cập nhật tin tức");
        }
    }

    @Override
    public void deleteNew(int id) {
        try {
            if (!newRepository.existsById(id)) {
                throw new Exception("Không tìm thấy tin tức với id:" + id);
            }
            newRepository.deleteById(id);
        } catch (Exception e) {
            throw new RuntimeException("Khổng thể xóa tin tức");
        }
    }

    @Override
    public Page<New> getAll(int page, int size) {
        return newRepository.findAll(PageRequest.of(page, size));
    }

    @Override
    public NewDTO todo(New New) {
        NewDTO newDTO = new NewDTO();
        newDTO.setId(New.getId());
        newDTO.setTitle(New.getTitle());
        newDTO.setSummary(New.getSummary());
        newDTO.setContent(New.getContent());
        newDTO.setThumbnail("/api/file" + New.getThumbnail());
        newDTO.setSlug(New.getSlug());
        newDTO.setTagIds(New.getTagIds());
        return newDTO;
    }
}
