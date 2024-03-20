package com.example.repository;

import org.springframework.data.repository.CrudRepository;
import com.example.entities.Egresos;

public interface EgresosCRUDRepository extends CrudRepository<Egresos,Long> {
    
}
