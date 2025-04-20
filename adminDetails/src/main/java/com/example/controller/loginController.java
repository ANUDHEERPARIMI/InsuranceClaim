package com.example.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.model.Claim;
import com.example.service.ClaimService;

@RestController
public class loginController {
	
	@Autowired
	ClaimService claimService;
	@GetMapping("/message")
	public String getMessage() {
		return "Producer Message";
	}
	
	@PostMapping("/claim")
	public void addClaim(@RequestBody Claim claim) {
		claimService.addClaim(claim);
	}

	
	
}

