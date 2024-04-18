package com.example.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
    
    // @GetMapping("/get_informes_metas_csv/{id}")
    // public ResponseEntity<String> getMetasCsv(@PathVariable(value = "id") Long id_meta){
    //     List<InformeMeta> informes = InformeMetaService.getInformesMetas(id_meta);
    //     String csvContent = informeMetaService.convertInformeMetasToCSV(informes);
    //     HttpHeaders headers = new HttpHeaders();
    //     headers.add("Content-Disposition", "attachment; filename=informes_metas.csv");
    //     headers.add("Content-Type", "text/csv; charset=utf-8");

    //     return new ResponseEntity<>(csvContent, headers, HttpStatus.OK);
    // }
}
