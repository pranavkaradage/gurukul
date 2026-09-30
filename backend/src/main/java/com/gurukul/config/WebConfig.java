package com.gurukul.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Value("${file.upload.dir}")
    private String uploadDir;

    @Value("${app.cors.allowed-origins:http://localhost:3000,http://localhost:3001}")
    private String allowedOriginsProperty;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        String[] allowedOrigins = java.util.Arrays.stream(allowedOriginsProperty.split(","))
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .toArray(String[]::new);
        registry.addMapping("/**")
                .allowedOrigins(allowedOrigins)
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Ensure the path ends with a slash for proper directory resolution
        String resourceLocation = uploadDir;
        if (!resourceLocation.endsWith("/")) {
            resourceLocation = resourceLocation + "/";
        }
        // If it's a relative path, make it absolute relative to the project root
        if (!resourceLocation.startsWith("/") && !resourceLocation.startsWith("file:")) {
            // Get the project root directory
            String projectRoot = System.getProperty("user.dir");
            resourceLocation = "file:" + projectRoot + "/" + resourceLocation;
        } else if (!resourceLocation.startsWith("file:")) {
            resourceLocation = "file:" + resourceLocation;
        }
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations(resourceLocation)
                .setCachePeriod(3600); // Cache for 1 hour
    }
}

