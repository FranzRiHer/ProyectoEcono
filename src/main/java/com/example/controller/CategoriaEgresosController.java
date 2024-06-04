package com.example.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import com.example.service.CategoriaEgresoService;
import com.example.entities.CategoriaEgreso;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@CrossOrigin
@RestController
@RequestMapping("/categorias_e")
public class CategoriaEgresosController {

    @Autowired
    private CategoriaEgresoService catEgService;
    
    @GetMapping("/get_cat_e")
    public List<CategoriaEgreso> getCategoriasEgresos(){
        return catEgService.getCategoriasEgresos();
    }

    @PostMapping("/add_cat_e")
    public CategoriaEgreso saveCategoriaEgreso(@RequestBody CategoriaEgreso catE){
        return catEgService.save(catE);
    }

    @GetMapping("/get_cat_desc/{descripcion}")
    public CategoriaEgreso getCategoriaByDesc(@PathVariable String descripcion) {
        return catEgService.getCategoriaBydescripcion(descripcion);
    }
    
    @GetMapping("/get_by_user/{id}")
    public List<CategoriaEgreso> getMetasByUser(@PathVariable(value = "id") Long user_id){
        return catEgService.getUserCatEgresos(user_id);
    }                   
    
}