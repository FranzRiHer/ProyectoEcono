package com.example.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.entities.CategoriaEgreso;
import com.example.repository.CategoriaEgresosRepository;
import jakarta.transaction.Transactional;

@Service
public class CategoriaEgresoService {
    @Autowired
    private CategoriaEgresosRepository catEgRepo;

    public List<CategoriaEgreso> getCategoriasEgresosUsuario(Long userID){
        return catEgRepo.getCategoriasEgresosUsuario(userID);
    }

    @Transactional
    public CategoriaEgreso save(CategoriaEgreso catE){
        return catEgRepo.save(catE);
    }

}