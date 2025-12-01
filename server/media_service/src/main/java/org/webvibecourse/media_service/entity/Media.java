package org.webvibecourse.media_service.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "media",schema = "media_service")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Media {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(name = "Auto-generated unique identifier for each media record.")
    private Long id;

    @Column(name = "url",columnDefinition = "TEXT")
    @Schema(name = "Public or private URL pointing to the file stored on S3.")
    private String url;

    @Column(name = "file_name",columnDefinition = "TEXT")
    @Schema(description = "Original file name uploaded by the user.")
    private String fileName;

    @Column(name = "owner_id")
    private Long ownerId;

    @Column(name = "mimeType")
    @Schema(description = "MIME type of the file, e.g. image/png, image/jpeg.")
    private String mimeType;

    @Column(name = "size")
    @Schema(description = "File size in bytes.")
    private Long size;

    @Column(name = "entity_id")
    @Schema(description = "ID of the system entity that owns this media. Example: Product ID, User ID, Shop ID.")
    private Long entityId;

    @Column(name = "entity_type")
    @Schema(description = "Type of the entity that owns this media. Example: PRODUCT, USER, SHOP, BANNER.")
    private Integer entityType;

    @Column(nullable = false)
    private Integer width;
    @Column(nullable = false)
    private Integer height;

    @CreationTimestamp
    @Column(name = "created_at",updatable = false)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Ho_Chi_Minh")
    private LocalDateTime createdAt;
}
