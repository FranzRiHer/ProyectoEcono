package com.example.repository;
import com.example.entities.Meta;

import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class MetaRepository {
    @Autowired
    private MetaCRUDRepository metaCRUDRepository;

    public List<Meta> getAllMetas(){
        return metaCRUDRepository.findAll();
    }

    public Meta save(Meta meta) {
        if (meta == null) {
            throw new IllegalArgumentException("El objeto Meta no puede ser nulo.");
        }
        return metaCRUDRepository.save(meta);
    }

    public Meta getMetaById(Long id){
        if (id == null) {
            throw new IllegalArgumentException("El id no puede ser nulo.");
        }
        return metaCRUDRepository.findById(id).orElse(null);
    }

    public Optional<Meta> findById(Long id){
        // No es necesario lanzar una excepción aquí, Optional.empty() es suficiente si no se encuentra la meta.
        return metaCRUDRepository.findById(id);
    }


    
    
}  
