package com.gurukul.repository;

import com.gurukul.entity.FormQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface FormQuestionRepository extends JpaRepository<FormQuestion, Long> {
    List<FormQuestion> findByFormIdOrderByOrderIndexAsc(Long formId);

    void deleteByFormId(Long formId);
}
