package com.example.entities;

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
    private int total = 0;

    @ManyToOne
    @JoinColumn(name = "id_usuario")
    @JsonIgnoreProperties("egresos")
    private Usuario usuario;

    @JsonIgnoreProperties("meta")
    @OneToMany(mappedBy = "meta" , cascade = CascadeType.ALL)
    private List<InformeMeta> InformesMetas;

    @OneToMany(mappedBy = "meta" , cascade = CascadeType.ALL)
    private List<Egreso> egresos;

    public Meta() {

    }

    public Meta(String nombre, int porcentaje, int total, Usuario usuario) {
        this.nombre = nombre;
        this.porcentaje = porcentaje;
        this.total = total;
        this.usuario = usuario;
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

    public int getTotal() {
        return total;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public void setTotal(int total) {
        this.total = total;
    }
    

}
