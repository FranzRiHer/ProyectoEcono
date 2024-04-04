package com.example.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.entities.InformeMeta;

@Repository
public class InformeMetaRepository {
    @Autowired
    private InformeMetaCRUDRepository informeMetaCRUDRepository;

    public List<InformeMeta> getAllInformeMeta(){
        return (List<InformeMeta>) informeMetaCRUDRepository.findAll();
    }

    
}
