package com.example.service;

import com.example.entities.Usuario;
import com.example.repository.UserRepository;
import com.example.repository.UsuarioRepository;

import java.util.List;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service; 



@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private UserRepository userRepository;

    public List<Usuario> getAllUsuarios(){
        return usuarioRepository.getAllUsuarios();
    }

    public Usuario getUsuario(int id){
        return usuarioRepository.getUsuario(id);
    }

    public Usuario save(Usuario u){
        return usuarioRepository.save(u);
    }
    public Usuario getUsuarioById(Long id) {
        Optional<Usuario> usuarioOptional = userRepository.findById(id);
        if (usuarioOptional.isPresent()) {
            return usuarioOptional.get();
        } else {
            throw new RuntimeException("Usuario no encontrado");
        }
    }
    
}