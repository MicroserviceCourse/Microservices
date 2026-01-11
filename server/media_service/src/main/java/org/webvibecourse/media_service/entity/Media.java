package org.webvibecourse.media_service.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

@Data
@Entity
@Table(name = "media", schema = "media_service")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Media {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Schema(name = "Auto-generated unique identifier for each media record.")
  private Long id;

  @Column(name = "url", columnDefinition = "TEXT")
  @Schema(name = "Public or private URL pointing to the file stored on S3.")
  private String url;

  @Column(name = "file_name", columnDefinition = "TEXT")
  @Schema(description = "Original file name uploaded by the user.")
  private String fileName;

  @Schema(description = "Alternative text for accessibility or SEO.")
  private String alt;

  @Column(name = "owner_id")
  private Long ownerId;

  @Column(name = "mimeType")
  @Schema(description = "MIME type of the file, e.g. image/png, image/jpeg.")
  private String mimeType;

  @Column(name = "publicId")
  @Schema(description = "Public Id")
  private String publicId;

  @Column(name = "size")
  @Schema(description = "File size in bytes.")
  private Long size;

  @Column(nullable = false)
  private Integer width;

  @Column(nullable = false)
  private Integer height;

  @Column(name = "media_type", nullable = false)
  @Schema(description = "Type of media: 1=IMAGE, 2=VIDEO, 3=DOCUMENT, 4=AUDIO")
  private Integer mediaType;

  @CreationTimestamp
  @Column(name = "created_at", updatable = false)
  @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Ho_Chi_Minh")
  private LocalDateTime createdAt;
}
