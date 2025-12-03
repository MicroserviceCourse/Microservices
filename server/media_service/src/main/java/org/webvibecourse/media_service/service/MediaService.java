package org.webvibecourse.media_service.service;

import org.springframework.web.multipart.MultipartFile;
import org.webvibecourse.media_service.dto.response.MediaResponse;

import java.io.IOException;
import java.util.List;

public interface MediaService {

    MediaResponse uploadMedia
            (MultipartFile file, String subDirectory) throws IOException;

    List<MediaResponse> uploadMedias
            (List<MultipartFile> files, String subDirectory) throws IOException;

    void deleteMedia(String url);
}
