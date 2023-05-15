package com.ssafy.nanumi.db.repository;

import com.ssafy.nanumi.db.entity.Review;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    @Query(value = "select p.user.id " +
            "from Match m " +
            "left join m.product p " +
            "where m.id = :matchId")
    Optional<Long> findReceiverIdByMatchId(@Param("matchId") long matchId);
}
