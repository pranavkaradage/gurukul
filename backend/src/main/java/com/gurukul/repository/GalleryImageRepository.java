package com.gurukul.repository;

import com.gurukul.entity.GalleryImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface GalleryImageRepository extends JpaRepository<GalleryImage, Long> {
    List<GalleryImage> findByUnitIsNullAndCategoryOrderByDisplayOrderAsc(String category);
    List<GalleryImage> findByUnitIdOrderByDisplayOrderAsc(Long unitId);
}

