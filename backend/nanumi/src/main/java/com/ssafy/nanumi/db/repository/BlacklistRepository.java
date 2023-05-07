package com.ssafy.nanumi.db.repository;

import com.ssafy.nanumi.db.entity.Blacklist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface BlacklistRepository extends JpaRepository<Blacklist, Long> {

    @Query(value = "select b " +
            "from Blacklist b " +
            "where b.blocker.id = :blockerId and b.target.id = :targetId")
    Optional<Blacklist> findByBlockIdAndTargetId(long blockerId, long targetId);

    @Query(value = "select b " +
            "from Blacklist b " +
            "where b.blocker.id = :userId and b.isBlocked = true")
    List<Blacklist> findByBlockerIdAndIsBlockedTrue(long userId);
}
