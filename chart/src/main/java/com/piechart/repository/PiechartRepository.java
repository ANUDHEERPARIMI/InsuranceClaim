package com.piechart.repository;

import com.piechart.entity.ClaimForm;
import com.piechart.entity.ClaimStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PiechartRepository extends JpaRepository<ClaimForm, Long> {

    long countByStatus(ClaimStatus status); }
