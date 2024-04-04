package com.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.service.IngresoService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import com.example.entities.Ingreso;


@CrossOrigin
@RestController
@RequestMapping("/ingreso")
public class IngresoController {
    @Autowired
    private IngresoService ingresoService;
    
    @GetMapping("/ingreso")
    public List<Ingreso> getAllIngresos(){
        return ingresoService.getAllIngresos();
    }

    @PostMapping("/add/{id}")
    public Ingreso saveIngreso(@RequestBody Ingreso i){
        return ingresoService.save(i);
    }

}
