package com.example.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.entities.Usuario;

@Repository
public class UsuarioRepository {
    @Autowired
    private UsuarioCRUDRepository usuarioCRUDRepository;

    public List<Usuario> getAllUsuarios(){
        return (List<Usuario>) usuarioCRUDRepository.findAll();
    }

    public Usuario getUsuario(){
        Usuario usuario = getAllUsuarios().get(0);
        return usuario;
    }

    public Usuario getUsuarioById(Long id){
        return usuarioCRUDRepository.findById(id).orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }


    public Usuario save(Usuario u){
        return usuarioCRUDRepository.save(u);
    }

}
