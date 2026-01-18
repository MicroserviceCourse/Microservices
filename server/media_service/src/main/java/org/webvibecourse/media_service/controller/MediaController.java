package org.webvibecourse.media_service.controller;

import java.io.IOException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.example.commonutils.api.ApiResponse;
import org.example.commonutils.api.PageResponse;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.webvibecourse.media_service.dto.response.MediaResponse;
import org.webvibecourse.media_service.service.MediaService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/medias")
public class MediaController {

  private final MediaService service;

  @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public ResponseEntity<ApiResponse<List<MediaResponse>>> uploadMultiple(
      @RequestPart("files") List<MultipartFile> files) throws IOException {
    return ResponseEntity.ok(ApiResponse.success(service.uploadMedias(files)));
  }

  @GetMapping
  public ResponseEntity<ApiResponse<PageResponse<MediaResponse>>> getMedias(
      @RequestParam(defaultValue = "1") Integer page,
      @RequestParam(defaultValue = "5") Integer size,
      @RequestParam(defaultValue = "id,desc") String sort,
      @RequestParam(required = false) String filter,
      @RequestParam(required = false) String searchField,
      @RequestParam(required = false) String searchValue,
      @RequestParam(defaultValue = "false") Boolean all) {
    return ResponseEntity.ok(
        ApiResponse.success(
            new PageResponse<>(
                service.getMedias(page, size, sort, searchField, searchValue, filter, all))));
  }

  @DeleteMapping("/delete/{id}")
  public ResponseEntity<ApiResponse<MediaResponse>> deleteMedia(@PathVariable Long id)
      throws IOException {
    service.deleteMedia(id);
    return ResponseEntity.ok(ApiResponse.success("Delete media successfully!"));
  }
}
