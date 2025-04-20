package com.login.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.login.entity.Manager;
import com.login.repository.ManagerRepository;

@Service
public class ManagerService {
	
	@Autowired
    private ManagerRepository managerDetailsRepository;
	
	public Optional<Manager> getManagerById(Long id) {
        return managerDetailsRepository.findById(id);
    }
	

}
