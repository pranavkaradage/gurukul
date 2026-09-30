package com.gurukul.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "form_questions")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FormQuestion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "form_id", nullable = false)
    @JsonIgnore
    private DynamicForm form;

    @Column(nullable = false)
    private String text;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private QuestionType type;

    @Column(columnDefinition = "JSON")
    private String options; // Stores JSON array of strings for MCQ/Dropdown options

    @Column(nullable = false)
    private boolean isRequired = false;

    @Column(nullable = false)
    private int orderIndex = 0;

    public enum QuestionType {
        TEXT,
        PARAGRAPH,
        NUMBER,
        EMAIL,
        MCQ,
        TRUE_FALSE,
        MULTI_SELECT
    }
}
