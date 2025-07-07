package org.example.banner_service.service.Impl;

import org.example.banner_service.client.FileServiceClient;
import org.example.banner_service.dto.request.BannerDTO;
import org.example.banner_service.entity.Banner;
import org.example.banner_service.exception.ErrorHandler;
import org.example.banner_service.repository.BannerRepository;
import org.example.banner_service.service.BannerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class BannerServiceImpl implements BannerService {
    @Autowired
    private BannerRepository bannerRepository;
    @Autowired
    private FileServiceClient fileServiceClient;

    @Override
    public Banner createBanner(BannerDTO bannerDTO, MultipartFile file) {
        try {
            Banner banner = new Banner();
            banner.setTitle(bannerDTO.getTitle());
            banner.setLinkUrl(bannerDTO.getLinkUrl());
            banner.setSortOrder(bannerDTO.getSortOrder());
            banner.setStartDate(bannerDTO.getStartDate());
            banner.setEndDate(bannerDTO.getEndDate());
            banner.setActive(true);
            if (file != null && !file.isEmpty()) {
                try {
                    String filePath = fileServiceClient.uploadFile(file, "banner/");
                    banner.setImageUrl(filePath);
                } catch (Exception exception) {
                    throw new ErrorHandler(HttpStatus.INTERNAL_SERVER_ERROR, "Lỗi khi lưu hình ảnh: " + exception.getMessage());
                }
            }
            bannerRepository.save(banner);
            return banner;
        } catch (Exception e) {
            throw new RuntimeException("Không thể thêm banner");
        }
    }

    @Override
    public Banner updateBanner(int id, BannerDTO bannerDTO, MultipartFile file) {

        try {
            Banner banner = new Banner();
            banner.setTitle(bannerDTO.getTitle());
            banner.setLinkUrl(bannerDTO.getLinkUrl());
            banner.setSortOrder(bannerDTO.getSortOrder());
            banner.setStartDate(bannerDTO.getStartDate());
            banner.setEndDate(bannerDTO.getEndDate());
            banner.setActive(true);
            if (file != null && !file.isEmpty()) {
                try {
                    String filePath = fileServiceClient.uploadFile(file, "banner/");
                    banner.setImageUrl(filePath);
                } catch (Exception exception) {
                    throw new ErrorHandler(HttpStatus.INTERNAL_SERVER_ERROR, "Lỗi khi lưu hình ảnh: " + exception.getMessage());
                }
            }
            bannerRepository.save(banner);
            return banner;
        } catch (Exception exception) {
            throw new RuntimeException("Không thể cập nhật Banner");
        }
    }

    @Override
    public Page<Banner> getBanners(int page, int size) {
        return bannerRepository.findAll(PageRequest.of(page, size));
    }

    @Override
    public BannerDTO todo(Banner banner) {
        BannerDTO bannerDTO = new BannerDTO();
        bannerDTO.setId(banner.getId());
        bannerDTO.setTitle(banner.getTitle());
        bannerDTO.setLinkUrl(banner.getLinkUrl());
        bannerDTO.setImageUrl("/api/file" + banner.getImageUrl());
        bannerDTO.setSortOrder(banner.getSortOrder());
        bannerDTO.setStartDate(banner.getStartDate());
        bannerDTO.setEndDate(banner.getEndDate());
        return bannerDTO;
    }

    @Override
    public List<Banner> getAll() {
        return bannerRepository.findAll();
    }
}
