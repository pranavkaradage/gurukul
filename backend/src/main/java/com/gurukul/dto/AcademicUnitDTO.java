package com.gurukul.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class AcademicUnitDTO {
    @JsonDeserialize(using = FlexibleLongDeserializer.class)
    private Long id; // Can be null for new units, accepts string or number
    private String unitId; // unitId like "science-academy"
    private String name;
    private String photo;
    private PrincipalDTO principal;
    private List<String> features;
    private List<UnitResultDTO> results;
    private List<CircularDTO> circulars;
    private List<String> gallery;
    private UnitContactDTO contact;
}

