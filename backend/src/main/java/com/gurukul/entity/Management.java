package com.gurukul.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "management")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Management {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String photoUrl;

    @Column(nullable = false)
    private Integer displayOrder = 0;
}

