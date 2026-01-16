package org.example.blogservice.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.OffsetDateTime;
import java.util.List;

@Entity
@Table(name = "categories")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(name = "blog_category_code",nullable = false,unique = true,length = 20)
    private String blogCategoryCode;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ssXXX")
    private OffsetDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ssXXX")
    private OffsetDateTime updatedAt;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "isStatus")
    private Boolean isStatus;

    @Column(name = "updated_by")
    private String updatedBy;

    @OneToMany(mappedBy = "category")
    private List<Post> posts;

    @PrePersist
    public void prePersist(){
        if(this.blogCategoryCode == null || this.blogCategoryCode.isEmpty()){
            this.blogCategoryCode = "BC"+String.format("%04d",(int)(Math.random() * 9999));
        }
        if(this.isStatus == null){
            this.isStatus=true;
        }
    }
}
