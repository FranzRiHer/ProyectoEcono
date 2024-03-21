package com.example.demo.repository;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.example.demo.entities.Egreso;

@Repository
public class EgresosRepository {
    
    @Autowired
    private EgresosCRUDRepository egresosCRUDRepository;

    public List<Egreso> getAllEgresos(){
        return (List<Egreso>) egresosCRUDRepository.findAll();
    }

    public Egreso save(Egreso s){
        return egresosCRUDRepository.save(s);
    }

}
