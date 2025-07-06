package org.example.banner_service.service;

import org.example.banner_service.dto.request.NewDTO;
import org.example.banner_service.entity.New;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

public interface NewService {
    New createNew(MultipartFile file,NewDTO newDTO);
    New updateNew(int id,NewDTO newDTO,MultipartFile file);
    void deleteNew(int id);
    Page<New> getAll(int page, int size);
    NewDTO todo(New New);
}
