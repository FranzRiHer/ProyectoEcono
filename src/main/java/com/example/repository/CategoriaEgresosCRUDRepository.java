package com.example.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import com.example.entities.CategoriaEgreso;

public interface  CategoriaEgresosCRUDRepository extends CrudRepository<CategoriaEgreso, Long>{
    List<CategoriaEgreso> findByidUsuario(Long idUsuario);
}
