package com.gurukul.repository;

import com.gurukul.entity.UnitPhone;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UnitPhoneRepository extends JpaRepository<UnitPhone, Long> {
}

