package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Entity.Food;
import com.example.Repository.FoodRepository;

//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.example.Entity.FoodHistory;
//import com.example.demo.service.CustomerService;
//
//@RestController
//@RequestMapping("/api/customers")
//public class CustomerController {
//
//    @Autowired
//    private CustomerService customerService;
//
//    // Get customer food history
//    @GetMapping("/{customerId}/food-history")
//    public ResponseEntity<List<FoodHistory>> getFoodHistory(@PathVariable Long customerId) {
//        List<FoodHistory> foodHistory = customerService.getFoodHistory(customerId);
//        return ResponseEntity.ok(foodHistory);
//    }
//}
@RestController
@RequestMapping("/api/customer")
public class CustomerController {

    @Autowired
    private FoodRepository foodItemRepository;

    @GetMapping("/foodHistory")
    public List<Food> getFoodHistory() {
        return foodItemRepository.findAll();
    }
}