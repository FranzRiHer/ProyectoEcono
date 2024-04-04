package com.example.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.entities.InformeMeta;
import com.example.repository.InformeMetaRepository;
import com.example.repository.MetaRepository;

@Service
public class InformeMetaService {
    @Autowired
    private InformeMetaRepository informeMetaRepository;

    @Autowired
    private MetaRepository metaRepository;

    public List<InformeMeta> getAllInformeMeta(){
        return informeMetaRepository.getAllInformeMeta();
    }
}
