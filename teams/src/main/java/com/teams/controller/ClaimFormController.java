package com.teams.controller;

import com.teams.entity.ClaimForm;
import com.teams.entity.ClaimStatus;
import com.teams.service.ClaimFormService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/claims")
@CrossOrigin(origins = "http://localhost:5173") // Allow React frontend access
public class ClaimFormController {

    @Autowired
    private ClaimFormService service;

    @PostMapping("/submit")
    public ClaimForm submitClaim(@RequestBody ClaimForm claimForm) {
        return service.saveClaimForm(claimForm);
    }

    @GetMapping("/all")
    public List<ClaimForm> getClaimsOnHold() {
        return service.getClaimsOnHold();
    }

    @GetMapping("/policy/{policyNumber}")
    public List<ClaimForm> getClaimsByPolicyNumber(@PathVariable Long policyNumber) {
        return service.getClaimsByPolicyNumber(policyNumber);
    }

    @PutMapping("/update-status/{empid}")
    public String updateClaimStatus(@PathVariable Long empid, @RequestParam ClaimStatus status) {
        return service.updateClaimStatus(empid, status);
    }
    @GetMapping("/status/{empid}")
    public ClaimStatus getClaimStatusByEmpId(@PathVariable Long empid) {
        return service.geClaimStatusByEmpId(empid);
    }
}

