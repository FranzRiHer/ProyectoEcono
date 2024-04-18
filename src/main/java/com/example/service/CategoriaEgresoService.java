package com.example.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.entities.CategoriaEgreso;
import com.example.entities.Usuario;
import com.example.repository.CategoriaEgresosRepository;
import jakarta.transaction.Transactional;

@Service
public class CategoriaEgresoService {
    @Autowired
    private CategoriaEgresosRepository catEgRepo;

    @Autowired
    private UsuarioService usuarioService;

    public List<CategoriaEgreso> getCategoriasEgresos(){
        return catEgRepo.getCategoriasEgresos();
    }
    
    @Transactional
    public CategoriaEgreso save(CategoriaEgreso catE) {
        Usuario usuario = usuarioService.getUsuarioById(catE.getUsuario().getId());
        usuarioService.save(usuario);
        // Guardar el egreso
        return catEgRepo.save(catE);
    }
    
    public CategoriaEgreso getCategoriaBydescripcion(String desc){
        return catEgRepo.getCategoriaBydescripcion(desc);
    }

    public CategoriaEgreso getCategoriaById(Long id) {
        Optional<CategoriaEgreso> categoriaEgresoOptional = catEgRepo.getCategoriaById(id);
        if (categoriaEgresoOptional.isPresent()) {
            return categoriaEgresoOptional.get();
        } else {
            throw new RuntimeException("Categoria no encontrada");
        }
    }
}