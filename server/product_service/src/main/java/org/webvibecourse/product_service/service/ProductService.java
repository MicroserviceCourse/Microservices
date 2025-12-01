package org.webvibecourse.product_service.service;

import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;
import org.webvibecourse.product_service.dto.request.ProductRequest;
import org.webvibecourse.product_service.dto.response.ProductResponse;


import java.util.List;

public interface ProductService {

    void create(ProductRequest request,
                MultipartFile thumbnailUrl, List<MultipartFile> galleryUrls);

    Page<ProductResponse> getProducts
            (
                    Integer page,
                    Integer size,
                    String sort,
                    String searchField,
                    String searchValue,
                    String filter,
                    boolean all
            );
}
