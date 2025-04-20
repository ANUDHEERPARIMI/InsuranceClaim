package com.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import com.example.Entity.Claim;

@RestController
@RequestMapping("/consumer")
public class discoveryController {
    
	 	@Autowired
	    private DiscoveryClient discoveryClient;

	    @Autowired
	    private RestTemplate restTemplate;

	    @PostMapping("/sendClaim")
	    public ResponseEntity<String> sendClaim(@RequestBody Claim claim) {
	        List<ServiceInstance> instances = discoveryClient.getInstances("LOGIN-SERVICE");

	        if (instances == null || instances.isEmpty()) {
	            return ResponseEntity.status(503).body("LOGIN-SERVICE is not available");
	        }

	        // Get the first available instance of the producer
	        ServiceInstance serviceInstance = instances.get(0);
	        String producerUrl = serviceInstance.getUri() + "/claim"; // URL to send data

	        // Send claim data to producer
	        ResponseEntity<String> response = restTemplate.postForEntity(producerUrl, claim, String.class);

	        return ResponseEntity.ok("Claim sent successfully: " + response.getBody());
	    }
}

