package com.example.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.repository.MetaRepository;

import jakarta.transaction.Transactional;

import com.example.entities.Meta;
import com.example.entities.Usuario;

@Service
public class MetaService {
    @Autowired
    private MetaRepository metaRepository;

    @Autowired
    public UsuarioService usuarioService;


    public List<Meta> getAllMetas(){
        return metaRepository.getAllMetas();
    }

    public Meta saveMeta(Meta meta){
        Usuario usuario = usuarioService.getUsuarioById(meta.getUsuario().getId());
        meta.setUsuario(usuario);
        return metaRepository.save(meta);
    }

    public Meta getMetaById(Long id){
        return metaRepository.getMetaById(id);
    }

    @Transactional
    public Meta updateMeta(Long id, Meta metaDetails) {
        Meta meta = getMetaById(id);

        meta.setPorcentaje(metaDetails.getPorcentaje());
        // ...cualquier otra propiedad que quieras actualizar
        
        return metaRepository.save(meta);
    }
    
}
