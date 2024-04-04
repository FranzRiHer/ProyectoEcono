package com.example.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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

    @GetMapping("/get_meta_id/{id}")
    public Meta getMetaById(@PathVariable Long id){
        return metaService.getMetaById(id);
    }

    @GetMapping("/add")
    public Meta savMeta(@RequestBody Meta meta){
        return metaService.saveMeta(meta);
    }

}
