package com.gurukul.dto;

import com.gurukul.entity.FormQuestion.QuestionType;
import lombok.Data;

@Data
public class FormQuestionDTO {
    private Long id;
    private String text;
    private QuestionType type;
    private String options;
    private boolean isRequired;
    private int orderIndex;
}
