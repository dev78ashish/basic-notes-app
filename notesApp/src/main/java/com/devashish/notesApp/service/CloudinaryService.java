package com.devashish.notesApp.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Service
public class CloudinaryService {

    @Autowired
    private Cloudinary cloudinary;

    public Map<String, String> uploadFile(MultipartFile file) throws IOException {
        Map<?, ?> result = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());

        String imageUrl = result.get("secure_url").toString();
        String publicId = result.get("public_id").toString();

        Map<String, String> response = new HashMap<>();
        response.put("imageUrl", imageUrl);
        response.put("publicId", publicId);
        return response;
    }
}
