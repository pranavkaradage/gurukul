package com.gurukul.dto;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UnitResultDTO {
    @JsonDeserialize(using = FlexibleIntegerDeserializer.class)
    private Integer year;
    private String details;
}

