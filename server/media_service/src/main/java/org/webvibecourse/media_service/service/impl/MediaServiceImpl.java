package org.webvibecourse.media_service.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.commonsecurity.SecurityUtils;
import org.springframework.beans.factory.annotation.Value;
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

    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;
    @Override
    public MediaResponse uploadMedia(MultipartFile file, String subDirectory) throws IOException {
        try {
            String originalName = file.getOriginalFilename();
            String extension = "";

            if (originalName != null && originalName.contains(".")) {
                extension = originalName.substring(originalName.lastIndexOf("."));
            }

            String uniqueName = UUID.randomUUID().toString() + extension;

            String key = (subDirectory != null && !subDirectory.isEmpty()
                                  ? subDirectory + "/" : "") + uniqueName;

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

            media = repository.save(media);

            return mapper.toResponse(media);
        } catch (Exception e) {
            throw new RuntimeException("Cannot upload file to S3: " + e.getMessage(), e);
        }
    }


    @Override
    public List<MediaResponse> uploadMedias(List<MultipartFile> files, String subDirectory) throws IOException {
        List<MediaResponse> responses = new ArrayList<>();

        for (MultipartFile file : files){
            if(file == null || file.isEmpty()){
                continue;
            }
            MediaResponse response = uploadMedia(file,subDirectory);
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
}
