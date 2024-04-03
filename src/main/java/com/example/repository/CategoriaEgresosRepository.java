package com.example.repository;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.example.entities.CategoriaEgreso;


@Repository
public class CategoriaEgresosRepository {

    @Autowired
    private CategoriaEgresosCRUDRepository categoriaEgresosCRUDRepository;

    public List<CategoriaEgreso> getAllCategoriasE(){
        return (List<CategoriaEgreso>) categoriaEgresosCRUDRepository.findAll();
    }

    public CategoriaEgreso save(CategoriaEgreso ce){
        return categoriaEgresosCRUDRepository.save(ce);
    }

    public List<CategoriaEgreso> getCategoriasEgresosUsuario(long userID){
        return (List<CategoriaEgreso>) categoriaEgresosCRUDRepository.findByidUsuario(userID);
    } 
    
}
