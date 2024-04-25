package com.example.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.example.entities.Ingreso;
import java.util.List;

@Repository
public class IngresoRepository {
    
    @Autowired
    private IngresoCRUDRepository ingresosCRUDRepository;

    public List<Ingreso> getAllIngresos(){
        return(List<Ingreso>) ingresosCRUDRepository.findAll();
    }

    public Ingreso save(Ingreso i){
        System.out.println(i);
        return ingresosCRUDRepository.save(i);
    }
    
    
}
