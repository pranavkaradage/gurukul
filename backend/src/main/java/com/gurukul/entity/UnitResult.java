package com.gurukul.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "unit_results")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UnitResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "result_year", nullable = false)
    private Integer year;

    @Column(nullable = false, length = 1000)
    private String details;

    @ManyToOne
    @JoinColumn(name = "unit_id", nullable = false)
    private AcademicUnit unit;
}

