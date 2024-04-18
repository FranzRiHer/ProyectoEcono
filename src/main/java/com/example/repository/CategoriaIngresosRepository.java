package com.example.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.example.entities.CategoriaIngreso;

@Repository
public class CategoriaIngresosRepository {

    @Autowired
    private CategoriaIngresosCRUDRepository categoriaIngresosCRUDRepository;

    public CategoriaIngreso save(CategoriaIngreso ci){
        return categoriaIngresosCRUDRepository.save(ci);
    }

    public List<CategoriaIngreso> getCategoriasIngresos(){
        return (List<CategoriaIngreso>) categoriaIngresosCRUDRepository.findAll();
    }

    public CategoriaIngreso getCategoriaByDescripcion(String desc){
        return categoriaIngresosCRUDRepository.findByDescripcion(desc);
    }

    public Optional<CategoriaIngreso> getCategoriaById(Long id){
        return categoriaIngresosCRUDRepository.findById(id);
    }
}