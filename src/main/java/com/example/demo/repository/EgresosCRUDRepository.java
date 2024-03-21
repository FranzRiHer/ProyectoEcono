package com.example.demo.repository;

import org.springframework.data.repository.CrudRepository;
import com.example.demo.entities.Egreso;

public interface EgresosCRUDRepository extends CrudRepository<Egreso,Long> {
    
}
