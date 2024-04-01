package com.example.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import com.example.entities.Usuario;
import com.example.service.UsuarioService;
<<<<<<< HEAD
//import com.example.repository.UsuarioRepository;
//import org.springframework.web.bind.annotation.RequestMethod;
//import org.springframework.web.bind.annotation.RequestParam;
//import java.util.List;

=======
>>>>>>> 394ad5cb4bd8245f415bdaa04a5536bcb00b0f9b
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

<<<<<<< HEAD
=======
import java.util.List;

>>>>>>> 394ad5cb4bd8245f415bdaa04a5536bcb00b0f9b
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
    // public List<Usuario> getAllUsuarios(){
<<<<<<< HEAD
    // return usuarioService.getAllUsuarios();
    // }
=======
    //     return usuarioService.getAllUsuarios();
    //}
>>>>>>> 394ad5cb4bd8245f415bdaa04a5536bcb00b0f9b

    @PostMapping("/add")
    public Usuario saveUsuario(@RequestBody Usuario u) {
        return usuarioService.save(u);
    }

    @GetMapping("/saludo")
    public String hola() {
        return "Hola desde Spring Boot!";
    }
}
