package com.example.service;

import java.util.ArrayList;
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
    public CategoriaEgreso save(CategoriaEgreso catE) {
        Usuario usuario = usuarioService.getUsuarioById(catE.getUsuario().getId());
        usuarioService.save(usuario);
        // Guardar el egreso
        return catEgRepo.save(catE);
    }
    
    public CategoriaEgreso getCategoriaBydescripcion(String desc){
        return catEgRepo.getCategoriaBydescripcion(desc);
    }

    public List<CategoriaEgreso> getUserCatEgresos(Long user_id) {
        Usuario usuario = usuarioService.getUsuarioById(user_id);
        return usuario.getCategoriasEgreso();
    }

    public void createDefaultCategoriasForUser(Usuario user) {
        List<CategoriaEgreso> defaultCategorias = getDefaultCategorias(user);
        for (CategoriaEgreso categoria : defaultCategorias) {
            catEgRepo.save(categoria); // Guarda cada categoria en la base de datos
        }
    }

    public List<CategoriaEgreso> getDefaultCategorias(Usuario user) {
        // Retorna una lista de objetos CategoriaEgreso con los valores predeterminados y el ID de usuario establecido
        List<CategoriaEgreso> categorias = new ArrayList<>();
        categorias.add(new CategoriaEgreso("COMIDA", user));
        categorias.add(new CategoriaEgreso("TRANSPORTE", user));
        categorias.add(new CategoriaEgreso("SOCIAL", user));
        return categorias;
    }
    
}