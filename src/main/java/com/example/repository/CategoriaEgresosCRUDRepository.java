package com.example.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import com.example.entities.CategoriaEgreso;

public interface  CategoriaEgresosCRUDRepository extends CrudRepository<CategoriaEgreso, Long>{
    CategoriaEgreso findBydescripcion(String description);
    Optional<CategoriaEgreso> findById(Long id); 
}
