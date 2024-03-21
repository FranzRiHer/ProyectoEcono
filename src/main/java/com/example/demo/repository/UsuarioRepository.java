package com.example.demo.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import java.util.List;
import com.example.demo.entities.Usuario;

@Repository

public class UsuarioRepository {
    @Autowired
    private UsuarioCRUDRepository usuarioCRUDRepository;

    public List<Usuario> getAllUsuarios(){
        return (List<Usuario>) usuarioCRUDRepository.findAll();
    }


    public Usuario save(Usuario u){
        return usuarioCRUDRepository.save(u);
    }

}
