package com.ssafy.nanumi.db.repository;

import com.ssafy.nanumi.api.response.ProductAllDTO;
import com.ssafy.nanumi.db.entity.Product;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product,Long> {
@Query(value =
        "SELECT p " +
        "FROM Product p " +
        "WHERE p.address.id = :addressId " +
        "AND p.isClosed = false " +
        "AND p.isMatched = false " +
        "AND p.isDeleted = false " +
        "AND p.name Like %:name%")
    Page<ProductAllDTO> searchAll(long addressId, String name, Pageable pageable);

    @Query(value = "select p " +
            "from Product p " +
            "where p.address.id = :addressId and p.isClosed = false and p.isDeleted = false and p.isMatched = false")
    Page<ProductAllDTO> findAllProduct(Long addressId, Pageable pageable);

    @Query(value = "select p " +
            "from Product p " +
            "where p.isDeleted = false and p.isClosed = false and p.isMatched = false and p.address.id = :addressId and p.category.id = :categoryId")
    Page<ProductAllDTO> findAllCategoryProuduct(Long addressId, Long categoryId, Pageable pageable);

    @Query(value = "select count(p) " +
            "from Product p " +
            "where p.user.id = :userId and p.isClosed = false and p.isDeleted = false and p.isMatched = false")
    Optional<Integer> findGivingCount(long userId);
}
