package org.webvibecourse.shop_service.service;

import org.springframework.data.domain.Page;
import org.webvibecourse.shop_service.dto.response.ShopResponse;

public interface ShopService {

    void approveShop(Long id);

    void rejectShop(Long id, String reason);

    void blockShop(Long id, String reason);

    ShopResponse getDetailShop(Long id);

    Page<ShopResponse> getShops
            (
                    Integer page,
                    Integer size,
                    String sort,
                    String searchField,
                    String searchValue,
                    String filter,
                    boolean all
            );

    void restoreShop(Long id);

}
