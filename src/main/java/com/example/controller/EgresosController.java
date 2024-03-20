package com.example.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.entities.Egresos;
import com.example.service.EgresosService;

@RestController
@RequestMapping("/gastos")
public class EgresosController {

    @Autowired
    private EgresosService egresosService;
    @GetMapping("/egresos")
    public List<Egresos> getAllEgresos(){
        return egresosService.getAllEgresos();
    }
    @PostMapping("/add")
    public Egresos saveEgresos(@RequestBody Egresos s){
        return egresosService.save(s);
    }   
}