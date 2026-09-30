package com.gurukul.repository;

import com.gurukul.entity.Circular;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CircularRepository extends JpaRepository<Circular, Long> {
    List<Circular> findByIsActiveTrueOrderByDateDesc();
    List<Circular> findByUnitIdAndIsActiveTrueOrderByDateDesc(Long unitId);
    List<Circular> findByUnitIsNullAndIsActiveTrueOrderByDateDesc();
}

