package com.example.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.entities.Egreso;
import com.example.entities.Usuario;
import com.example.repository.EgresosRepository;
import com.example.repository.UsuarioRepository;

import java.util.List;

@Service
public class EgresosService {

    @Autowired
    private EgresosRepository egresosRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<Egreso> getAllEgresos(){
        return egresosRepository.getAllEgresos();
    }



    @Transactional
    public Egreso save(Egreso egreso){
        // Obtener el usuario asociado al egreso
        Usuario usuario = usuarioRepository.getAllUsuarios().get(0);

        // Actualizar el saldo del usuario
        usuario.setSaldo(usuario.getSaldo() - egreso.getCantidadEgreso());

        // Actualizar el total de egresos del usuario
        usuario.setEgresoTotal(usuario.getEgresoTotal() + egreso.getCantidadEgreso());

        // Guardar el usuario actualizado
        usuarioRepository.save(usuario);

        // Guardar el egreso
        return egresosRepository.save(egreso);

    }
}
