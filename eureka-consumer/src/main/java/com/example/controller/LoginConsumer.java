package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/consumer")
@CrossOrigin(origins = "http://localhost:5173")
public class LoginConsumer {

    @Autowired
    private DiscoveryClient discoveryClient;

    @Autowired
    private RestTemplate restTemplate;

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody LoginRequest loginRequest) {
        List<ServiceInstance> instances = discoveryClient.getInstances("LOGINPRODUCER");
        if (instances.isEmpty()) {
            throw new RuntimeException("LOGIN-SERVICE is not available");
        }
        String url = instances.get(0).getUri() + "/api/login/login";
        ResponseEntity<Map> response = restTemplate.postForEntity(url, loginRequest, Map.class);

        return ResponseEntity.ok(response.getBody());
    }
}

class LoginRequest {
    private Long id;
    private String password;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
