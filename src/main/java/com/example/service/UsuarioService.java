package com.example.service;

import com.example.entities.Usuario;
import com.example.repository.UsuarioRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service; 



@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<Usuario> getAllUsuarios(){
        return usuarioRepository.getAllUsuarios();
    }

    public Usuario save(Usuario u){
        return usuarioRepository.save(u);
    }
    
}