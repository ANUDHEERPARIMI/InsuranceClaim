package com.login.entity;
import jakarta.persistence.*;

@Entity
@Table(name = "manager_details")
public class Manager {
    public Long getManagerId() {
		return managerId;
	}
	public void setManagerId(Long managerId) {
		this.managerId = managerId;
	}
	@Id
    private Long managerId;

}