package com.gurukul.repository;

import com.gurukul.entity.FormResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface FormResponseRepository extends JpaRepository<FormResponse, Long> {
    List<FormResponse> findByFormIdOrderBySubmittedAtDesc(Long formId);

    void deleteByFormId(Long formId);
}
