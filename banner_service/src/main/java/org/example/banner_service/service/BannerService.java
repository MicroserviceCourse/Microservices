package org.example.banner_service.service;

import org.example.banner_service.dto.BannerDTO;
import org.example.banner_service.entity.Banner;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface BannerService {
    Banner createBanner(BannerDTO bannerDTO, MultipartFile file);
    Banner updateBanner(int id,BannerDTO bannerDTO, MultipartFile file);
    Page<Banner>getBanners(int page, int size);
    BannerDTO todo(Banner banner);
    List<Banner>getAll();
}
