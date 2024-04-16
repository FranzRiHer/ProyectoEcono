package com.example.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import com.example.entities.CategoriaIngreso;
import com.example.service.CategoriaIngresoService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@CrossOrigin
@RestController
@RequestMapping("/categorias_i")
public class CategoriaIngresosController {

    @Autowired
    private CategoriaIngresoService catInService;

    @GetMapping("/get_cat_i")
    public List<CategoriaIngreso> getCategoriasIngresos(){
        return catInService.getCategoriasIngresos();
    }

    @PostMapping("/add_add_i")
    public CategoriaIngreso saveCategoriaIngreso(@RequestBody CategoriaIngreso catI){
        return catInService.save(catI);
    }

    @GetMapping("/get_cat_desc/{desc}")
    public CategoriaIngreso getCategoriaByDesc(@PathVariable String desc) {
        return catInService.getCategoriaByDescripcion(desc);
    }
    
    @GetMapping("/get_by_user/{id}")
    public List<CategoriaIngreso> getMetasByUser(@PathVariable(value = "id") Long user_id){
        return catInService.getUserCatIngresos(user_id);
    }

}