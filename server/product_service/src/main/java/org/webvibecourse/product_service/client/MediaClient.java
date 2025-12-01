package org.webvibecourse.product_service.client;

import lombok.RequiredArgsConstructor;
import org.example.commonutils.api.ApiResponse;
import org.example.commonutils.util.MultipartInputStreamFileResource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.webvibecourse.product_service.dto.response.client.MediaResponse;

import java.io.File;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class MediaClient {
    private final RestTemplate template;

    @Value("${media.service.base-url}")
    private String mediaServiceBaseUrl;

    public List<MediaResponse> uploadMultipleImages
            (
                    List<MultipartFile> files,
                    String subDirectory) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.MULTIPART_FORM_DATA);

            MultiValueMap<String,Object> formData = new LinkedMultiValueMap<>();

            for (MultipartFile file : files) {
                MultipartInputStreamFileResource fileResource =
                        new MultipartInputStreamFileResource(
                                file.getBytes(),
                                file.getOriginalFilename()
                        );
                formData.add("files", fileResource);
            }

            formData.add("subDirectory", subDirectory);

            HttpEntity<MultiValueMap<String, Object>> requestEntity =
                    new HttpEntity<>(formData, headers);

            ParameterizedTypeReference<ApiResponse<List<MediaResponse>>> responseType =
                    new ParameterizedTypeReference<>() {};

            ResponseEntity<ApiResponse<List<MediaResponse>>> response =
                    template.exchange(
                            mediaServiceBaseUrl + "/upload/multiple",
                            HttpMethod.POST,
                            requestEntity,
                            responseType
                                     );
            ApiResponse<List<MediaResponse>> apiResponse = response.getBody();

            if (apiResponse == null || apiResponse.getData() == null) {
                return Collections.emptyList();
            }


            return apiResponse.getData();
        }catch (Exception e){
            throw new RuntimeException("Error uploading multiple files: " + e.getMessage(), e);
        }
    }

    public MediaResponse uploadSingleImage(
            MultipartFile file,
            String subDirectory
                                          ){
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.MULTIPART_FORM_DATA);

            MultiValueMap<String,Object> formData = new LinkedMultiValueMap<>();

            ByteArrayResource resource = new ByteArrayResource(file.getBytes()) {
                @Override
                public String getFilename() {
                    return file.getOriginalFilename();
                }
            };
            formData.add("file", resource);
            formData.add("subDirectory", subDirectory);

            HttpEntity<MultiValueMap<String, Object>> requestEntity =
                    new HttpEntity<>(formData, headers);

            ParameterizedTypeReference<ApiResponse<MediaResponse>> responseType =
                    new ParameterizedTypeReference<>() {};

            ResponseEntity<ApiResponse<MediaResponse>> response =
                    template.exchange(
                            mediaServiceBaseUrl + "/upload",
                            HttpMethod.POST,
                            requestEntity,
                            responseType);
            ApiResponse<MediaResponse> apiResponse = response.getBody();

            if (apiResponse == null || apiResponse.getData() == null) {
                return null;
            }
            return apiResponse.getData();
        }catch (Exception e){
            throw new RuntimeException("Error uploading single file: " + e.getMessage(), e);
        }
    }
}
