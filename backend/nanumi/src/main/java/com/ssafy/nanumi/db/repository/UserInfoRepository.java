package com.ssafy.nanumi.db.repository;

import com.ssafy.nanumi.db.entity.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserInfoRepository extends JpaRepository<UserInfo, Long> {
    Optional<UserInfo> findById(long userinfoId);
    Optional<UserInfo> findByRefreshToken(String refreshToken);

    @Query(value = "select ui.reportedTotalCount " +
            "from User u " +
            "left join u.userInfo ui " +
            "where u.id = :userId AND u.isDeleted = false")
    Optional<Integer> findUserInfoIdByUserId(long userId);
}
