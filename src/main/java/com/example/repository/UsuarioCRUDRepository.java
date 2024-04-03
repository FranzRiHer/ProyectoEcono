package com.example.repository;

import com.example.entities.Usuario;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioCRUDRepository extends JpaRepository<Usuario,Long> {
    Optional<Usuario> findById(Long id); 
    
}
