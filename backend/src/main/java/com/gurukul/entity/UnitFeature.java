package com.gurukul.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "unit_features")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UnitFeature {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 500)
    private String description;

    @ManyToOne
    @JoinColumn(name = "unit_id", nullable = false)
    private AcademicUnit unit;
}

