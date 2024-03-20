package com.example.repository;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.example.entities.Egresos;

@Repository
public class EgresosRepository {
    
    @Autowired
    private EgresosCRUDRepository egresosCRUDRepository;

    public List<Egresos> getAllEgresos(){
        return (List<Egresos>) egresosCRUDRepository.findAll();
    }

    public Egresos save(Egresos s){
        return egresosCRUDRepository.save(s);
    }

}
