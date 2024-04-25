package com.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.example.entities.Meta;
import com.example.service.MetaService;


@CrossOrigin
@RestController
@RequestMapping("/metas")
public class MetasController {
    @Autowired
    private MetaService metaService;
    
    @GetMapping("/get_metas")
    public List<Meta> getMetas(){
        return metaService.getAllMetas();
    } 

    @GetMapping("/get_metas_by_user/{id}")
    public List<Meta> getMetasByUser(@PathVariable(value = "id") Long user_id){
        return metaService.getUserMetas(user_id);
    } 

    @PostMapping("/add")
    public Meta saveMeta(@RequestBody Meta meta){
        return metaService.saveMeta(meta);
    }

    @PatchMapping("/update/{id_meta}")
    @ResponseStatus(HttpStatus.OK)
    public Meta updateMeta(@PathVariable(value = "id_meta") Long id, @RequestBody Meta metaInfo) {
        return metaService.updateMeta(id, metaInfo);
    }

    @GetMapping("/get_metas_csv/{id}")
    public ResponseEntity<String> getMetasCsv(@PathVariable(value = "id") Long user_id){
        List<Meta> metas = metaService.getUserMetas(user_id);
        String csvContent = metaService.convertMetasToCSV(metas);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "attachment; filename=metas.csv");
        headers.add("Content-Type", "text/csv; charset=utf-8");

        return new ResponseEntity<>(csvContent, headers, HttpStatus.OK);
    }
}
