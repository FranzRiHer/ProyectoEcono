package com.example.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Egresos {
    
    @Id
    private Long idEgreso; 
    private String nombreEgreso; 
    private int cantidadEgreso;
    private String descripcion;

    public Long getIdEgreso() {
        return idEgreso;
    }
    public void setIdEgreso(Long idEgreso) {
        this.idEgreso = idEgreso;
    }
    public String getNombreEgreso() {
        return nombreEgreso;
    }
    public void setNombreEgreso(String nombreEgreso) {
        this.nombreEgreso = nombreEgreso;
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
    

}
