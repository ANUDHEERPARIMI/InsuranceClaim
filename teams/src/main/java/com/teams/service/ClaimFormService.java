package com.teams.service;

import com.teams.entity.ClaimForm;
import com.teams.entity.ClaimStatus;
import com.teams.repository.ClaimFormRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClaimFormService {

    @Autowired
    private ClaimFormRepository repository;

    public ClaimForm saveClaimForm(ClaimForm claimForm) {
        claimForm.setStatus(ClaimStatus.ON_HOLD); // Default status
        return repository.save(claimForm);
    }
    public List<ClaimForm> getClaimsOnHold() {
        return repository.findByStatus(ClaimStatus.ON_HOLD);
    }

    public List<ClaimForm> getAllClaims() {
        return repository.findAll();
    }

    public List<ClaimForm> getClaimsByPolicyNumber(Long policyNumber) {
        return repository.findByPolicyNumber(policyNumber);
    }

    public String updateClaimStatus(Long empid, ClaimStatus status) {
        Optional<ClaimForm> optionalClaim = repository.findById(empid);
        if (optionalClaim.isPresent()) {
            ClaimForm claim = optionalClaim.get();
            claim.setStatus(status);
            repository.save(claim);
            return "Claim status updated to " + status;
        }
        return "Claim not found.";
    }
    public ClaimStatus geClaimStatusByEmpId(Long empid) {
        return repository.findById(empid)
                .map(ClaimForm::getStatus)
                .orElse(null);
    }
}

