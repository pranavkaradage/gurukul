package com.gurukul.repository;

import com.gurukul.entity.HomeResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HomeResultRepository extends JpaRepository<HomeResult, Long> {
}

