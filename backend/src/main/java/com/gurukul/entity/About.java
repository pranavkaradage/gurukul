package com.gurukul.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "about")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class About {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 2000)
    private String shortInfo;

    @Column(nullable = false, length = 2000)
    private String vision;

    @Column(nullable = false, length = 2000)
    private String mission;
}

