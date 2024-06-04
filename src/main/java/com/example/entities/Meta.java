package com.example.entities;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;


@Entity
public class Meta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;
    private int porcentaje;
    private int total_mes = 0;

    @ManyToOne
    @JoinColumn(name = "id_usuario")
    @JsonIgnoreProperties("egresos")
    private Usuario usuario;

    @JsonIgnoreProperties("meta")
    @OneToMany(mappedBy = "meta" , cascade = CascadeType.ALL)
    private List<InformeMeta> InformesMetas;

    @OneToMany(mappedBy = "meta" , cascade = CascadeType.ALL)
    private List<Egreso> egresos;

    @JsonIgnoreProperties("meta")
    private LocalDate fechaUltimoInforme;

    public Meta() {

    }

    public Meta(String nombre, int porcentaje, int total_mes, Usuario usuario) {
        LocalDate now = LocalDate.now();
        this.nombre = nombre;
        this.porcentaje = porcentaje;
        this.total_mes = total_mes;
        this.usuario = usuario;
        this.fechaUltimoInforme = now.withDayOfMonth(1);
    }   

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public int getPorcentaje() {
        return porcentaje;
    }

    public void setPorcentaje(int porcentaje) {
        this.porcentaje = porcentaje;
    }

    public int getTotal_mes() {
        return total_mes;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public void setTotal_mes(int d) {
        this.total_mes = d;
    }

    public LocalDate getFechaUltimoInforme() {
        return fechaUltimoInforme;
    }

    public void setFechaUltimoInforme(YearMonth currentMonth) {
        this.fechaUltimoInforme = LocalDate.now().withDayOfMonth(1);
    }
    
}
