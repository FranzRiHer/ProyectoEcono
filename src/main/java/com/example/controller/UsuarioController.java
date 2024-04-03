package com.example.controller;

import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RequestMapping;
import com.example.entities.Usuario;
import com.example.service.UsuarioService;
//import com.example.repository.UsuarioRepository;
//import org.springframework.web.bind.annotation.RequestMethod;
//import org.springframework.web.bind.annotation.RequestParam;
//import java.util.List;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/usuarios")

public class UsuarioController {

    
    private final PasswordEncoder passwordEncoder;
    
    @Autowired
    private UsuarioService usuarioService;

    @GetMapping("/usuario_get/{id}")
    public Usuario getUsuario(@PathVariable Long id) {
        return usuarioService.getUsuarioById(id);
    }

    @GetMapping("/usuarios_get")
    public List<Usuario> geAlltUsuario() {
        return usuarioService.getAllUsuarios();
    }
    @PutMapping("/editar/{id}")
    public ResponseEntity<String> editarUsuario(@PathVariable Long id, @RequestBody Usuario usuarioActualizado) {
        try {
            Usuario usuario = usuarioService.getUsuarioById(id);
            if (usuario == null) {
                return ResponseEntity.badRequest().body("El usuario con el ID proporcionado no existe.");
            }
    
            // Actualiza los campos del usuario con la información recibida
            usuario.setNombre(usuarioActualizado.getNombre());
            usuario.setEmail(usuarioActualizado.getEmail());
            usuario.setPassword(passwordEncoder.encode(usuarioActualizado.getPassword()));
    
            // Guarda los cambios en el repositorio
            Usuario usuarioGuardado = usuarioService.save(usuario);
            return ResponseEntity.ok("La actualización de datos fue exitosa.");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Hubo un problema con la actualización de datos.");
        }
    }
    
        
    // public List<Usuario> getAllUsuarios(){
    // return usuarioService.getAllUsuarios();
    // }

    @PostMapping("/add")
    public Usuario saveUsuario(@RequestBody Usuario u) {
        return usuarioService.save(u);
    }

    @GetMapping("/saludo")
    public String hola() {
        return "Hola desde Spring Boot!";
    }
}
