package com.gurukul.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "unit_contacts")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UnitContact {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 500)
    private String address;

    @Column(nullable = false, length = 1000)
    private String mapEmbedUrl;

    @OneToOne
    @JoinColumn(name = "unit_id", nullable = false, unique = true)
    private AcademicUnit unit;

    @OneToMany(mappedBy = "unitContact", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UnitPhone> phones = new ArrayList<>();
}

