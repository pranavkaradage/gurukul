package com.gurukul.dto;

import lombok.Data;
import java.util.List;

@Data
public class DynamicFormDTO {
    private Long id;
    private String title;
    private String description;
    private boolean isPublished;
    private List<FormQuestionDTO> questions;
}
