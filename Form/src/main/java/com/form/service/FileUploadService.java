package com.form.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class FileUploadService {

    private final String uploadDirectory = "/Users/parimianudheer/Desktop/backend-2/teams/src/main/resources/static/uploads/";

    public String uploadFile(MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            throw new IOException("Failed to store empty file.");
        }

        // Get the original file name
        String fileName = file.getOriginalFilename();
        if (fileName == null) {
            throw new IOException("Failed to get file name.");
        }

        // Create the full path to store the file
        Path path = Paths.get(uploadDirectory + fileName);

        // Save the file to the file system
        Files.copy(file.getInputStream(), path);

        // Return the relative file path
        return fileName;
    }
}
