package com.ssafy.nanumi.db.repository;

import com.ssafy.nanumi.db.entity.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserInfoRepository extends JpaRepository<UserInfo, Long> {
    Optional<UserInfo> findById(long userinfoId);

    String getTokenByUserId(long opponentId);
}
