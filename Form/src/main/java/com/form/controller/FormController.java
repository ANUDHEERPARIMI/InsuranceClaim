package com.form.controller;

import com.form.entity.ClaimForm;
import com.form.entity.ClaimStatus;
import com.form.service.FormService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/claim-form")
@CrossOrigin(origins = "http://localhost:5173") 
public class FormController {

    @Autowired
    private FormService claimFormService;

    @PostMapping("/submit")
    public ResponseEntity<String> submitClaimForm(
            @RequestParam("empid") long empid,
            @RequestParam("policyNumber") Long policyNumber,
            @RequestParam("claimAmount") Double claimAmount,
            @RequestParam("dateOfIncident") String dateOfIncident,
            @RequestParam("contactNumber") String contactNumber,
            @RequestParam("incidentDescription") String incidentDescription,
            @RequestParam("address") String address,
            @RequestParam("doctorEmail") String doctorEmail,
            @RequestParam("doctorName") String doctorName,
            @RequestParam("file") MultipartFile file) {
        try {
            // Create the ClaimForm object with form data
            ClaimForm claimForm = new ClaimForm();
            claimForm.setEmpid(empid);
            claimForm.setPolicyNumber(policyNumber);
            claimForm.setClaimAmount(claimAmount);
            claimForm.setDateOfIncident(dateOfIncident); // Assuming the date is passed as a string in yyyy-MM-dd format
            claimForm.setContactNumber(contactNumber);
            claimForm.setIncidentDescription(incidentDescription);
            claimForm.setAddress(address);
            claimForm.setDoctorEmail(doctorEmail);
            claimForm.setDoctorName(doctorName);
            claimForm.setStatus(ClaimStatus.ON_HOLD);

            // Call the service to save the form details and file
            claimFormService.submitClaimForm(claimForm, file);

            return ResponseEntity.ok("Claim form submitted successfully with the file uploaded.");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Failed to upload file or save claim form: " + e.getMessage());
        }
    }
}
