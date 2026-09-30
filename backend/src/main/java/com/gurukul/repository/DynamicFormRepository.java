package com.gurukul.repository;

import com.gurukul.entity.DynamicForm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DynamicFormRepository extends JpaRepository<DynamicForm, Long> {
    Optional<DynamicForm> findByIsPublishedTrue();
}
