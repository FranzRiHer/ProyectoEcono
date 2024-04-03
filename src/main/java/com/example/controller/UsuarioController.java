package com.example.controller;

import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import com.example.entities.Usuario;
import com.example.service.UsuarioService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@CrossOrigin
@RestController
@RequestMapping("/usuarios")

public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping("/usuario_get/{id}")
    public Usuario getUsuario(@PathVariable int id) {
        return usuarioService.getUsuario(id-1);
    }

    @GetMapping("/get_all_users")
    public List<Usuario> getAllUsuarios(){
        return usuarioService.getAllUsuarios();
    }
    
    @PostMapping("/add")
    public Usuario saveUsuario(@RequestBody Usuario u) {
        return usuarioService.save(u);
    }
    
}
