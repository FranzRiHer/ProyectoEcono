package com.example.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.entities.Egreso;
import com.example.service.EgresosService;


@CrossOrigin
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

    @GetMapping("/get_by_user/{id}")
    public List<Egreso> getMetasByUser(@PathVariable(value = "id") Long user_id){
        return egresosService.getEgresosUser(user_id);
    }
}