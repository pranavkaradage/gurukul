package com.gurukul.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "admission_inquiries")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdmissionInquiry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String mobile;

    @Column(nullable = false, length = 1000)
    private String query;

    @Column(nullable = false)
    private String unitName;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(nullable = false)
    private Boolean isProcessed = false;
}

