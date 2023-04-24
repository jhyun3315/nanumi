package com.ssafy.nanumi.db.repository;

import com.ssafy.nanumi.db.entity.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserInfoRepository extends JpaRepository<UserInfo, Long> {
}
