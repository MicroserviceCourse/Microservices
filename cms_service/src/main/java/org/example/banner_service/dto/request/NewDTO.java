package org.example.banner_service.dto.request;

import lombok.Data;
import org.example.banner_service.Enum.NewsStatus;

import java.util.List;

@Data
public class NewDTO {
    private int id;
    private String title;
    private String slug;
    private String content;
    private String summary;
    private String thumbnail;
    private NewsStatus newsStatus;
    private int categoryId;
    private int idUser;
    private List<Integer>tagIds;

}
