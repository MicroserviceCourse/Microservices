package org.webvibecourse.media_service.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MediaResponse {

    private Long id;

    private String url;

    private String fileName;

    private String mimeType;

    private Long size;

    private Integer width;

    private Integer height;

    private Integer mediaType;

    private LocalDateTime createdAt;


}
