package com.gurukul.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CircularDTO {
    private Long id;
    private String unit; // unit name or null for homepage
    private String subject;
    private String date; // formatted date string
}

