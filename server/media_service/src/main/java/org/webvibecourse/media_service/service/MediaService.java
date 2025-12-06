package org.webvibecourse.media_service.service;

import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;
import org.webvibecourse.media_service.dto.response.MediaResponse;

import java.io.IOException;
import java.util.List;

public interface MediaService {



    List<MediaResponse> uploadMedias
            (List<MultipartFile> files) throws IOException;

    void deleteMedia(String url);

    Page<MediaResponse> getMedias
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
