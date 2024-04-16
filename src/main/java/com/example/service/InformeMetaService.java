package com.example.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.entities.InformeMeta;
import com.example.entities.Meta;
import com.example.repository.InformeMetaRepository;
import com.example.repository.MetaRepository;

@Service
public class InformeMetaService {
    @Autowired
    private InformeMetaRepository informeMetaRepository;

    @Autowired
    private MetaRepository metaRepository;

    @Autowired
    private MetaService metaService;

    public List<InformeMeta> getAllInformeMeta(){
        return informeMetaRepository.getAllInformeMeta();
    }

    public List<InformeMeta> getInformesMetas(Long user_id) {
        Meta meta = MetaService.getMetaById(meta_id);
        return meta.getMetas();
    }

    public String convertInformesMetasToCSV(List<InformeMeta> informesList) {
        StringBuilder csvBuilder = new StringBuilder();
        // Añadir encabezados de columnas
        csvBuilder.append("Nombre,Porcentaje,Total_mes_actual\n");
    
        for (Meta informes : informesList) {
            csvBuilder.append(meta.getNombre())
                      .append(",")
                      .append(meta.getPorcentaje())
                      .append(",")
                      .append(meta.getTotal())
                      .append("\n");
        }
    
        return csvBuilder.toString();
    }
}
