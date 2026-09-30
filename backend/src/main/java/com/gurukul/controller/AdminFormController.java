package com.gurukul.controller;

import com.gurukul.dto.DynamicFormDTO;
import com.gurukul.dto.FormResponseDTO;
import com.gurukul.service.DynamicFormService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/forms")
@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:3001", "https://gurukulschools.org",
        "https://www.gurukulschools.org" }, allowedHeaders = "*")
public class AdminFormController {

    @Autowired
    private DynamicFormService formService;

    @GetMapping
    public ResponseEntity<List<DynamicFormDTO>> getAllForms() {
        return ResponseEntity.ok(formService.getAllForms());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DynamicFormDTO> getFormById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(formService.getFormById(id));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<DynamicFormDTO> createForm(@RequestBody DynamicFormDTO dto) {
        return ResponseEntity.ok(formService.createForm(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DynamicFormDTO> updateForm(@PathVariable Long id, @RequestBody DynamicFormDTO dto) {
        try {
            return ResponseEntity.ok(formService.updateForm(id, dto));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteForm(@PathVariable Long id) {
        formService.deleteForm(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/publish")
    public ResponseEntity<?> publishForm(@PathVariable Long id) {
        try {
            formService.publishForm(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}/responses")
    public ResponseEntity<List<FormResponseDTO>> getFormResponses(@PathVariable Long id) {
        return ResponseEntity.ok(formService.getResponsesByFormId(id));
    }
}
