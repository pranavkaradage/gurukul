package com.gurukul.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "academic_units")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AcademicUnit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String unitId; // science-academy, commerce-academy, etc.

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String photoUrl;

    @OneToOne(mappedBy = "unit", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Principal principal;

    @OneToMany(mappedBy = "unit", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UnitFeature> features = new ArrayList<>();

    @OneToMany(mappedBy = "unit", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UnitResult> results = new ArrayList<>();

    @OneToMany(mappedBy = "unit", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Circular> circulars = new ArrayList<>();

    @OneToMany(mappedBy = "unit", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<GalleryImage> gallery = new ArrayList<>();

    @OneToOne(mappedBy = "unit", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private UnitContact contact;
}

