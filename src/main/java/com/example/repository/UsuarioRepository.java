package com.example.repository;

import java.util.List;
import java.util.Optional;

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

    public Usuario getUsuario(int id){
        Usuario usuario = getAllUsuarios().get(id);
        return usuario;
    }

    public Optional<Usuario> getUsuarioById(Long id){
        return usuarioCRUDRepository.findById(id);
    }

    public Usuario save(Usuario u){
        return usuarioCRUDRepository.save(u);
    }
    
    

}