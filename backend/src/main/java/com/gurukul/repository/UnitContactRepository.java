package com.gurukul.repository;

import com.gurukul.entity.UnitContact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UnitContactRepository extends JpaRepository<UnitContact, Long> {
    Optional<UnitContact> findByUnitId(Long unitId);
}

