package com.example.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.service.IngresoService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import com.example.entities.Ingreso;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;



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

    @PostMapping("/add")
    public Ingreso saveIngreso(@RequestBody Ingreso i){
        return ingresoService.save(i);
    }

    @GetMapping("/get_ingresos_csv/{id}")
    public ResponseEntity<String> getIngresosCsv(@PathVariable(value = "id") Long user_id){
        List<Ingreso> ingresos = ingresoService.getUserIngresos(user_id);
        String csvContent = ingresoService.convertIngresosToCSV(ingresos);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "attachment; filename=ingresos.csv");
        headers.add("Content-Type", "text/csv; charset=utf-8");

        return new ResponseEntity<>(csvContent, headers, HttpStatus.OK);
    }

}
