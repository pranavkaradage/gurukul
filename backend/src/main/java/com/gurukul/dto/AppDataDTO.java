package com.gurukul.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppDataDTO {
    private List<HeroSlideDTO> heroSlides;
    private Map<String, String> homeResults;
    private AboutDTO about;
    private List<ManagementDTO> management;
    private List<AcademicUnitDTO> units;
    private List<CircularDTO> circulars;
    private List<EventDTO> events;
    private Map<String, List<String>> gallery;
    private ContactDTO contact;
    private SocialMediaDTO socialMedia;
}

