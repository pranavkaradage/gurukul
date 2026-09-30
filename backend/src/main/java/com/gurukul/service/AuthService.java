package com.gurukul.service;

import com.gurukul.dto.AuthRequest;
import com.gurukul.dto.AuthResponse;
import com.gurukul.entity.AdminUser;
import com.gurukul.repository.AdminUserRepository;
import com.gurukul.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private AdminUserRepository adminUserRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public AuthResponse authenticate(AuthRequest request) {
        Optional<AdminUser> userOpt = adminUserRepository.findByUsername(request.getUsername());
        
        if (userOpt.isEmpty()) {
            throw new RuntimeException("Invalid credentials");
        }

        AdminUser user = userOpt.get();
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        String token = jwtUtil.generateToken(user.getUsername());
        return new AuthResponse(token, user.getUsername());
    }

    public void initializeAdmin() {
        if (adminUserRepository.count() == 0) {
            AdminUser admin = new AdminUser();
            admin.setUsername("gurukul_admin@gmail.com");
            admin.setPassword(passwordEncoder.encode("Gurukul@123"));
            adminUserRepository.save(admin);
        } else {
            // Update existing admin user with new credentials if needed
            Optional<AdminUser> existingAdmin = adminUserRepository.findByUsername("gurukuladminn");
            if (existingAdmin.isPresent()) {
                AdminUser admin = existingAdmin.get();
                admin.setUsername("gurukul_admin@gmail.com");
                admin.setPassword(passwordEncoder.encode("Gurukul@123"));
                adminUserRepository.save(admin);
            } else {
                // Check if new username exists, if not create it
                Optional<AdminUser> newAdmin = adminUserRepository.findByUsername("gurukul_admin@gmail.com");
                if (newAdmin.isEmpty()) {
                    AdminUser admin = new AdminUser();
                    admin.setUsername("gurukul_admin@gmail.com");
                    admin.setPassword(passwordEncoder.encode("Gurukul@123"));
                    adminUserRepository.save(admin);
                }
            }
        }
    }
}

