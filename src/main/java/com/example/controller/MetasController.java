package com.example.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
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
import com.example.service.MetaService;
import com.example.entities.Meta;


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

    @PostMapping("/add")
    public Meta savMeta(@RequestBody Meta meta){
        return metaService.saveMeta(meta);
    }

    @PatchMapping("/{id}/update")
    @ResponseStatus(HttpStatus.OK)
    public Meta updateMeta(@PathVariable(value = "id") Long id, @RequestBody Meta meta) {
        return metaService.updateMeta(id, meta);
    }
}
