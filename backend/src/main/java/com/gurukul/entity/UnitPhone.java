package com.gurukul.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "unit_phones")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UnitPhone {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String phoneNumber;

    @ManyToOne
    @JoinColumn(name = "unit_contact_id", nullable = false)
    private UnitContact unitContact;
}

