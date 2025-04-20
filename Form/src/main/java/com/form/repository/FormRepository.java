package com.form.repository;
import com.form.entity.ClaimForm;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FormRepository extends JpaRepository<ClaimForm, Long> {
}
