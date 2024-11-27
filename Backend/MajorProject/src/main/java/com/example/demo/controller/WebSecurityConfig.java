package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.example.demo.security.JwtAuthenticationFilter;
//
//@Configuration
//@EnableWebSecurity
//public class WebSecurityConfig {
//
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http
//            .csrf().disable() // Disable CSRF for testing; enable in production if needed
//            .cors().and() // Enable CORS
//            .authorizeHttpRequests(authz -> authz
//                .requestMatchers("/auth/register").permitAll()
//                .requestMatchers("/auth/login").permitAll() // Allow login requests without authentication
//                .requestMatchers("/retailer/**").hasAuthority("RETAILER")
//                .requestMatchers("/customer/**").hasAuthority("CUSTOMER")
//                .anyRequest().authenticated()
//            )
//            .formLogin(form -> form
//                .permitAll()
//            );
//
//        return http.build();
//    }
//
//    @Bean
//    public CorsConfigurationSource corsConfigurationSource() {
//        CorsConfiguration configuration = new CorsConfiguration();
//        configuration.setAllowedOrigins(List.of("http://localhost:5173")); // Allow React frontend
//        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS")); // Allow HTTP methods
//        configuration.setAllowedHeaders(List.of("*")); // Allow all headers
//        configuration.setAllowCredentials(true); // Allow cookies if needed
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", configuration);
//        return source;
//    }
//
//    @Bean
//    public PasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder();
//    }
//
//    @Bean
//    public UserDetailsService userDetailsService() {
//        // Example: In-memory user for demonstration
//        return username -> {
//            if ("user".equals(username)) {
//                return org.springframework.security.core.userdetails.User
//                        .withUsername("user")
//                        .password(passwordEncoder().encode("password"))
//                        .authorities("USER")
//                        .build();
//            }
//            throw new org.springframework.security.core.userdetails.UsernameNotFoundException("User not found");
//        };
//    }
//
//    @Bean
//    public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
//        return http.getSharedObject(AuthenticationManagerBuilder.class)
//            .userDetailsService(userDetailsService())
//            .passwordEncoder(passwordEncoder())
//            .and()
//            .build();
//    }
//}
@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

	  @Autowired
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public WebSecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable()
            .cors().and()
            .authorizeHttpRequests(authz -> authz
                .requestMatchers("/auth/register").permitAll()
                .requestMatchers("/auth/login").permitAll() // Allow login requests without authentication
                .requestMatchers("/retailer/**").hasAuthority("RETAILER")
                .requestMatchers("/customer/**").hasAuthority("CUSTOMER")
                .anyRequest().authenticated()
            )
            .formLogin(form -> form
                .permitAll()
            );

        // Add JwtAuthenticationFilter before UsernamePasswordAuthenticationFilter
        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:5173")); // Allow React frontend
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        // Example: In-memory user for demonstration
        return username -> {
            if ("user".equals(username)) {
                return org.springframework.security.core.userdetails.User
                        .withUsername("user")
                        .password(passwordEncoder().encode("password"))
                        .authorities("USER")
                        .build();
            }
            throw new org.springframework.security.core.userdetails.UsernameNotFoundException("User not found");
        };
    }

    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
        return http.getSharedObject(AuthenticationManagerBuilder.class)
            .userDetailsService(userDetailsService())
            .passwordEncoder(passwordEncoder())
            .and()
            .build();
    }
}


//
//@Configuration
//@EnableWebSecurity
//public class WebSecurityConfig {
//
//    @Autowired
//    private final JwtAuthenticationFilter jwtAuthenticationFilter;
//
//    public WebSecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
//        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
//    }
//
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http
//            .csrf().disable()
//            .cors().and()
//            .authorizeHttpRequests(authz -> authz
//                .requestMatchers("/auth/register").permitAll()  // Allow registration without authentication
//                .requestMatchers("/auth/login").permitAll()     // Allow login without authentication
//                .requestMatchers("/retailer/**").hasAuthority("RETAILER")  // Only retailers can access this route
//                .requestMatchers("/customer/**").hasAuthority("CUSTOMER")  // Only customers can access this route
//                .anyRequest().authenticated()  // Any other request needs authentication
//            )
//            .formLogin(form -> form
//                .loginPage("/login")  // Custom login page URL if you want
//                .loginProcessingUrl("/auth/login")  // URL to process the login request
//                .defaultSuccessUrl("/home", true)  // Redirect to home page after successful login
//                .failureUrl("/login?error=true")   // Redirect to login page if login fails
//                .permitAll() // Allow everyone to access the login page
//            )
//            .logout(logout -> logout
//                .logoutUrl("/logout")
//                .logoutSuccessUrl("/login?logout=true") // Redirect to login after logout
//            );
//
//        // Add JwtAuthenticationFilter before UsernamePasswordAuthenticationFilter
//        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
//
//        return http.build();
//    }
//
//    @Bean
//    public CorsConfigurationSource corsConfigurationSource() {
//        CorsConfiguration configuration = new CorsConfiguration();
//        configuration.setAllowedOrigins(List.of("http://localhost:5173")); // Allow React frontend
//        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
//        configuration.setAllowedHeaders(List.of("*"));
//        configuration.setAllowCredentials(true);
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", configuration);
//        return source;
//    }
//
//    @Bean
//    public PasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder();  // Password encoding
//    }
//
//    @Bean
//    public UserDetailsService userDetailsService() {
//        // Example: In-memory user for demonstration purposes
//        return username -> {
//            if ("user".equals(username)) {
//                return org.springframework.security.core.userdetails.User
//                        .withUsername("user")
//                        .password(passwordEncoder().encode("password"))
//                        .authorities("USER")  // You can add roles like "USER", "ADMIN", etc.
//                        .build();
//            }
//            throw new org.springframework.security.core.userdetails.UsernameNotFoundException("User not found");
//        };
//    }
//
//    @Bean
//    public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
//        return http.getSharedObject(AuthenticationManagerBuilder.class)
//            .userDetailsService(userDetailsService())
//            .passwordEncoder(passwordEncoder())
//            .and()
//            .build();
//    }
//}
//
