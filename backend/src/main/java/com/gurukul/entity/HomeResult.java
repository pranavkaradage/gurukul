package com.gurukul.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "home_results")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class HomeResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String category; // JEE, NEET, CET, Commerce, GEMS, Vidyalay

    @Column(nullable = false, length = 500)
    private String description;
}

