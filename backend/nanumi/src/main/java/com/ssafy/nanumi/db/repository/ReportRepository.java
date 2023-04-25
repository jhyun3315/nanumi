package com.ssafy.nanumi.db.repository;

import com.ssafy.nanumi.db.entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReportRepository extends JpaRepository<Report, Long> {

}
