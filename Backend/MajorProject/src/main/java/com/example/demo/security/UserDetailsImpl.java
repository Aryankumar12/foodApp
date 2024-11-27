
package com.example.demo.security;
import java.util.Collection;

import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;


public class UserDetailsImpl implements UserDetails {

    private String username;
    private String password;
    private String role;

    // Constructor to initialize user details
    public UserDetailsImpl(String username, String password, String role) {
        this.username = username;
        this.password = password;
        this.role = role;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Returning the role as a GrantedAuthority
        return List.of(new SimpleGrantedAuthority(role));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // Default true, can be customized
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // Default true, can be customized
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // Default true, can be customized
    }

    @Override
    public boolean isEnabled() {
        return true; // Default true, can be customized
    }

    // Additional method to get the role (if necessary)
    public String getRole() {
        return role;
    }
}
