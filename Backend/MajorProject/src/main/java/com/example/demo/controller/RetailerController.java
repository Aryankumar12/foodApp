package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Entity.Food;
import com.example.Repository.FoodRepository;

@RestController
public class RetailerController {

    private final FoodRepository foodRepository;

    @Autowired
    public RetailerController(FoodRepository foodRepository) {
        this.foodRepository = foodRepository;
    }

    @GetMapping("/foods")
    public List<Food> getAllFoods() {
        return foodRepository.findAll();
    }
}
