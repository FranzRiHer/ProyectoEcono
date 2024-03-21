package com.example.repository;

import org.springframework.data.repository.CrudRepository;
import com.example.entities.Ingreso;

public interface IngresoCRUDRepository extends CrudRepository<Ingreso,Integer>{
    
}
