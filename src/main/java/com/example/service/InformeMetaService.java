package com.example.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.entities.InformeMeta;
import com.example.repository.InformeMetaRepository;

@Service
public class InformeMetaService {
    @Autowired
    private InformeMetaRepository informeMetaRepository;

    public List<InformeMeta> getAllInformeMeta(){
        return informeMetaRepository.getAllInformeMeta();
    }

}
