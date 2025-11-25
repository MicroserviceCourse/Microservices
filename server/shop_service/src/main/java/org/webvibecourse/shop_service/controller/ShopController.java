package org.webvibecourse.shop_service.controller;

import lombok.RequiredArgsConstructor;
import org.example.commonutils.api.ApiResponse;
import org.example.commonutils.api.PageResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.webvibecourse.shop_service.dto.request.Shop.RequestNote;
import org.webvibecourse.shop_service.dto.response.ShopResponse;
import org.webvibecourse.shop_service.service.ShopService;

@RestController
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@RequestMapping("/api/shops")
public class ShopController {

    private final ShopService shopService;

    @PatchMapping("/{id}/approve")
    public ResponseEntity<ApiResponse<Void>> approveShop
            (@PathVariable Long id) {
        shopService.approveShop(id);
        return ResponseEntity.ok(
                ApiResponse.success("Approved shop successfully "));
    }

    @PatchMapping("/{id}/restore")
    public ResponseEntity<ApiResponse<Void>> restoreShop
            (@PathVariable Long id) {
        shopService.restoreShop(id);
        return ResponseEntity.ok(
                ApiResponse.success("Restored shop successfully "));
    }

    @PatchMapping("/{id}/reject")
    public ResponseEntity<ApiResponse<Void>> rejectShop
            (
                    @PathVariable Long id,
                    @RequestBody RequestNote requestNode
            ) {
        shopService.rejectShop(id, requestNode.getNote());
        return ResponseEntity.ok(
                ApiResponse.success("Rejected shop successfully "));
    }

    @PatchMapping("/{id}/block")
    public ResponseEntity<ApiResponse<Void>> blockShop
            (
                    @PathVariable Long id,
                    @RequestBody RequestNote requestNode
            ) {
        shopService.blockShop(id, requestNode.getNote());
        return ResponseEntity.ok(
                ApiResponse.success("Blocked shop successfully"));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<ShopResponse>>> getShops
            (
                    @RequestParam(defaultValue = "1") Integer page,
                    @RequestParam(defaultValue = "5") Integer size,
                    @RequestParam(defaultValue = "id,desc") String sort,
                    @RequestParam(required = false) String filter,
                    @RequestParam(required = false) String searchField,
                    @RequestParam(required = false) String searchValue,
                    @RequestParam(defaultValue = "false") Boolean all
            ) {
        return ResponseEntity.ok(
                ApiResponse.success
                        (new PageResponse<>(
                                shopService.getShops(
                                        page,
                                        size,
                                        sort,
                                        searchField,
                                        searchValue,
                                        filter,
                                        all))
                        ));
    }
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ShopResponse>>getShopById
            (@PathVariable Long id) {
        return ResponseEntity.ok(
                ApiResponse.success(shopService.getDetailShop(id)));
    }
}
