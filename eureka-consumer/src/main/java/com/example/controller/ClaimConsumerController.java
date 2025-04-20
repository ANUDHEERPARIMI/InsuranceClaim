package com.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.example.Entity.ClaimForm;
import com.example.Entity.ClaimStatus;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class ClaimConsumerController {

    @Autowired
    private DiscoveryClient discoveryClient;

    @Autowired
    private RestTemplate restTemplate;

//    private String getServiceUrl() {
//        List<ServiceInstance> siList = discoveryClient.getInstances("TEAMS");
//        if (siList.isEmpty()) {
//            throw new RuntimeException("No instances of CLAIM-SERVICE found");
//        }
//        return siList.get(0).getUri().toString();
//    }

    @PostMapping("/submit-claim")
    public ClaimForm submitClaim(@RequestBody ClaimForm claimForm) {
    	List<ServiceInstance> siList = discoveryClient.getInstances("LOGIN-SERVICE");
		ServiceInstance si = siList.get(0);
        String url = si.getUri()+ "/claims/submit";
        return restTemplate.postForObject(url, claimForm, ClaimForm.class);
    }

    @GetMapping("/claims")
    public List<ClaimForm> getClaimsOnHold() {
    	List<ServiceInstance> siList = discoveryClient.getInstances("TEAMS");
		ServiceInstance si = siList.get(0);
        String url = si.getUri()+ "/claims/all";
        List<ClaimForm> response = restTemplate.getForObject(url, List.class);
        return response;
    }

    @GetMapping("/claims/{policyNumber}")
    public List<ClaimForm> getClaimsByPolicyNumber(@PathVariable Long policyNumber) {
    	List<ServiceInstance> siList = discoveryClient.getInstances("TEAMS");
		ServiceInstance si = siList.get(0);
        String url = si.getUri()+"/claims/policy/" + policyNumber;
        return restTemplate.getForObject(url, List.class);
    }

    @PutMapping("/update-claim-status/{empid}")
    public String updateClaimStatus(@PathVariable Long empid, @RequestParam ClaimStatus status) {
    	List<ServiceInstance> siList = discoveryClient.getInstances("TEAMS");
		ServiceInstance si = siList.get(0);
        String url = si.getUri()+ "/claims/update-status/" + empid + "?status=" + status;
        System.out.println(url);
        return restTemplate.postForObject(url, null, String.class);
    }
}