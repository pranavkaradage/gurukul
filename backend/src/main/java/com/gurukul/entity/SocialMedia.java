package com.gurukul.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "social_media")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SocialMedia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String facebook;

    @Column(nullable = false)
    private String instagram;

    @Column(nullable = false)
    private String youtube;
}

