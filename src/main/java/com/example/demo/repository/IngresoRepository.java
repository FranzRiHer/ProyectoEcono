package com.example.demo.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.example.demo.entities.Ingreso;
import java.util.List;

@Repository
public class IngresoRepository {
    
    @Autowired
    private IngresoCRUDRepository ingresosCRUDRepository;

    public List<Ingreso> getAllIngresos(){
        return(List<Ingreso>) ingresosCRUDRepository.findAll();
    }

    public Ingreso save(Ingreso i){
        return ingresosCRUDRepository.save(i);
    }
    
}
