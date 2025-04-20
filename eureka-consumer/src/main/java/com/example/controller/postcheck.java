 package com.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.web.client.RestTemplate;

@RestController
public class postcheck {
	
	@Autowired
	DiscoveryClient discoveryClient;
	
	@Autowired
	RestTemplate restTemplate;
	
	@GetMapping("/tt")
	public String getProduct() {
		List<ServiceInstance> siList = discoveryClient.getInstances("LOGIN-SERVICE");
		ServiceInstance si = siList.get(0);
		String url = si.getUri()+"/message";
		String response = restTemplate.getForObject(url,String.class);
		System.out.println("Using discovery Client"+response);
		return response;
	}
	

}
