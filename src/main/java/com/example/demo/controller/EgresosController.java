package com.example.demo.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.entities.Egreso;
import com.example.demo.service.EgresosService;

@RestController
@RequestMapping("/gastos")
public class EgresosController {

    @Autowired
    private EgresosService egresosService;
    @GetMapping("/egresos")
    public List<Egreso> getAllEgresos(){
        return egresosService.getAllEgresos();
    }
    @PostMapping("/add")
    public Egreso saveEgresos(@RequestBody Egreso s){
        return egresosService.save(s);
    }   
}