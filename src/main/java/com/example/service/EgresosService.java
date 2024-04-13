package com.example.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.entities.Egreso;
import com.example.entities.Usuario;
import com.example.repository.EgresosRepository;
import java.util.List;

@Service
public class EgresosService {

    @Autowired
    private EgresosRepository egresosRepository;

    @Autowired
    private UsuarioService usuarioService;

    public List<Egreso> getAllEgresos() {
        return egresosRepository.getAllEgresos();
    }

    @Transactional
    public Egreso save(Egreso egreso) {
        Usuario usuario = usuarioService.getUsuarioById(egreso.getUsuario().getId());
        usuario.setSaldo(usuario.getSaldo() - egreso.getCantidadEgreso());
        usuario.setEgresoTotal(egreso.getUsuario().getEgresoTotal() + egreso.getCantidadEgreso());
        usuarioService.save(usuario);
        // Guardar el egreso
        return egresosRepository.save(egreso);

    }
}
