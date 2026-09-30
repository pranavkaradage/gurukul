package com.gurukul.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "principals")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Principal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String photoUrl;

    @Column(nullable = false, length = 2000)
    private String message;

    @OneToOne
    @JoinColumn(name = "unit_id", nullable = false, unique = true)
    private AcademicUnit unit;
}

