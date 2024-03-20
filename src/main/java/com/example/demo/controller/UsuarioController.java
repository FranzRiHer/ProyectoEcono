package com.example.demo.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import com.example.demo.entities.Usuario;
import com.example.demo.service.UsuarioService;
/*
import com.example.demo.repository.UsuarioRepository;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMethod;
 */

import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/usuarios")

public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping("/usuarios")
    public List<Usuario> getAllSt(){
        return usuarioService.getAllUsuarios();
    }

    @PostMapping("/add")
    public Usuario saveUsuario(@RequestBody Usuario u){
        return usuarioService.save(u);
    }
    
}
