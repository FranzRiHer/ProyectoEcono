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
    public Ingreso save(Ingreso ingreso, Long id){
        // Obtener el usuario asociado al Ingreso
        Usuario usuario = usuarioService.getUsuarioById(id);

        // Actualizar el saldo del usuario
        usuario.setSaldo(usuario.getSaldo() + ingreso.getCantidad());

        // Actualizar el total de Ingresos del usuario
        usuario.setIngresoTotal(usuario.getIngresoTotal() + ingreso.getCantidad());

        // Guardar el usuario actualizado
        usuarioService.save(usuario);

        // Guardar el Ingreso
        return ingresoRepository.save(ingreso);

    }
    
}
