package com.example.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.entities.Usuario;

public interface UserRepository extends JpaRepository<Usuario,Integer> {
    Optional<Usuario> findByUsername(String username); 
    Optional<Usuario> findById(Long id);
    Optional<Usuario> findByUsernameAndEmail(String username, String email);
}

