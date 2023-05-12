package com.ssafy.nanumi.db.repository;

import com.ssafy.nanumi.db.entity.Report;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ReportRepository extends JpaRepository<Report, Long> {

    @Query(value = "select r " +
            "from Report r " +
            "where r.reported.id = :reportedId and r.reporter.id = :reporterId")
    Optional<Report> findByReportedIdAndReporterId(@Param("reportedId") long reportedId, @Param("reporterId") long reporterId);
}
