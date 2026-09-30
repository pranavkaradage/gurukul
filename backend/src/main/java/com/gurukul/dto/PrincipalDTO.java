package com.gurukul.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PrincipalDTO {
    private String name;
    private String photo;
    private String message;
}

