package org.example.banner_service.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
@Table(name = "banner")
public class Banner {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Basic
    @Column(name = "title")
    private String title;
    @Basic
    @Column(name = "ImageUrl")
    private String imageUrl;
    @Basic
    @Column(name = "LinkUrl")
    private String linkUrl;
    @Basic
    @Column(name = "StartDate")
    private LocalDateTime startDate;
    @Basic
    @Column(name = "EndDate")
    private LocalDateTime endDate;
    @Basic
    @Column(name = "IsActive")
    private boolean isActive;
    @Basic
    @Column(name = "SortOrder")
    private int sortOrder;
}
