package com.example.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.entities.Egreso;
import com.example.repository.EgresosRepository;

@Service
public class EgresosService {
    

    @Autowired
    private EgresosRepository egresosRepository;

    public List<Egreso> getAllEgresos(){

        return egresosRepository.getAllEgresos();

    }

    public Egreso save(Egreso s){
        return egresosRepository.save(s);

    }
}
