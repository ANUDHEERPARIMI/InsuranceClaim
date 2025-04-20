package com.form.service;


import com.form.entity.ClaimForm;
import com.form.repository.FormRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class FormService {

    @Autowired
    private FileUploadService fileUploadService;

    @Autowired
    private FormRepository claimFormRepository;

    public ClaimForm submitClaimForm(ClaimForm claimForm, MultipartFile file) throws IOException {
        // Upload the file and get the file path
        String filePath = fileUploadService.uploadFile(file);

        // Set the file path in the claim form entity
        claimForm.setFilePath(filePath);

        // Save the claim form entity with all the details
        return claimFormRepository.save(claimForm);
    }
}