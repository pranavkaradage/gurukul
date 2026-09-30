package com.gurukul.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "form_responses")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FormResponse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "form_id", nullable = false)
    private DynamicForm form;

    @Column(nullable = false, updatable = false)
    private LocalDateTime submittedAt = LocalDateTime.now();

    @Column(columnDefinition = "JSON", nullable = false)
    private String answers; // Map of Question ID (or text) to Answer value
}
