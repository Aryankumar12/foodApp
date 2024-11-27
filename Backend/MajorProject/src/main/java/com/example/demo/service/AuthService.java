

//handle register logic
package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.Entity.User;
import com.example.Repository.UserRepository;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository; // Assuming you have a UserRepository

    @Autowired
    private BCryptPasswordEncoder passwordEncoder; // To encode the password

    // Method to register a new user
    public String registerUser(User registrationRequest) {
        // Check if email already exists in the database
        if (userRepository.existsByEmail(registrationRequest.getEmail())) {
            return "Email is already in use.";
        }

        // Encode the password before saving
        String encodedPassword = passwordEncoder.encode(registrationRequest.getPassword());
        registrationRequest.setPassword(encodedPassword); // Set the encoded password

        // Save the new user
        userRepository.save(registrationRequest);

        return "User registered successfully!";
    }
}
