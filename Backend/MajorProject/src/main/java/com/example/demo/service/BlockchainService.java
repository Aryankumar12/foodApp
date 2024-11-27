package com.example.demo.service;

import org.springframework.stereotype.Service;

import com.example.Entity.Food;

@Service
public class BlockchainService {

    // Assume you have a blockchain client initialized here

    public void saveFoodItemToBlockchain(Food foodItem) {
        // Implement blockchain logic here (using Web3j or other libraries)
        System.out.println("Food item saved to blockchain: " + foodItem.getName());
    }
}
