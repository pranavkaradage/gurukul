//package com.gurukul.dto;
//
//import lombok.AllArgsConstructor;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//import java.time.LocalDateTime;
//
//@Data
//@NoArgsConstructor
//@AllArgsConstructor
//public class StudentRegistrationDTO {
//    private Long id;
//	private String branch;
//    private String studentName;
//    private String schoolName;
//    private String villageOrCity;
//    private String address;
//    private String mobileNumber;
//    private LocalDateTime createdAt;
//    private Boolean isProcessed;
//}
//
package com.gurukul.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentRegistrationDTO {
    private Long id;
    private String branch;
    private String studentName;
    private String schoolName;
    private String villageOrCity;
    private String address;
    private String mobileNumber;

    // New Fields
    private Double lastExamPercentage;
    private String emailId;
    private String interestedFor;
    // End of New Fields

    private LocalDateTime createdAt;
    private Boolean isProcessed;
}