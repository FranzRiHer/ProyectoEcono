package com.example.demo.repository;

import com.example.demo.entities.Usuario;
import org.springframework.data.repository.CrudRepository;

public interface UsuarioCRUDRepository extends CrudRepository<Usuario,Long> {
    
}
