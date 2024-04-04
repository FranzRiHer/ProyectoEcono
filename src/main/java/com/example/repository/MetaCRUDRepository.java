package com.example.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import com.example.entities.Meta;

public interface MetaCRUDRepository extends JpaRepository<Meta, Long> {
}
