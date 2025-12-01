package org.webvibecourse.media_service.controller;

import lombok.RequiredArgsConstructor;
import org.example.commonutils.api.ApiResponse;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.webvibecourse.media_service.dto.response.MediaResponse;
import org.webvibecourse.media_service.service.MediaService;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/medias")
public class MediaController {

    private final MediaService service;

    @PostMapping(value = "/upload",consumes =  MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<MediaResponse>>upload(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "subDirectory", required = false) String subDirectory) throws IOException {
        return ResponseEntity.ok(ApiResponse.success(service.uploadMedia(file,subDirectory)));
    }

    @PostMapping(value = "/upload/multiple",consumes =   MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<List<MediaResponse>>> uploadMultiple
            (@RequestPart("files") List<MultipartFile> files,
             @RequestParam(value = "subDirectory") String subDirectory) throws IOException {
        return ResponseEntity.ok(ApiResponse.success(service.uploadMedias(files,subDirectory)));
    }
}
