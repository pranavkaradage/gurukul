package com.gurukul.repository;

import com.gurukul.entity.Management;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ManagementRepository extends JpaRepository<Management, Long> {
    List<Management> findAllByOrderByDisplayOrderAsc();
}

