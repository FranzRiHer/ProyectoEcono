package com.example.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.entities.Meta;
import com.example.entities.Usuario;
import com.example.repository.MetaRepository;

import jakarta.transaction.Transactional;

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

        return metaRepository.save(meta);
    }

    public void createDefaultMetasForUser(Usuario user) {
        List<Meta> defaultMetas = getDefaultMetas(user);
        for (Meta meta : defaultMetas) {
            metaRepository.save(meta); // Guarda cada meta en la base de datos
        }
    }
    
    public List<Meta> getDefaultMetas(Usuario user) {
        // Retorna una lista de objetos Meta con los valores predeterminados y el ID de usuario establecido
        List<Meta> metas = new ArrayList<>();
        metas.add(new Meta("Lujos", 20, 0, user));
        metas.add(new Meta("Gastos Basicos", 50, 0, user));
        metas.add(new Meta("Ahorro", 15, 0, user));
        metas.add(new Meta("Inversiones", 15, 0, user));
        return metas;
    }
}
