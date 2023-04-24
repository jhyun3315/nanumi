package com.ssafy.nanumi.db.repository;

import com.ssafy.nanumi.db.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository <Address, Long> {
}
