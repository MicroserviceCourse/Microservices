package org.example.banner_service.dto.request;

import lombok.Data;
import org.example.banner_service.Enum.BlogStatus;

import java.util.ArrayList;
import java.util.List;

@Data
public class BlogDTO {
    private int id;
    private String slug;
    private String title;
    private String content;
    private BlogStatus status;
    private int idUser;
    private List<Integer>tagIds = new ArrayList<>();


}
