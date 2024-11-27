package com.example.Entity;


import com.example.demo.util.RoleDeserializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
//import jakarta.persistence.EnumType;
//import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "app_user") public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    
   
    @Size(min = 2, max = 100)
    private String name;
    @Email
    
    @Size(min = 5, max = 100)
    private String email;
    
   
    @Size(min = 6, max = 100)
    private String password;
    
//    @Size(min=10,max=12)
    private Long contact;
    
    @Size(min=5,max=20)
    private String description;
    
public Long getContact() {
		return contact;
	}
	public void setContact(Long contact) {
		this.contact = contact;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
//	   @Enumerated(EnumType.STRING)
	  @JsonDeserialize(using = RoleDeserializer.class)
    private Role role;  // Using enum for roles

	  public enum Role {
		    CUSTOMER,   // 0
		    RETAILER;   // 1

		    public static Role fromInt(int i) {
		        switch (i) {
		            case 0: return CUSTOMER;
		            case 1: return RETAILER;
		            default: throw new IllegalArgumentException("Unexpected value: " + i);
		        }
		    }
		} // Role will be either 'customer' or 'retailer'
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public Role getRole() {
		return role;
	}
	public void setRole(Role role) {
		this.role = role;
	}

    // Getters and Setters
}