package com.ssafy.nanumi.db.repository;

import com.ssafy.nanumi.db.entity.Blacklist;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BlacklistRepository extends JpaRepository<Blacklist, Long> {
}
