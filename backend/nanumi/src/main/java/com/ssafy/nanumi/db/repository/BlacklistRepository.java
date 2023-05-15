package com.ssafy.nanumi.db.repository;

import com.ssafy.nanumi.db.entity.Blacklist;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface BlacklistRepository extends JpaRepository<Blacklist, Long> {

    @Query(value = "select b " +
            "from Blacklist b " +
            "where b.blocker.id = :blockerId and b.target.id = :targetId")
    Optional<Blacklist> findByBlockIdAndTargetId(@Param("blockerId") long blockerId, @Param("targetId") long targetId);

    @Query(value = "select b " +
            "from Blacklist b " +
            "where b.blocker.id = :userId and b.isBlocked = true")
    List<Blacklist> findByBlockerIdAndIsBlockedTrue(@Param("userId") long userId);

    @Query(value = "select b.blocker.id " +
            "from Blacklist b " +
            "where b.target.id = :userId and b.isBlocked = true")
    List<Long> findBlockerId(@Param("userId") long userId);

    @Query(value = "select b.target.id " +
            "from Blacklist b " +
            "where b.blocker.id = :userId and b.isBlocked = true")
    List<Long> findTargetId(@Param("userId") long userId);
}
