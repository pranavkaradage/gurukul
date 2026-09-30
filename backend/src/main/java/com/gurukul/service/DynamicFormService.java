package com.gurukul.service;

import com.gurukul.dto.DynamicFormDTO;
import com.gurukul.dto.FormQuestionDTO;
import com.gurukul.dto.FormResponseDTO;
import com.gurukul.entity.DynamicForm;
import com.gurukul.entity.FormQuestion;
import com.gurukul.entity.FormResponse;
import com.gurukul.repository.DynamicFormRepository;
import com.gurukul.repository.FormQuestionRepository;
import com.gurukul.repository.FormResponseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DynamicFormService {

    @Autowired
    private DynamicFormRepository formRepository;

    @Autowired
    private FormQuestionRepository questionRepository;

    @Autowired
    private FormResponseRepository responseRepository;

    public List<DynamicFormDTO> getAllForms() {
        return formRepository.findAll().stream().map(this::mapToFormDTO).collect(Collectors.toList());
    }

    public DynamicFormDTO getFormById(Long id) {
        DynamicForm form = formRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Form not found with id: " + id));
        return mapToFormDTO(form);
    }

    public DynamicFormDTO getPublishedForm() {
        return formRepository.findByIsPublishedTrue()
                .map(this::mapToFormDTO)
                .orElse(null); // Return null if no form is published
    }

    @Transactional
    public DynamicFormDTO createForm(DynamicFormDTO dto) {
        DynamicForm form = new DynamicForm();
        form.setTitle(dto.getTitle());
        form.setDescription(dto.getDescription());
        form.setPublished(false); // Initially draft

        DynamicForm savedForm = formRepository.save(form);
        saveQuestions(savedForm, dto.getQuestions());

        return getFormById(savedForm.getId());
    }

    @Transactional
    public DynamicFormDTO updateForm(Long id, DynamicFormDTO dto) {
        DynamicForm form = formRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Form not found with id: " + id));
        form.setTitle(dto.getTitle());
        form.setDescription(dto.getDescription());

        // Remove old questions, add new ones
        questionRepository.deleteByFormId(form.getId());
        saveQuestions(form, dto.getQuestions());

        return getFormById(form.getId());
    }

    @Transactional
    public void deleteForm(Long id) {
        formRepository.deleteById(id);
    }

    @Transactional
    public void publishForm(Long id) {
        // Unpublish all other forms first
        formRepository.findAll().forEach(f -> {
            if (f.isPublished()) {
                f.setPublished(false);
                formRepository.save(f);
            }
        });

        // Publish target form
        DynamicForm form = formRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Form not found with id: " + id));
        form.setPublished(true);
        formRepository.save(form);
    }

    // --- Submissions --- //

    public void submitResponse(Long formId, String answersJson) {
        DynamicForm form = formRepository.findById(formId)
                .orElseThrow(() -> new RuntimeException("Form not found with id: " + formId));

        FormResponse response = new FormResponse();
        response.setForm(form);
        response.setAnswers(answersJson);
        responseRepository.save(response);
    }

    public List<FormResponseDTO> getResponsesByFormId(Long formId) {
        return responseRepository.findByFormIdOrderBySubmittedAtDesc(formId).stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    // --- Mappers --- //

    private void saveQuestions(DynamicForm form, List<FormQuestionDTO> dtos) {
        if (dtos != null) {
            for (int i = 0; i < dtos.size(); i++) {
                FormQuestionDTO qDto = dtos.get(i);
                FormQuestion question = new FormQuestion();
                question.setForm(form);
                question.setText(qDto.getText());
                question.setType(qDto.getType());
                question.setOptions(qDto.getOptions());
                question.setRequired(qDto.isRequired());
                question.setOrderIndex(i);
                questionRepository.save(question);
            }
        }
    }

    private DynamicFormDTO mapToFormDTO(DynamicForm form) {
        DynamicFormDTO dto = new DynamicFormDTO();
        dto.setId(form.getId());
        dto.setTitle(form.getTitle());
        dto.setDescription(form.getDescription());
        dto.setPublished(form.isPublished());

        if (form.getQuestions() != null) {
            List<FormQuestionDTO> qDtos = form.getQuestions().stream()
                    .map(q -> {
                        FormQuestionDTO qDto = new FormQuestionDTO();
                        qDto.setId(q.getId());
                        qDto.setText(q.getText());
                        qDto.setType(q.getType());
                        qDto.setOptions(q.getOptions());
                        qDto.setRequired(q.isRequired());
                        qDto.setOrderIndex(q.getOrderIndex());
                        return qDto;
                    })
                    .collect(Collectors.toList());
            dto.setQuestions(qDtos);
        }
        return dto;
    }

    private FormResponseDTO mapToResponseDTO(FormResponse response) {
        FormResponseDTO dto = new FormResponseDTO();
        dto.setId(response.getId());
        dto.setFormId(response.getForm().getId());
        dto.setFormTitle(response.getForm().getTitle());
        dto.setSubmittedAt(response.getSubmittedAt());
        dto.setAnswers(response.getAnswers());
        return dto;
    }
}
