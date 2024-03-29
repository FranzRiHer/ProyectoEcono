package com.example.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import com.example.entities.Usuario;
import com.example.service.UsuarioService;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@CrossOrigin
@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping("/getUser")
    public Usuario getUsuario(@RequestBody Long id) {
        return usuarioService.getUserId(id);
    }

    @GetMapping("/getAllUsers")
    public List<Usuario> getAllUsuarios(){
        return usuarioService.getAllUsuarios();
    }

    @PostMapping("/addUser")
    public Usuario saveUsuario(@RequestBody Usuario u) {
        return usuarioService.save(u);
    }

}