package com.gurukul.repository;

import com.gurukul.entity.StudentRegistration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface StudentRegistrationRepository extends JpaRepository<StudentRegistration, Long> {
    List<StudentRegistration> findByOrderByCreatedAtDesc();
}

