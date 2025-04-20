package com.example.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.model.Claim;
import com.example.repository.ClaimRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class ClaimService {
	
	@Autowired
	ClaimRepository claimRepository;
	
	public void addClaim(Claim claim) {
		claimRepository.save(claim);
		
	}

}
