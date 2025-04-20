package com.teams.repository;
import com.teams.entity.ClaimStatus;
import com.teams.entity.ClaimForm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ClaimFormRepository extends JpaRepository<ClaimForm, Long> {
    List<ClaimForm> findByPolicyNumber(Long policyNumber);
    List<ClaimForm> findByStatus(ClaimStatus status);
}
