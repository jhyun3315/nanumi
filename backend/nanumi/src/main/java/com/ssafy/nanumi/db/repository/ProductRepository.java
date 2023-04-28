package com.ssafy.nanumi.db.repository;

import com.ssafy.nanumi.api.response.ProductAllDTO;
import com.ssafy.nanumi.db.entity.Product;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product,Long> {

    @Query(value = "select p " +
            "from Product p " +
            "where p.address.id = :addressId and p.isDeleted = false")
    Page<ProductAllDTO> findAllProduct(Long addressId, Pageable pageable);

    @Query(value = "select p " +
            "from Product p " +
            "where  p.isDeleted = false and p.address.id = :addressId and p.category.id = :categoryId")
    Page<ProductAllDTO> findAllCategoryProuduct(Long addressId, Long categoryId, Pageable pageable);

    @Query(value = "select count(p) " +
            "from Product p " +
            "where p.user.id = :userId and p.isDeleted = false and p.isClosed = false")
    Optional<Integer> findGivingCount(long userId);
}
