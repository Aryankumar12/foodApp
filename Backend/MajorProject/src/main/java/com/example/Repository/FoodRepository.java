package com.example.Repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.Entity.Food;

@Repository
public interface FoodRepository extends JpaRepository<Food, Long> {
}
