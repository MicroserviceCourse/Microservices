package org.webvibecourse.media_service.service.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.commonsecurity.SecurityUtils;
import org.example.commonutils.Enum.MediaType;
import org.example.commonutils.util.GenericSpecBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.webvibecourse.media_service.dto.response.MediaResponse;
import org.webvibecourse.media_service.entity.Media;
import org.webvibecourse.media_service.mapper.MediaMapper;
import org.webvibecourse.media_service.repository.MediaRepository;
import org.webvibecourse.media_service.service.MediaService;

@Service
@RequiredArgsConstructor
@Slf4j
public class MediaServiceImpl implements MediaService {

  private final Cloudinary cloudinary;

  private final MediaRepository repository;

  private final SecurityUtils securityUtils;

  private final MediaMapper mapper;
  private static final List<String> SEARCH_FIELDS = List.of("mediaType");

  private int detectMediaType(String mimeType) {
    if (mimeType == null) return 0;
    if (mimeType.startsWith("image/")) return 1; // IMAGE
    if (mimeType.startsWith("video/")) return 2; // VIDEO
    if (mimeType.startsWith("application/")) return 3; // DOCUMENT (pdf, docx...)
    if (mimeType.startsWith("audio/")) return 4; // AUDIO

    return 0;
  }

  private String getDirectoryByMediaType(MediaType mediaType) {
    return switch (mediaType) {
      case IMAGE -> "images";
      case VIDEO -> "videos";
      case DOCUMENT -> "documents";
      case AUDIO -> "audio";
      default -> "others";
    };
  }

  private MediaResponse uploadMedia(MultipartFile file) throws IOException {
    try {
      String originalName = file.getOriginalFilename();
      String extension = "";

      if (originalName != null && originalName.contains(".")) {
        extension = originalName.substring(originalName.lastIndexOf("."));
      }
      int mediaTypeValue = detectMediaType(file.getContentType());
      MediaType mediaType = MediaType.fromValue(mediaTypeValue);

      String folder = getDirectoryByMediaType(mediaType);

      Map<?, ?> uploadResult =
          cloudinary
              .uploader()
              .upload(
                  file.getBytes(), ObjectUtils.asMap("folder", folder, "resource_type", "auto"));
      String url = (String) uploadResult.get("secure_url");
      String publicId = (String) uploadResult.get("public_id");
      Integer width =
          uploadResult.get("width") != null ? ((Number) uploadResult.get("width")).intValue() : 0;

      Integer height =
          uploadResult.get("height") != null ? ((Number) uploadResult.get("height")).intValue() : 0;
      Media media = new Media();
      media.setUrl(url);
      media.setFileName(originalName);
      media.setSize(file.getSize());
      media.setMimeType(file.getContentType());
      media.setOwnerId(securityUtils.getCurrentUserId());
      media.setWidth(width);
      media.setHeight(height);
      media.setAlt(originalName);
      media.setMediaType(mediaTypeValue);
      media.setPublicId(publicId);
      media = repository.save(media);

      return mapper.toResponse(media);

    } catch (Exception e) {
      throw new RuntimeException("Cannot upload file to S3: " + e.getMessage(), e);
    }
  }

  @Override
  public List<MediaResponse> uploadMedias(List<MultipartFile> files) throws IOException {
    List<MediaResponse> responses = new ArrayList<>();

    for (MultipartFile file : files) {
      if (file == null || file.isEmpty()) {
        continue;
      }
      MediaResponse response = uploadMedia(file);
      responses.add(response);
    }
    return responses;
  }

  @Override
  public void deleteMedia(Long id) {
    Media media =
        repository.findById(id).orElseThrow(() -> new RuntimeException("Media not found"));

    try {
      cloudinary.uploader().destroy(media.getPublicId(), ObjectUtils.emptyMap());

      repository.delete(media);
      log.info("Deleted media from Cloudinary & DB: {}", id);

    } catch (Exception e) {
      log.error("Error deleting Cloudinary file", e);
      throw new RuntimeException("Cannot delete media");
    }
  }

  @Override
  public Page<MediaResponse> getMedias(
      Integer page,
      Integer size,
      String sort,
      String searchField,
      String searchValue,
      String filter,
      boolean all) {
    log.info("start get Medias");
    Pageable pageable = all ? Pageable.unpaged() : PageRequest.of(page - 1, size);
    Specification<Media> spec =
        GenericSpecBuilder.build(sort, filter, searchField, searchValue, SEARCH_FIELDS);

    Long ownerId = securityUtils.getCurrentUserId();

    Specification<Media> ownerSpec = (root, query, cb) -> cb.equal(root.get("ownerId"), ownerId);
    spec = spec.and(ownerSpec);

    Page<Media> medias = repository.findAll(spec, pageable);

    return medias.map(mapper::toResponse);
  }
}
