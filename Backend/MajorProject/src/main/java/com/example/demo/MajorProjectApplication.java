package com.example.demo;

import org.springframework.boot.SpringApplication;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
//import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan(basePackages = "com.example.Entity")
@EnableJpaRepositories(basePackages = "com.example.Repository")
public class MajorProjectApplication {

    public static void main(String[] args) {
        SpringApplication.run(MajorProjectApplication.class, args);
    }

}

