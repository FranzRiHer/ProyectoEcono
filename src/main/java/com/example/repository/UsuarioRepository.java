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
    private Usuario usuario;

    public List<Usuario> getAllUsuarios(){
        return (List<Usuario>) usuarioCRUDRepository.findAll();
    }

    public Usuario getUsuario(Long id){
        Optional<Usuario> opUsers=usuarioCRUDRepository.findById(id);

    if(opUsers.isPresent()){
        return opUsers.get();
    }else{
        return null;
    }

    }

    public Long getUserById(){
        return usuario.getId();
    }


    public Usuario save(Usuario u){
        return usuarioCRUDRepository.save(u);
    }

    public void deleteUsaer(Long id){
        usuarioCRUDRepository.deleteById(id);
    }
}
