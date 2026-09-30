package com.gurukul.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HeroSlideDTO {
    private Long id;
    private String title;
    private String subtitle;
    private String image;
}

