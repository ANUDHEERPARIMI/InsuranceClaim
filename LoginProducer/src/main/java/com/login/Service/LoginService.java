package com.login.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.login.repository.LoginRepository;
import com.login.entity.Login;
import java.util.Optional;

@Service
public class LoginService {

    @Autowired
    private LoginRepository loginRepository;

    public Optional<Login> getLoginDetailsById(Long id) {
        return loginRepository.findById(id);
    }
 
}
