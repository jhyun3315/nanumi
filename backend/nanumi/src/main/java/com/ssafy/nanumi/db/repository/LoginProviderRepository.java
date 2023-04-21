package com.ssafy.nanumi.db.repository;

import com.ssafy.nanumi.db.entity.LoginProvider;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoginProviderRepository extends JpaRepository<LoginProvider, Integer> {


}
