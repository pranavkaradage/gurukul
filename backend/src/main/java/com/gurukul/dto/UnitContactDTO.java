package com.gurukul.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UnitContactDTO {
    private String address;
    private List<String> phones;
    private String mapEmbedUrl;
}

