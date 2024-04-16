package com.example.service;

import java.util.List;
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
    public CategoriaEgreso save(CategoriaEgreso catE){
        return catEgRepo.save(catE);
    }
    
    public CategoriaEgreso getCategoriaBydescripcion(String desc){
        return catEgRepo.getCategoriaBydescripcion(desc);
    }

    public List<CategoriaEgreso> getUserCatEgresos(Long user_id) {

        Usuario usuario = usuarioService.getUsuarioById(user_id);
        return usuario.getCategoriasEgreso();
    }
    
}