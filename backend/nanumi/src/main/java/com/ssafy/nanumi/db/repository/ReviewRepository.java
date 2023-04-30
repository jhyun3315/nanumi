package com.ssafy.nanumi.db.repository;

import com.ssafy.nanumi.db.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    // reviews:matchId = matches:Id, matches:productId = products:Id

    @Query(value = "select p.user.id " +
            "from Review r " +
            "left join fetch r.match m " +
            "left join fetch m.product p " +
            "where r.match.id = :matchId")
    Optional<Long> findReceiverIdByMatchId(long matchId);
}
