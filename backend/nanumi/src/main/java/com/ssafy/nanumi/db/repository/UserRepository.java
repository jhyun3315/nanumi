package com.ssafy.nanumi.db.repository;

import com.ssafy.nanumi.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {


}
