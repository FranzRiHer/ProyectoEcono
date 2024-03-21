package com.example.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import com.example.entities.Usuario;
import com.example.service.UsuarioService;
//import com.example.repository.UsuarioRepository;
//import org.springframework.web.bind.annotation.RequestMethod;
//import org.springframework.web.bind.annotation.RequestParam;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/usuarios")

public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping("/usuario_get")
    public Usuario getUsuario(){
        return usuarioService.getUsuario();
    }
    // public List<Usuario> getAllUsuarios(){
    //     return usuarioService.getAllUsuarios();
    // }

    @PostMapping("/add")
    public Usuario saveUsuario(@RequestBody Usuario u){
        return usuarioService.save(u);
    }
    
}
