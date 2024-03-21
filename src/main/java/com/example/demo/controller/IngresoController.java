package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.service.IngresoService;
import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import com.example.demo.entities.Ingreso;



@RestController
@RequestMapping("/ingreso")
public class IngresoController {
    @Autowired
    private IngresoService ingresoService;
    
    @GetMapping("/ingreso")
    public List<Ingreso> getAllIngresos(){
        return ingresoService.getAllIngresos();
    }

    @PostMapping("/add")
    public Ingreso saveIngreso(@RequestBody Ingreso i){
        return ingresoService.save(i);
    }
    
    
}
