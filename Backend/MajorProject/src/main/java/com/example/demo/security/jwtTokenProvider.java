package com.example.demo.security;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class jwtTokenProvider {

    @Value("${jwt.secret}")  // Inject secret key from properties file
    private String SECRET_KEY;  // Secret key for signing JWT tokens

    private final long EXPIRATION_TIME = 86400000L;  // 24 hours in milliseconds

    // Method to generate JWT token
    public String generateToken(Authentication authentication) {
        UserDetails userPrincipal = (UserDetails) authentication.getPrincipal();
        
        String role = userPrincipal.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .findFirst()
                .orElse("user"); 

        // Create a key from the secret string
        Key key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes(StandardCharsets.UTF_8));

        // Build the JWT token with user details
        return Jwts.builder()
                .setSubject(userPrincipal.getUsername())  // Use getUsername from UserDetails
                .claim("role",role)  // Add role claim if needed
                .setIssuedAt(new Date())  // Set issue date
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))  // Set expiration date
                .signWith(key)  // Sign the token with the generated key
                .compact();  // Generate the compact token string
    }

    // Method to validate JWT token
    public boolean validateToken(String token) {
        try {
            // Create the same key from the secret key for validation
            Key key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes(StandardCharsets.UTF_8));

            // Use the older method for parsing and validating the token
            Jwts.parserBuilder()
                .setSigningKey(key)  // Set the signing key used to verify the token
                .build()
                .parseClaimsJws(token);    // Parse the token to validate its claims

            return true;
        } catch (Exception e) {
            return false;  // Return false if the token is invalid or expired
        }
    }

    // Method to extract username from JWT token
    public String getUsernameFromToken(String token) {
        // Create the key for decoding
        Key key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes(StandardCharsets.UTF_8));

        // Parse the JWT token and extract claims
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)  // Set the signing key used to validate the token
                .build()
                .parseClaimsJws(token)  // Parse the token
                .getBody();  // Get the body (claims) from the token

        return claims.getSubject();  // Get the username (subject) from the claims
    }
}
