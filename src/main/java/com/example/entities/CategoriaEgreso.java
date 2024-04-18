package com.example.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class CategoriaEgreso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCategoriaEgreso; 

    private String descripcion;

    @ManyToOne
    @JoinColumn(name = "id_usuario")
    @JsonIgnoreProperties("categoriasEgreso")
    private Usuario usuario;

    public Long getIdCategoriaEgreso() {
        return idCategoriaEgreso;
    }

    public void setIdCategoriaEgreso(Long idCategoriaEgreso) {
        this.idCategoriaEgreso = idCategoriaEgreso;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public CategoriaEgreso(String descripcion, Usuario usuario) {
        this.descripcion = descripcion;
        this.usuario = usuario;
    }

    public CategoriaEgreso() {
    }    

}