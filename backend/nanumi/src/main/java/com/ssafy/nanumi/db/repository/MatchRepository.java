package com.ssafy.nanumi.db.repository;

import com.ssafy.nanumi.db.entity.Match;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MatchRepository extends JpaRepository<Match,Long> {
}
