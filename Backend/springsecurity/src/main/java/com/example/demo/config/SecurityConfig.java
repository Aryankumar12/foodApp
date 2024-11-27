package com.example.demo.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
	
	@Autowired
	private UserDetailsService userDetailsService;
	
	@Autowired
	private JwtFilter jwtFilter;
      
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
	    return http
	        .csrf(customizer -> customizer.disable()) // Disable CSRF protection
	        .authorizeHttpRequests(request -> request
	            .requestMatchers("/register", "/login").permitAll() // Allow unauthenticated access to /register and /login
	            .anyRequest().authenticated() // Require authentication for all other endpoints
	        )
	        .httpBasic(Customizer.withDefaults()) // Enable HTTP Basic authentication
	        .sessionManagement(session -> 
	            session.sessionCreationPolicy(SessionCreationPolicy.STATELESS) // Set session management to stateless
	        )
	        .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
	        .build();
	}

	
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http
//            .csrf().disable()  // Disable CSRF for simplicity in testing with Postman
//            .authorizeRequests()
//                .requestMatchers("/register", "/login").permitAll()  // Allow unauthenticated access to /register and /login
//                .anyRequest().authenticated()  // Require authentication for other endpoints
//            .and()
//            .authenticationProvider(authenticationProvider());
//
//        return http.build();
//    }
		
//		@Bean
//		public UserDetailsService userDetailsService() {
//			UserDetails user1=User
//					.withDefaultPasswordEncoder()
//					.username("anshul")
//					.password("1234")
//					.roles("USER")
//					.build();
//			
//			
//			UserDetails user2=User
//					.withDefaultPasswordEncoder()
//					.username("ansh")
//					.password("12345")
//					.roles("ADMIN")
//					.build();
//			return new InMemoryUserDetailsManager(user1,user2);
//		}
				
	
	@Bean
	public AuthenticationProvider authenticationProvider() {
		DaoAuthenticationProvider provider=new DaoAuthenticationProvider();
		provider.setPasswordEncoder(new BCryptPasswordEncoder(12));
		provider.setUserDetailsService(userDetailsService);
		return provider;
	}
	
	@Bean
	public AuthenticationManager authenticatonManager(AuthenticationConfiguration config) throws Exception {
		return config.getAuthenticationManager();
		
	}
		
	
	
}
 