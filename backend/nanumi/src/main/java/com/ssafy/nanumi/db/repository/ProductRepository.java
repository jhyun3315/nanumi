package com.ssafy.nanumi.db.repository;

import com.ssafy.nanumi.db.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product,Long> {
    List<Product> findAllByIsDeletedFalse();

    @Query(value = "select count(p) " +
            "from Product p " +
            "where p.user.id = :userId and p.deleted = false and p.isClosed = false")
    Optional<Integer> findGivingCount(long userId);
}
