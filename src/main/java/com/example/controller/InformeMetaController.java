package com.example.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.entities.InformeMeta;
import com.example.service.InformeMetaService;

@RequestMapping("/informe-meta")
public class InformeMetaController {
    @Autowired
    private InformeMetaService informeMetaService;

    @GetMapping("/get")
    public List<InformeMeta> getInformeMeta(){
        return informeMetaService.getAllInformeMeta();
    }
    
}
