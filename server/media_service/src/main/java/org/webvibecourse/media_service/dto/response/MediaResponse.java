package org.webvibecourse.media_service.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
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

    private String alt;


    private Integer width;

    private Integer height;

    private Integer mediaType;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Ho_Chi_Minh")
    private LocalDateTime createdAt;


}
