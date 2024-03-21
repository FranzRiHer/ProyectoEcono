package com.example.demo.service;

import com.example.demo.entities.Usuario;
import com.example.demo.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service; 
import java.util.List;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<Usuario> getAllUsuarios(){
        return usuarioRepository.getAllUsuarios();
    }

    public Usuario save(Usuario u){
        if(u.getNombre().equals("")){
            System.out.println("Ingresa un nombre");
            return null;
        }

        return usuarioRepository.save(u);
    }
    
}
