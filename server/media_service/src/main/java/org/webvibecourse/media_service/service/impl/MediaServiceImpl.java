package org.webvibecourse.media_service.service.impl;

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
import software.amazon.awssdk.core.ResponseBytes;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectResponse;
import software.amazon.awssdk.services.s3.model.ObjectCannedACL;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class MediaServiceImpl implements MediaService {

    private final S3Client s3Client;

    private final MediaRepository repository;

    private final SecurityUtils securityUtils;

    private final MediaMapper mapper;
    private static final List<String> SEARCH_FIELDS =
            List.of("mediaType");

    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;
    private int detectMediaType(String mimeType){
        if(mimeType ==null) return 0;
        if (mimeType.startsWith("image/")) return 1;     // IMAGE
        if (mimeType.startsWith("video/")) return 2;     // VIDEO
        if (mimeType.startsWith("application/")) return 3; // DOCUMENT (pdf, docx...)
        if (mimeType.startsWith("audio/")) return 4;     // AUDIO

        return 0;
    }
    private String getDirectoryByMediaType(MediaType mediaType) {
        return switch (mediaType) {
            case  IMAGE-> "images";
            case VIDEO-> "videos";
            case DOCUMENT-> "documents";
            case AUDIO-> "audio";
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

            String uniqueName = UUID.randomUUID().toString() + extension;

            int mediaTypeValue = detectMediaType(file.getContentType());
            MediaType mediaType = MediaType.fromValue(mediaTypeValue);

            String directory = getDirectoryByMediaType(mediaType);
            String key = directory + "/" + uniqueName;


            // 👉 Đo width/height TỪ MultipartFile (trước khi upload)
            int width = 0;
            int height = 0;
            try (InputStream in = file.getInputStream()) {
                BufferedImage image = ImageIO.read(in);
                if (image != null) {
                    width = image.getWidth();
                    height = image.getHeight();
                }
            } catch (Exception e) {
                // có thể log warning, nhưng không throw, cho width/height = 0 cũng được
            }

            // 👉 Upload S3 như cũ
            PutObjectRequest putRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(key)
                    .contentType(file.getContentType())
                    .build();

            s3Client.putObject(putRequest, RequestBody.fromBytes(file.getBytes()));

            // 👉 Không cần getObject nữa
            Media media = new Media();
            media.setUrl("https://" + bucketName + ".s3.ap-southeast-2.amazonaws.com/" + key);
            media.setFileName(originalName);
            media.setSize(file.getSize());
            media.setMimeType(file.getContentType());
            media.setOwnerId(securityUtils.getCurrentUserId());
            media.setWidth(width);
            media.setHeight(height);
            media.setAlt(originalName);
            media.setMediaType(mediaTypeValue);

            media = repository.save(media);

            return mapper.toResponse(media);
        } catch (Exception e) {
            throw new RuntimeException("Cannot upload file to S3: " + e.getMessage(), e);
        }
    }


    @Override
    public List<MediaResponse> uploadMedias(List<MultipartFile> files) throws IOException {
        List<MediaResponse> responses = new ArrayList<>();

        for (MultipartFile file : files){
            if(file == null || file.isEmpty()){
                continue;
            }
            MediaResponse response = uploadMedia(file);
            responses.add(response);
        }
        return responses;
    }

    @Override
    public void deleteMedia(String url) {
        try {
            String prefix = "https://" + bucketName + ".s3.ap-southeast-2.amazonaws.com/";
            if(!url.startsWith(prefix)){
                throw new RuntimeException("Invalid S3 URL");
            }

            String key = url.substring(prefix.length());

            s3Client.deleteObject(builder ->
                                          builder.bucket(bucketName).key(key)
                                 );

            Media media = repository.findByUrl(url).orElse(null);

            if (media != null) {
                repository.delete(media);
            }

            log.info("Deleted file from S3 & DB: {}", url);
        }catch (Exception e){
            log.error("Error deleting file: {}", e.getMessage());
            throw new RuntimeException("Cannot delete file: " + e.getMessage());

        }
    }

    @Override
    public Page<MediaResponse> getMedias(
            Integer page, Integer size, String sort, String searchField,
            String searchValue, String filter, boolean all
                                        ) {
        log.info("start get Medias");
        Pageable pageable = all
                ? Pageable.unpaged()
                : PageRequest.of(page - 1, size);
        Specification<Media> spec = GenericSpecBuilder.
                build(sort, filter, searchField, searchValue, SEARCH_FIELDS);

        Long ownerId = securityUtils.getCurrentUserId();

        Specification<Media> ownerSpec =
                (root, query, cb)
                        -> cb.equal(root.get("ownerId"), ownerId);
        spec = spec.and(ownerSpec);

        Page<Media> medias = repository.findAll(spec,pageable);

        return medias.map(mapper::toResponse);
    }
}
