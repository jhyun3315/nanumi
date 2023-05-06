package com.ssafy.nanumi.db.repository;

import com.ssafy.nanumi.api.response.ProductAllDTO;
import com.ssafy.nanumi.api.response.ReviewReadDTO;
import com.ssafy.nanumi.db.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {

    Optional<User> findByEmail(String email);
    Optional<User> findByIdAndIsDeletedFalse(long userId);

    @Query(value = "select p " +
            "from Review p " +
            "where p.receiver.id = :userId")
    Page<ReviewReadDTO> getAllReview(long userId, Pageable pageable) ;

    @Query(value = "select p " +
            "from Product p " +
            "where p.isDeleted = false and p.user.id = :userId")
    Page<ProductAllDTO> getAllReceiveProduct(long userId, Pageable pageable);

    @Query(value = "select p " +
            "from Product p " +
            "where p.isDeleted = false and p.isMatched = false and p.user.id = :userId")
    Page<ProductAllDTO> getAllMatchingProduct(long userId, Pageable pageable);


}
