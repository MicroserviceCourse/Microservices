package org.example.authservice.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "permissions", schema = "auth_service",
        uniqueConstraints = {
            @UniqueConstraint(
                    name = "uk_permissions_code",
                    columnNames = {"code"}
            )
        }
)
public class Permission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    @Size(max = 150)
    @Column(name = "code",nullable = false,unique = true,length = 150)
    private String code;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "module_id", nullable = false)
    private Module module;
    @Column(name = "description",nullable = true)
    private String description;
    @Size(max = 100)
    @NotNull
    @Column(name = "permission_key", nullable = false, length = 100)
    private String permissionKey;
    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;
    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Ho_Chi_Minh")
    private LocalDateTime createdAt;
    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Ho_Chi_Minh")
    private LocalDateTime updatedAt;
    @Column(name = "created_by")
    private String createdBy;
    @Column(name = "updated_by")
    private String updatedBy;

    @PrePersist
    @PreUpdate
    public void generateCode() {
        String moduleCode = "MODULE";
        if (module != null && module.getCode() != null && !module.getCode().isBlank()) {
            moduleCode = module.getCode().toUpperCase();
        }
        String key = permissionKey != null ? permissionKey : "UNKNOWN";
        String normalizedKey = key
                .trim()
                .toUpperCase()
                .replaceAll("[^A-Z0-9]+", "_");

        this.code = moduleCode + "_" + normalizedKey;
    }
}