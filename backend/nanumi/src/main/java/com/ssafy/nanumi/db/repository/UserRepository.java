package com.ssafy.nanumi.db.repository;

import com.ssafy.nanumi.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {

    Optional<User> findByEmail(String email);
    Optional<User> findByIdAndIsDeletedFalse(long userId);

}
