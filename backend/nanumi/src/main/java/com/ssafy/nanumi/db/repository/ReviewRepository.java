package com.ssafy.nanumi.db.repository;

import com.ssafy.nanumi.db.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {
}
