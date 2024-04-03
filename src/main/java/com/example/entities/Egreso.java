package com.example.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Egreso {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idEgreso; 
    private int cantidadEgreso;
    private String descripcion;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario")
    
    private Usuario usuario;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_categoria")

    private CategoriaEgreso categoriaEgreso;


    public Long getIdEgreso() {
        return idEgreso;
    }
    public void setIdEgreso(Long idEgreso) {
        this.idEgreso = idEgreso;
    }
    public int getCantidadEgreso() {
        return cantidadEgreso;
    }
    public void setCantidadEgreso(int cantidadEgreso) {
        this.cantidadEgreso = cantidadEgreso;
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
    public CategoriaEgreso getCategoriaEgreso() {
        return categoriaEgreso;
    }
    public void setCategoriaEgreso(CategoriaEgreso categoriaEgreso) {
        this.categoriaEgreso = categoriaEgreso;
    }
    
}
