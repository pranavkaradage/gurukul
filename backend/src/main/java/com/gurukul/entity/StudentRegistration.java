//package com.gurukul.entity;
//
//import jakarta.persistence.*;
//import lombok.AllArgsConstructor;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//import java.time.LocalDateTime;
//
//@Entity
//@Table(name = "student_registrations")
//@Data
//@NoArgsConstructor
//@AllArgsConstructor
//public class StudentRegistration {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//	@Column(nullable = false)
//	private String branch; // e.g., Commerce, Science, or custom value
//
//    @Column(nullable = false)
//    private String studentName;
//
//    @Column(nullable = false)
//    private String schoolName;
//
//    @Column(nullable = false)
//    private String villageOrCity;
//
//    @Column(nullable = false, length = 1000)
//    private String address;
//
//    @Column(nullable = false)
//    private String mobileNumber;
//
//    @Column(nullable = false)
//    private LocalDateTime createdAt = LocalDateTime.now();
//
//    @Column(nullable = false)
//    private Boolean isProcessed = false;
//}
//
package com.gurukul.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "student_registrations")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentRegistration {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String branch; // e.g., Commerce, Science, or custom value

    @Column(nullable = false)
    private String studentName;

    @Column(nullable = false)
    private String schoolName;

    @Column(nullable = false)
    private String villageOrCity;

    @Column(nullable = false, length = 1000)
    private String address;

    @Column(nullable = false)
    private String mobileNumber;

    // New Fields
    @Column
    private Double lastExamPercentage;

    @Column
    private String emailId;

    @Column
    private String interestedFor;
    // End of New Fields

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(nullable = false)
    private Boolean isProcessed = false;
}