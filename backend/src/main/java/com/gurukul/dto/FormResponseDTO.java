package com.gurukul.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class FormResponseDTO {
    private Long id;
    private Long formId;
    private String formTitle;
    private LocalDateTime submittedAt;
    private String answers; // JSON string
}
