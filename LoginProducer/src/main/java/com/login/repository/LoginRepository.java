package com.login.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import com.login.entity.Login;

public interface LoginRepository extends JpaRepository<Login, Long> {
}
