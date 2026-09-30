package com.gurukul.config;

import com.gurukul.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class StartupInitializer implements CommandLineRunner {

    @Autowired
    private AuthService authService;

    @Override
    public void run(String... args) throws Exception {
        authService.initializeAdmin();
        System.out.println("Admin user initialized");
    }
}

