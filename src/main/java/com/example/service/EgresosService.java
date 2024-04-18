package com.example.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.entities.Egreso;
import com.example.entities.Meta;
import com.example.entities.Usuario;
import com.example.repository.EgresosRepository;
import java.util.List;

@Service
public class EgresosService {

    @Autowired
    private EgresosRepository egresosRepository;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private MetaService metaService;

    public List<Egreso> getAllEgresos() {
        return egresosRepository.getAllEgresos();
    }

    @Transactional
    public Egreso save(Egreso egreso) {
        Usuario usuario = usuarioService.getUsuarioById(egreso.getUsuario().getId());
        usuario.setSaldo(usuario.getSaldo() - egreso.getCantidadEgreso());
        usuario.setEgresoTotal(egreso.getUsuario().getEgresoTotal() + egreso.getCantidadEgreso());
        usuarioService.save(usuario);

        Meta meta = metaService.getMetaById(egreso.getMeta().getId());
        meta.setTotal(meta.getTotal() + egreso.getCantidadEgreso());
        metaService.saveMeta(meta);
        // Guardar el egreso
        return egresosRepository.save(egreso);

    }

    public List<Egreso> getEgresosUser(long id_User){
        Usuario usuario = usuarioService.getUsuarioById(id_User);
        List<Egreso> lista = usuario.getEgresos();
        return lista;
    }
}
