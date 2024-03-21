package com.example.repository;

import com.example.entities.Usuario;
import org.springframework.data.repository.CrudRepository;

public interface UsuarioCRUDRepository extends CrudRepository<Usuario,Integer> {
    
}
