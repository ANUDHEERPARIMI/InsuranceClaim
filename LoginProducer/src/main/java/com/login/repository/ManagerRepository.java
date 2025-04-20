package com.login.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.login.entity.*;

public interface ManagerRepository extends JpaRepository<Manager, Long> {
}
