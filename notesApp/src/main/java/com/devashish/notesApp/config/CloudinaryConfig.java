package com.devashish.notesApp.config;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Map;

@Configuration
public class CloudinaryConfig {

    @Bean
    public Cloudinary cloudinary() {
        return new Cloudinary(ObjectUtils.asMap(
                "cloud_name", "dn1q3faej",
                "api_key", "121511384593929",
                "api_secret", "-cpHMnTp6axkPTY_Ih1mn8XUIZc"
        ));
    }
}
