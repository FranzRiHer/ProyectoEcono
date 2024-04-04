package com.example.repository;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.example.entities.Egreso;


@Repository
public class EgresosRepository {
    
    @Autowired
    private EgresosCRUDRepository egresosCRUDRepository;

    public List<Egreso> getAllEgresos(){
        return (List<Egreso>) egresosCRUDRepository.findAll();
    }

    public Egreso save(Egreso e){
        return egresosCRUDRepository.save(e);
    }

}
