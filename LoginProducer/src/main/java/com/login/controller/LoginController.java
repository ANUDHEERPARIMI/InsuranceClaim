package com.login.controller;
import com.login.Service.LoginService;
import com.login.Service.ManagerService;
import com.login.entity.Login;
import com.login.entity.Manager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/login")
@CrossOrigin(origins = "http://localhost:5173") 
public class LoginController {

    @Autowired
    private LoginService loginDetailsService;

    @Autowired
    private ManagerService managerDetailsService;

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody LoginRequest loginRequest) {
        Map<String, Object> response = new HashMap<>();

        if (loginRequest.getId() == null) {
            response.put("message", "User ID is required");
            return ResponseEntity.status(400).body(response);
        }

        Optional<Login> loginDetailsOpt = loginDetailsService.getLoginDetailsById(loginRequest.getId());
        if (loginDetailsOpt.isEmpty()) {
            response.put("message", "User not found");
            return ResponseEntity.status(404).body(response);
        }

        Login loginDetails = loginDetailsOpt.get();
        if (!loginRequest.getPassword().equals(loginDetails.getPass())) {
            response.put("message", "Invalid password");
            return ResponseEntity.status(401).body(response);
        }

        response.put("id", loginDetails.getEmpId());
        response.put("username", loginDetails.getName());

        Optional<Manager> managerDetailsOpt = managerDetailsService.getManagerById(loginDetails.getEmpId());
        boolean isManager = managerDetailsOpt.isPresent();
        response.put("isManager", isManager);

        return ResponseEntity.ok(response);
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
