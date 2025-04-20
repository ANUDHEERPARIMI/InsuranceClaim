package com.login.entity;
import jakarta.persistence.*;

@Entity
@Table(name = "type_of_insurance")
public class InsuranceType {
    public Long getPolicyNumber() {
		return policyNumber;
	}
	public void setPolicyNumber(Long policyNumber) {
		this.policyNumber = policyNumber;
	}
	public Double getMaxAmount() {
		return maxAmount;
	}
	public void setMaxAmount(Double maxAmount) {
		this.maxAmount = maxAmount;
	}
	public String getPolicyName() {
		return policyName;
	}
	public void setPolicyName(String policyName) {
		this.policyName = policyName;
	}
	@Id
    private Long policyNumber;
    private Double maxAmount;
    private String policyName;
}