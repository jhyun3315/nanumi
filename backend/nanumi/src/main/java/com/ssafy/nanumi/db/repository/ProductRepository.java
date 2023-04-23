package com.ssafy.nanumi.db.repository;

import com.ssafy.nanumi.db.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product,Long> {
    List<Product> findAllByDeletedFalse();
}
