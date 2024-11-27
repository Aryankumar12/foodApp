package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.Entity.User;
import com.example.Repository.UserRepository;
import com.example.demo.model.RegisterRequest;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    // Check if email already exists
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    // Register new user
    public String registerUser(RegisterRequest registerRequest) {
        // Check if email already exists
        if (existsByEmail(registerRequest.getEmail())) {
            return "Email is already in use.";
        }

        // Create a new user entity
        User user = new User();
        user.setName(registerRequest.getName());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword())); // Encrypt password
        user.setContact(registerRequest.getContact());
        user.setDescription(registerRequest.getDescription());

        // Set default role as CUSTOMER (can be changed if needed)
        user.setRole(registerRequest.getRole() != null ? registerRequest.getRole() : User.Role.CUSTOMER);

        // Save the user
        userRepository.save(user);
        return "User registered successfully!";
    }
}
