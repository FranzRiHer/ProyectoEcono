package com.example.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.entities.Ingreso;
import com.example.repository.IngresoRepository;


@Service
public class IngresoService {

    @Autowired
    private IngresoRepository ingresoRepository;

    public List<Ingreso> getAllIngresos(){
        return ingresoRepository.getAllIngresos();
    }
    public Ingreso save(Ingreso i){
        if(i.getDescripcion().equals("")){
            return null;
        }

        return ingresoRepository.save(i);
    }
}
