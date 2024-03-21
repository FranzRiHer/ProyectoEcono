package com.example.repository;

import org.springframework.data.repository.CrudRepository;
import com.example.entities.Egreso;

public interface EgresosCRUDRepository extends CrudRepository<Egreso, Long> {
    
}
