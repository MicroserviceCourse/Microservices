package org.example.banner_service.entity;

import jakarta.persistence.*;
import lombok.*;
import org.example.banner_service.Enum.BlogStatus;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.type.SqlTypes;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "blogs")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Blog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(nullable = false,unique = true)
    private String slug;
    @Column(nullable = false)
    private String title;
    @Lob
    @Column(nullable = false,columnDefinition = "TEXT")
    private String content;
    @Column(name = "cover_image")
    private String coverImage;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BlogStatus status;
    @Column(name = "id_user")
    private int idUser;
    @Column(name = "tag_ids",columnDefinition = "json")
    @JdbcTypeCode(SqlTypes.JSON)
    @Builder.Default
    private List<Integer>tagIds = new ArrayList<>();
    @CreationTimestamp
    private LocalDateTime createdAt;
    @UpdateTimestamp
    private LocalDateTime updatedAt;
}

