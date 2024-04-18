package com.example.service;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.entities.CategoriaIngreso;
import com.example.entities.Usuario;
import com.example.repository.CategoriaIngresosRepository;
import jakarta.transaction.Transactional;

@Service
public class CategoriaIngresoService {
    
    @Autowired
    private CategoriaIngresosRepository catInRepo;

    @Autowired
    private UsuarioService usuarioService;

    public List<CategoriaIngreso> getCategoriasIngresos(){
        return catInRepo.getCategoriasIngresos();
    }

    @Transactional
    public CategoriaIngreso save(CategoriaIngreso catI){
        return catInRepo.save(catI);
    }

    public CategoriaIngreso getCategoriaByDescripcion(String desc){
        return catInRepo.getCategoriaByDescripcion(desc);
    }
    
    public List<CategoriaIngreso> getUserCatIngresos(Long user_id){
        Usuario usuario = usuarioService.getUsuarioById(user_id);
        return usuario.getCategoriasIngreso();
    }

    public void createDefaultCategoriasForUser(Usuario user) {
        List<CategoriaIngreso> defaultCategorias = getDefaultCategorias(user);
        for (CategoriaIngreso categoria : defaultCategorias) {
            catInRepo.save(categoria); // Guarda cada categoria en la base de datos
        }
    }

    public List<CategoriaIngreso> getDefaultCategorias(Usuario user) {
        // Retorna una lista de objetos CategoriaIngreso con los valores predeterminados y el ID de usuario establecido
        List<CategoriaIngreso> categorias = new ArrayList<>();
        categorias.add(new CategoriaIngreso("SALARIO", user));
        categorias.add(new CategoriaIngreso("MESADA", user));
        categorias.add(new CategoriaIngreso("PAGOS", user));
        return categorias;
    }


}
