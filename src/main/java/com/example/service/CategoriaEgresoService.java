package com.example.service;

import java.util.Arrays;
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

    public List<CategoriaEgreso> getCategorasEgresosUsuario(Long userID){
        return catEgRepo.getCategorasEgresosUsuario(userID);
    }

    @Transactional
    public CategoriaEgreso save(CategoriaEgreso catE){
        return catEgRepo.save(catE);
    }

    public List<CategoriaEgreso> categoriasEgresosIniciales(Long idUsuario) {
        // Verificar si existen categorías para el número de usuario
        List<CategoriaEgreso> categoriasExistente = catEgRepo.getCategorasEgresosUsuario(idUsuario);
        if (categoriasExistente.isEmpty()) {
            // Crear y guardar las categorías predeterminadas
            CategoriaEgreso categoria1 = new CategoriaEgreso( "Comida", idUsuario);
            CategoriaEgreso categoria2 = new CategoriaEgreso( "Social", idUsuario);
            CategoriaEgreso categoria3 = new CategoriaEgreso( "Transporte", idUsuario);
            List<CategoriaEgreso> categoriasNuevas = Arrays.asList(categoria1, categoria2, categoria3);
            catEgRepo.save(categoria1);
            catEgRepo.save(categoria2);
            catEgRepo.save(categoria2);
            return categoriasNuevas;
        }
        return categoriasExistente;
    }
}