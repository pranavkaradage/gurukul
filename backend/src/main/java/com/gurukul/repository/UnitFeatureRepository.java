package com.gurukul.repository;

import com.gurukul.entity.UnitFeature;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface UnitFeatureRepository extends JpaRepository<UnitFeature, Long> {
    List<UnitFeature> findByUnitId(Long unitId);
}

