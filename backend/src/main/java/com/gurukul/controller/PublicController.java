package com.gurukul.controller;

import com.gurukul.dto.*;
import com.gurukul.service.DataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/public")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001","https://gurukulschools.org","https://www.gurukulschools.org"},allowedHeaders = "*")
public class PublicController {

    @Autowired
    private DataService dataService;

    @GetMapping("/data")
    public ResponseEntity<AppDataDTO> getAllData() {
        return ResponseEntity.ok(dataService.getAllData());
    }

    @GetMapping("/unit/{unitId}")
    public ResponseEntity<?> getUnit(@PathVariable String unitId) {
        try {
            return ResponseEntity.ok(dataService.getUnitByUnitId(unitId));
        } catch (RuntimeException e) {
            if (e.getMessage() != null && e.getMessage().contains("not found")) {
                return ResponseEntity.status(404).body(Map.of("error", e.getMessage()));
            }
            return ResponseEntity.status(500).body(Map.of("error", "Internal server error"));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Internal server error: " + e.getMessage()));
        }
    }

    @PostMapping("/admission-inquiry")
    public ResponseEntity<?> submitAdmissionInquiry(@RequestBody AdmissionInquiryDTO dto) {
        try {
            dataService.saveAdmissionInquiry(dto);
            return ResponseEntity.ok("Inquiry submitted successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to submit inquiry");
        }
    }

    @PostMapping("/student-registration")
    public ResponseEntity<?> submitStudentRegistration(@RequestBody StudentRegistrationDTO dto) {
        try {
            dataService.saveStudentRegistration(dto);
            return ResponseEntity.ok("Registration submitted successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to submit registration: " + e.getMessage());
        }
    }
}

