package org.webvibecourse.product_service.dto.response.client;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MediaResponse {

    private String url;

    private String fileName;

    private String mimeType;

    private Long size;

    private Integer width;

    private Integer height;

}
