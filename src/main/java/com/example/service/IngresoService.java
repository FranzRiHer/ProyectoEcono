package com.example.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.entities.Ingreso;
import com.example.entities.Usuario;
import com.example.repository.CategoriaEgresosRepository;
import com.example.repository.CategoriaIngresosRepository;
import com.example.repository.IngresoRepository;

@Service
public class IngresoService {

    @Autowired
    private IngresoRepository ingresoRepository;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private CategoriaIngresosRepository categoriaIngresosRepository;

    public List<Ingreso> getAllIngresos() {
        return ingresoRepository.getAllIngresos();
    }

    @Transactional
    public Ingreso save(Ingreso ingreso) {
        Usuario usuario = usuarioService.getUsuarioById(ingreso.getUsuario().getId());
        usuario.setSaldo(usuario.getSaldo() + ingreso.getCantidad());
        usuario.setIngresoTotal(ingreso.getUsuario().getIngresoTotal() + ingreso.getCantidad());
        usuarioService.save(usuario);

        return ingresoRepository.save(ingreso);
    }

    public List<Ingreso> getUserIngresos(Long user_id) {
        Usuario usuario = usuarioService.getUsuarioById(user_id);
        return usuario.getIngresos();
    }

    public String convertIngresosToCSV(List<Ingreso> ingresosList) {
        StringBuilder csvBuilder = new StringBuilder();
        // Añadir encabezados de columnas
        csvBuilder.append("Descripcion,Cantidad,Categoria,");
    
        for (Ingreso ingreso : ingresosList) {
            Long categoria_id = ingreso.getCategoriaIngreso().getIdCategoriaIngreso();
            csvBuilder.append(ingreso.getDescripcion())
                      .append(",")
                      .append(ingreso.getCantidad())
                      .append(",")
                      .append(categoriaIngresosRepository.getCategoriaById(categoria_id).get().getDescripcion())
                      .append(",");
        }
        

    return csvBuilder.toString();
}
}
