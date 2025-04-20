package com.piechart.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "form_details")
public class ClaimForm {
    
    @Id
    private long empid;

    @Enumerated(EnumType.STRING)
    private ClaimStatus status; // Added status field

    private Long policyNumber;
    private Double claimAmount;
    private String dateOfIncident;
    private String contactNumber;
    private String incidentDescription;
    private String address;
    private String doctorEmail;
    private String filePath;
    private String doctorName;

    // Getters and setters
    public long getEmpid() {
        return empid;
    }

    public void setEmpid(long empid) {
        this.empid = empid;
    }

    public ClaimStatus getStatus() {
        return status;
    }

    public void setStatus(ClaimStatus status) {
        this.status = status;
    }

    public Long getPolicyNumber() {
        return policyNumber;
    }

    public void setPolicyNumber(Long policyNumber) {
        this.policyNumber = policyNumber;
    }

    public Double getClaimAmount() {
        return claimAmount;
    }

    public void setClaimAmount(Double claimAmount) {
        this.claimAmount = claimAmount;
    }

    public String getDateOfIncident() {
        return dateOfIncident;
    }

    public void setDateOfIncident(String dateOfIncident) {
        this.dateOfIncident = dateOfIncident;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public String getIncidentDescription() {
        return incidentDescription;
    }

    public void setIncidentDescription(String incidentDescription) {
        this.incidentDescription = incidentDescription;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getDoctorEmail() {
        return doctorEmail;
    }

    public void setDoctorEmail(String doctorEmail) {
        this.doctorEmail = doctorEmail;
    }

    public String getDoctorName() {
        return doctorName;
    }

    public void setDoctorName(String doctorName) {
        this.doctorName = doctorName;
    }

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }
}

// Enum for claim status}
