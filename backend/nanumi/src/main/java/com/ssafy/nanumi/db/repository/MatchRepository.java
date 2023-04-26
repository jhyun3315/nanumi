package com.ssafy.nanumi.db.repository;

import com.ssafy.nanumi.api.response.MatchInterface;
import com.ssafy.nanumi.db.entity.Match;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.ArrayList;


public interface MatchRepository extends CrudRepository<Match, Long> {
    @Query(value =
            "SELECT users.id AS UserId, " +
                    "matches.create_date AS CreateDate, " +
                    "matches.id AS MatchId, " +
                    "matches.product_id AS ProductId, " +
                    "users.profile_url AS ProfileUrl " +
                    "FROM users " +
                    "LEFT JOIN matches ON users.id = matches.receiver_id " +
                    "WHERE matches.product_id=:productId " +
                    "ORDER BY matches.create_date ASC " +
                    "LIMIT 3"
            , nativeQuery = true)
    ArrayList<MatchInterface> getMatchListByProduct(@Param("productId") long productId);

}
