package com.gurukul.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "gallery_images")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class GalleryImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String imageUrl;

    @Column(nullable = false)
    private String category; // festivals, achievements, sports, activities, or unit-specific

    @ManyToOne
    @JoinColumn(name = "unit_id")
    private AcademicUnit unit; // null means homepage gallery

    @Column(nullable = false)
    private Integer displayOrder = 0;
}

