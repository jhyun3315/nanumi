package com.ssafy.nanumi.db.repository;

import com.ssafy.nanumi.db.entity.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductImageRepository extends JpaRepository<ProductImage, Long> {
}