package com.example.entities;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class CategoriaEgreso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCategoriaEgreso; 

    @Column(name = "idUsuario")
    private Long idUsuario;

    private String descripcion;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "categoriaEgreso" , cascade = CascadeType.ALL)
    List<Egreso> Egresos;
    
    public Long getIdCategoriaEgreso() {
        return idCategoriaEgreso;
    }

    public void setIdCategoriaEgreso(Long idCategoriaEgreso) {
        this.idCategoriaEgreso = idCategoriaEgreso;
    }

    public Long getId_usuario() {
        return idUsuario;
    }

    public void setId_usuario(Long idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }


}
