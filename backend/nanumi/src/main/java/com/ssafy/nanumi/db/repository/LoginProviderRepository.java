package com.ssafy.nanumi.db.repository;

import com.ssafy.nanumi.common.provider.Provider;
import com.ssafy.nanumi.db.entity.LoginProvider;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LoginProviderRepository extends JpaRepository<LoginProvider, Integer> {

    Optional<LoginProvider> findByProvider(Provider provider);
}
