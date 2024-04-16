package com.example.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.entities.CategoriaEgreso;
import com.example.entities.Egreso;
import com.example.entities.Usuario;
import com.example.repository.CategoriaEgresosRepository;
import com.example.repository.EgresosRepository;
import java.util.List;

@Service
public class EgresosService {

    @Autowired
    private EgresosRepository egresosRepository;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private CategoriaEgresosRepository categoriaEgresosRepository;

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

    public List<Egreso> getUserEgresos(Long user_id) {
        Usuario usuario = usuarioService.getUsuarioById(user_id);
        return usuario.getEgresos();
    }

    public String convertEgresosToCSV(List<Egreso> egresosList) {
        StringBuilder csvBuilder = new StringBuilder();
        // Añadir encabezados de columnas
        csvBuilder.append("Descripcion,Cantidad,Categoria,");
       
        for (Egreso egreso : egresosList) {
            Long categoria_id = egreso.getCategoriaEgreso().getIdCategoriaEgreso();
            csvBuilder.append(egreso.getDescripcion())
                      .append(",")
                      .append(egreso.getCantidadEgreso())
                      .append(",")
                      .append(categoriaEgresosRepository.getCategoriaById(categoria_id).get().getDescripcion())
                      .append(",");
        }
    
        return csvBuilder.toString();
    }
}
