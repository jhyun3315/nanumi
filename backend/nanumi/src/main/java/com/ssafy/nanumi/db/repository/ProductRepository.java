package com.ssafy.nanumi.db.repository;

import com.ssafy.nanumi.api.response.ProductAllDTO;
import com.ssafy.nanumi.db.entity.Product;

import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product,Long> {
    @Query(value =
        "SELECT p " +
        "FROM Product p " +
        "WHERE p.address.id = :addressId " +
        "AND p.isClosed = false " +
        "AND p.isMatched = false " +
        "AND p.isDeleted = false " +
        "AND p.name Like %:name% " +
        "AND p.user.id NOT IN :blockers " +
        "AND p.user.id NOT IN :targets")
    Page<ProductAllDTO> searchAll(@Param("addressId") long addressId, @Param("blockers") List<Long> blockers, @Param("targets") List<Long> targets, @Param("name") String name, Pageable pageable);

    @Query(value = "select p " +
            "from Product p " +
            "where p.address.id = :addressId " +
            "and p.isClosed = false " +
            "and p.isDeleted = false " +
            "and p.isMatched = false " +
            "and p.user.id NOT IN :blockers " +
            "and p.user.id NOT IN :targets")
    Page<ProductAllDTO> findAllProduct(@Param("addressId") Long addressId, @Param("blockers") List<Long> blockers, @Param("targets") List<Long> targets, Pageable pageable);

    @Query(value = "select p " +
            "from Product p " +
            "where p.address.id = :addressId " +
            "and p.category.id = :categoryId " +
            "and p.isDeleted = false " +
            "and p.isClosed = false " +
            "and p.isMatched = false " +
            "and p.user.id NOT IN :blockers " +
            "and p.user.id NOT IN :targets")
    Page<ProductAllDTO> findAllCategoryProduct(@Param("addressId") Long addressId, @Param("categoryId") Long categoryId, @Param("blockers") List<Long> blockers, @Param("targets") List<Long> targets, Pageable pageable);

    @Query(value = "select count(p) " +
            "from Product p " +
            "where p.user.id = :userId " +
            "and p.isClosed = false " +
            "and p.isDeleted = false " +
            "and p.isMatched = false ")
    Optional<Integer> findGivingCount(@Param("userId") long userId);
}
