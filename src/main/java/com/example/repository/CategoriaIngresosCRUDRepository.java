package com.example.repository;

import org.springframework.data.repository.CrudRepository;
import com.example.entities.CategoriaIngreso;

public interface CategoriaIngresosCRUDRepository extends CrudRepository<CategoriaIngreso, Long> {
    CategoriaIngreso findByDescripcion(String description);
}