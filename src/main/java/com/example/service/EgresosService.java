package com.example.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.entities.Egreso;
import com.example.entities.InformeMeta;
import com.example.entities.Meta;
import com.example.entities.Usuario;
import com.example.repository.CategoriaEgresosRepository;
import com.example.repository.EgresosRepository;
import com.example.repository.InformeMetaRepository;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;

@Service
public class EgresosService {

    @Autowired
    private EgresosRepository egresosRepository;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private CategoriaEgresosRepository categoriaEgresosRepository;

    @Autowired
    private MetaService metaService;

    @Autowired
    private InformeMetaRepository informeMetaRepository;

    public List<Egreso> getAllEgresos() {
        return egresosRepository.getAllEgresos();
    }

    @Transactional
    public Egreso save(Egreso egreso) {
        Usuario usuario = usuarioService.getUsuarioById(egreso.getUsuario().getId());
        usuario.setSaldo(usuario.getSaldo() - egreso.getCantidadEgreso());
        usuario.setEgresoTotal(usuario.getEgresoTotal() + egreso.getCantidadEgreso());
        usuarioService.save(usuario);

        Meta meta = metaService.getMetaById(egreso.getMeta().getId());
        LocalDate now = LocalDate.now().withDayOfMonth(1);
        YearMonth currentMonth = YearMonth.now();

        if (meta.getFechaUltimoInforme() == null || !meta.getFechaUltimoInforme().equals(now)) {
            // Crear un nuevo informe mensual
            InformeMeta nuevoInforme = new InformeMeta();
            nuevoInforme.setFecha(currentMonth);
            nuevoInforme.setMeta(meta);
            nuevoInforme.setTotal_mes(meta.getTotal_mes());
            informeMetaRepository.save(nuevoInforme);

            // Reiniciar total_mes y actualizar fechaUltimoInforme
            meta.setTotal_mes(0);
            meta.setFechaUltimoInforme(currentMonth);
        }

        // Incrementar total_mes con el valor del egreso
        meta.setTotal_mes(meta.getTotal_mes() + egreso.getCantidadEgreso());
        metaService.saveMeta(meta);

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

    public List<Egreso> getEgresosUser(long id_User) {
        Usuario usuario = usuarioService.getUsuarioById(id_User);
        return usuario.getEgresos();
    }
}
