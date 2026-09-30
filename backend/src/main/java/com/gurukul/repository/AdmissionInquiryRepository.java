package com.gurukul.repository;

import com.gurukul.entity.AdmissionInquiry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AdmissionInquiryRepository extends JpaRepository<AdmissionInquiry, Long> {
    List<AdmissionInquiry> findByIsProcessedFalseOrderByCreatedAtDesc();
    List<AdmissionInquiry> findAllByOrderByCreatedAtDesc();
}

