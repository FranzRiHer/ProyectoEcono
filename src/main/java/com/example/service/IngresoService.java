package com.example.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.entities.Ingreso;
import com.example.entities.Usuario;
import com.example.repository.IngresoRepository;


@Service
public class IngresoService {

    @Autowired
    private IngresoRepository ingresoRepository;

    @Autowired
    private UsuarioService usuarioService;

    public List<Ingreso> getAllIngresos(){
        return ingresoRepository.getAllIngresos();
    }
    
    @Transactional
    public Ingreso save(Ingreso ingreso){
        Usuario usuario = usuarioService.getUsuarioById(ingreso.getUsuario().getId());
        usuario.setSaldo(usuario.getSaldo() + ingreso.getCantidad());
        usuario.setIngresoTotal(ingreso.getUsuario().getIngresoTotal() + ingreso.getCantidad());
        usuarioService.save(usuario);

        return ingresoRepository.save(ingreso);
    }
    
}
