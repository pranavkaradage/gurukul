package com.gurukul.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Entity
@Table(name = "circulars")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Circular {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String subject;

    @Column(nullable = false)
    private LocalDate date;

    @ManyToOne
    @JoinColumn(name = "unit_id")
    private AcademicUnit unit; // null means general/homepage circular

    @Column(nullable = false)
    private Boolean isActive = true;
}

