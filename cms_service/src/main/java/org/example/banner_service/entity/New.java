package org.example.banner_service.entity;

import jakarta.persistence.*;
import lombok.*;
import org.example.banner_service.Enum.NewsStatus;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "news")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class New {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(nullable = false)
    private String title;
    @Column(unique = true, nullable = false)
    private String slug;
    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;
    private String summary;
    private String thumbnail;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private NewsStatus status = NewsStatus.DRAFT;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private CategoryNews category;
    @Column(name = "id_user")
    private int idUser;
    @Column(name = "tag_ids", columnDefinition = "json")
    @JdbcTypeCode(SqlTypes.JSON)
    @Builder.Default
    private List<Integer> tagIds = new ArrayList<>();
    @Column(updatable = false)
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = createdAt;
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
