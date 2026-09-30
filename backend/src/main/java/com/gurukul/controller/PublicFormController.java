package com.gurukul.controller;

import com.gurukul.dto.DynamicFormDTO;
import com.gurukul.service.DynamicFormService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/public/forms")
@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:3001", "https://gurukulschools.org",
        "https://www.gurukulschools.org" }, allowedHeaders = "*")
public class PublicFormController {

    @Autowired
    private DynamicFormService formService;

    @GetMapping("/published")
    public ResponseEntity<DynamicFormDTO> getPublishedForm() {
        DynamicFormDTO form = formService.getPublishedForm();
        if (form == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(form);
    }

    @PostMapping("/{id}/submit")
    public ResponseEntity<?> submitFormResponse(@PathVariable Long id, @RequestBody Map<String, Object> payload) {
        try {
            com.fasterxml.jackson.databind.ObjectMapper mapper = new com.fasterxml.jackson.databind.ObjectMapper();
            String answersJson;
            if (payload.containsKey("answers")) {
                Object answersObj = payload.get("answers");
                answersJson = (answersObj instanceof String) ? (String) answersObj
                        : mapper.writeValueAsString(answersObj);
            } else {
                answersJson = mapper.writeValueAsString(payload);
            }

            formService.submitResponse(id, answersJson);
            return ResponseEntity.ok(Map.of("message", "Response submitted successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
