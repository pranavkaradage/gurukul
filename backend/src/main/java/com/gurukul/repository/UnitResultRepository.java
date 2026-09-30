package com.gurukul.repository;

import com.gurukul.entity.UnitResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface UnitResultRepository extends JpaRepository<UnitResult, Long> {
    List<UnitResult> findByUnitIdOrderByYearDesc(Long unitId);
}

